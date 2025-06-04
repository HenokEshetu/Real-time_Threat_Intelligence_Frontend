import { useEffect } from 'react';
import { getAccessToken } from './auth-storage';
import { getTokenExpiration, validateAccessToken } from './auth';

export function useAutoRefreshOnTokenExpire() {
  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const expiration = getTokenExpiration(token);
    if (!expiration) return;

    const now = Date.now();
    const timeout = expiration - now - 2000;
    if (timeout > 0) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, []);
}
