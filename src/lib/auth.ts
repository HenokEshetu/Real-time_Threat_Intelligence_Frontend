type RefreshAuthCallback = () => Promise<boolean>;

let accessToken: string | null = null;
let refreshAuthCallback: RefreshAuthCallback | null = null;
let refreshQueue: (() => void)[] = [];
let isRefreshing = false;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const registerRefreshAuth = (callback: RefreshAuthCallback) => {
  refreshAuthCallback = callback;
};

export const refreshAuth = async (): Promise<boolean> => {
  if (!refreshAuthCallback) return false;

  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(() => resolve(refreshAuth()));
    });
  }

  isRefreshing = true;
  try {
    const success = await refreshAuthCallback();
    if (success) {
      refreshQueue.forEach((cb) => cb());
      refreshQueue = [];
    }
    return success;
  } finally {
    isRefreshing = false;
  }
};
