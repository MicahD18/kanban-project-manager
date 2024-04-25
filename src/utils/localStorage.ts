/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveToLocalStorage = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return undefined;
  }
};
