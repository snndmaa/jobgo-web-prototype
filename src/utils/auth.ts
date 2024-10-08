export const getCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  };
  
  export const isAuthenticated = (): boolean => {
    return !!getCurrentUser();
  };
  
  export const logout = () => {
    localStorage.removeItem('currentUser');
  };
  