export const setSessionStorageItem = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorageItem = (key: string) => {
  const item = sessionStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const removeSessionStorageItem = (key: string) => {
  sessionStorage.removeItem(key);
};
