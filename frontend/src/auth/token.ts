const Token = '@token';

export const getToken = () => localStorage.getItem(Token);
export const setToken = (token: string) => localStorage.setItem(Token, token);
export const logout = () => localStorage.removeItem(Token);
