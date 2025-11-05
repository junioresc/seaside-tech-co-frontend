/**
 * In-memory token storage (no localStorage to avoid XSS vulnerabilities)
 * Access token is stored in memory only
 * Refresh token is httpOnly cookie set by backend
 */

let accessToken: string | null = null;

export const getAccessToken = (): string | null => {
  return accessToken;
};

export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const clearAccessToken = (): void => {
  accessToken = null;
};

