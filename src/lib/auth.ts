let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    sessionStorage.setItem('access_token', token);
  } else {
    sessionStorage.removeItem('access_token');
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (accessToken) return accessToken;

  const storedToken = sessionStorage.getItem('access_token');
  if (storedToken) {
    accessToken = storedToken;
    return storedToken;
  }

  return null;
};

export const refreshAuth = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = new Promise(async (resolve) => {
    try {
      const response = await fetch('http://localhost:4000/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Refresh failed');

      const { access_token } = await response.json();
      setAccessToken(access_token);
      resolve(access_token);
    } catch (error) {
      console.error('Token refresh failed:', error);
      setAccessToken(null);
      resolve(null);
    } finally {
      refreshPromise = null;
    }
  });

  return refreshPromise;
};