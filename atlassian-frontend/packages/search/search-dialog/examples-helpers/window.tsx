export const alert = (message: string = 'alert message') => {
  if (typeof window !== 'undefined') {
    window.alert(message);
  }
};
