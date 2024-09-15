import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeDataInStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`${key}`, jsonValue);
    saveDataStoredTimeToStorage();
    console.log("Data stored successfully", key);
  } catch (e) {
    // saving error
    console.error("Error storing data", e);
  }
};
export const getDataFromStorageJson = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error("Error reading data", e);
  }
};
export const deleteDataInStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (e) {
    // error reading value
    console.error(`Error deleting this key ${key}`, e);
  }
};

export const resetStorage = async () => {
  await AsyncStorage.clear();
};
const saveDataStoredTimeToStorage = async () => {
  try {
    const currentTime = new Date().getTime();
    const jsonValue = JSON.stringify(currentTime);
    await AsyncStorage.setItem("dataStoredTime", jsonValue);
  } catch (e) {
    // saving error
    console.error("Error storing data", e);
  }
};

export const isStoredDataExpired = async (time: number) => {
  const dataStoredTime = await getDataFromStorageJson("dataStoredTime");
  if (dataStoredTime) {
    const currentTime = new Date().getTime();
    const difference = currentTime - dataStoredTime;
    if (difference > time * 1000) {
      console.log("stored data expired");
      return true;
    }
  }
  console.log("stored data is not expired");
  return false;
};
export const getUserId = async () => {
  
  const userId = await AsyncStorage.getItem("userId");
  return userId;
};
