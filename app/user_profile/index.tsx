import { View, Image, Button } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "@/constants/Style";
import { useNavigationContainerRef } from "expo-router";
import { getDataFromStorage, resetStorage } from "@/utils/storageActions";
import { useEffect, useState } from "react";
import UniversalButton from "@/components/UniversalButton";
import { Dimensions } from "react-native";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default function UserProfile() {
  const [isUserPhotoLoaded, setIsUserPhotoLoaded] = useState(true);
  useEffect(() => {
    const checkUserPhotoLoaded = async () => {
      const value = await getDataFromStorage("UserPhoto");
      console.log("Photo is loaded:", value);
      if (JSON.stringify(value) === "true") {
        setIsUserPhotoLoaded(true);
      } else {
        setIsUserPhotoLoaded(false);
      }
    };
    checkUserPhotoLoaded();
  }, []);
  const router = useNavigationContainerRef();
  const LogOutUser = async () => {
    resetStorage();
    router.reset({ index: 0, routes: [{ name: "login" }] });
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={
              isUserPhotoLoaded
                ? require("@/assets/images/user/user-photo.png")
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
            }}
            text="Edit photo"
            ButtonContainerWidth={deviceWidth * 0.4}
            // textColor="grey"
          />
          <UniversalButton
            press={() => console.log("some button pressed")}
            text="Achievements"
            ButtonBGColor="rgb(226,196,120)"
            ShadowBGColor="rgb(166,120,58)"
            fontSize={25}
            ButtonContainerWidth={deviceWidth * 0.5}
          />
          <UniversalButton
            press={() => console.log("some button pressed")}
            text="Some setting"
            ButtonBGColor="rgb(145	222	139)"
            ShadowBGColor="rgb(85	187	54)"
            fontSize={25}
            ButtonContainerWidth={deviceWidth * 0.5}
          />
          <UniversalButton
            press={() => console.log("some button pressed")}
            text="Sure thing"
            fontSize={25}
            ButtonContainerWidth={deviceWidth * 0.5}
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
