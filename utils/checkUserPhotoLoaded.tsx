import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkUserPhotoLoaded = async (setImage: (arg0: string) => void) => {
    const value = await AsyncStorage.getItem("UserPhotoPath") ?? "";
    if (value != "null") {
      setImage(value);
      console.log("User photo loaded from storage, path is ", value); //! Console log
    } else {
      setImage("@/assets/images/user/default-photo.png");
    }
  };