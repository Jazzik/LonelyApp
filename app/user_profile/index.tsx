import { View, Image } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "@/constants/Style";
import { useFocusEffect, useNavigationContainerRef } from "expo-router";
import { getDataFromStorageJson, resetStorage } from "@/utils/storageActions";
import { useEffect, useState } from "react";
import UniversalButton from "@/components/UniversalButton";
import { Dimensions } from "react-native";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import i18n from "@/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUserPhotoLoaded } from "@/utils/checkUserPhotoLoaded";
import { useSQLiteContext } from "expo-sqlite";
import { dropTables, createTable } from "@/messenger/sql";
import { uploadAvatar } from "@/api/apiv1";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default function UserProfile() {
  const db = useSQLiteContext();
  const [image, setImage] = useState<string>(
    "@/assets/images/user/default-photo.png"
  );
  useEffect(() => {
    checkUserPhotoLoaded(setImage);
  }, []);

  const router = useNavigationContainerRef();

  const LogOutUser = async () => {
    await resetStorage();
    dropTables(db);
    createTable(db);
    router.reset({ index: 0, routes: [{ name: "login" }] });
  };

  const pickImageAsync = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    const checkIfFileExists = async (filePath: string): Promise<boolean> => {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      return fileInfo.exists;
    };

    let userPhotoPath = FileSystem.documentDirectory + "user-photo.png";
    if (!result.canceled) {
      if (await checkIfFileExists(userPhotoPath)) {
        console.log("Deleting old image");
        await FileSystem.deleteAsync(userPhotoPath);
        userPhotoPath = FileSystem.documentDirectory + "user-photo2.png";
      }

      try {
        console.log("Saving image to:", userPhotoPath);
        await FileSystem.copyAsync({
          from: result.assets[0].uri,
          to: userPhotoPath,
        });

        await AsyncStorage.setItem("UserPhotoPath", userPhotoPath);
        setImage(result.assets[0].uri);
        uploadAvatar(result.assets[0]);

        // console.log("Image saved as user-photo.png");
      } catch (error) {
        console.error("Error saving image:", error);
      }
    } else {
      alert(i18n.t("user_has_not_selected_an_image"));
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView scrollEnabled={true} overScrollMode={"always"}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={
              image
                ? { uri: image }
                : require("@/assets/images/user/default-photo.png")
            }
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderColor: "white",
              borderWidth: 2,
            }}
          />
          <UniversalButton
            press={() => {
              console.log("Edit photo button pressed");
              pickImageAsync();
            }}
            accessible={true}
            text="Edit photo"
            ButtonContainerWidth={250}
            fontSize={22}
            
          />
          <UniversalButton
            press={() => console.log("some button pressed")}
            text="Achievements"
            ButtonBGColor="rgb(226,196,120)"
            ShadowBGColor="rgb(166,120,58)"
            fontSize={16}
            ButtonContainerWidth={250}
            accessible={true}
            
          />
          <UniversalButton
            press={() => console.log("some button pressed")}
            text="Some setting"
            ButtonBGColor="rgb(145,222,139)"
            ShadowBGColor="rgb(85,187,54)"
            fontSize={22}
            ButtonContainerWidth={250}
          />
          <UniversalButton
            press={() => console.log("some button pressed")}
            text="Sure thing"
            fontSize={22}
            ButtonContainerWidth={250}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: deviceHeight * 0.1,
            paddingBottom: 20,
          }}
        >
          <UniversalButton
            press={LogOutUser}
            text="Log out"
            ButtonBGColor="#FF0000"
            ShadowBGColor="#bc0000"
            ButtonContainerWidth={deviceWidth * 0.36}
            ButtonHeight={50}
            ButtonBorderRadius={20}
            ShadowHeight={15}
            accessible={true}
          />
        </View>
      </Animated.ScrollView>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          bottom: 40,
          paddingLeft: 15,
          paddingBottom: 35,
          backgroundColor: "rgba(0,0,0,0.0)",
        }}
      >
        <CustomBackButton />
      </View>
    </View>
  );
}
