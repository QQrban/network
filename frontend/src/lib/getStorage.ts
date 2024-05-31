export const getLocalStorageItem = (key: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }

  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};
