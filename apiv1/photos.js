import AsyncStorage from "@react-native-async-storage/async-storage";
import {refreshTokenIfExpired} from "./tokens"
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { ip } from "../ip.json";
export async function uploadAvatar(photo) {
    await refreshTokenIfExpired(); // Ensure this function is implemented
    const token = await AsyncStorage.getItem("accessToken");
  
    const formData = new FormData();
    formData.append("image", {
      uri: photo.uri,
      type: photo.type || "image/jpeg", // Default to JPEG if type is missing
      name: photo.name || "avatar.jpg", // Default file name if not provided
    });
  
    try {
      const req = await axios.post(
        `http://${ip}:8080/api/v1/photos/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const data = await req.data;
      return data;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  }
  
  export async function downloadFile(userId) {
    await refreshTokenIfExpired(); // Ensure this function is implemented
    const token = await AsyncStorage.getItem("accessToken");
    try {
      // URL of the file you want to download
      const fileUri = `http://${ip}:8080/api/v1/photos/avatar/${userId}`;
  
      // Local path where you want to save the file
      const localUri = FileSystem.documentDirectory + `a_${userId}.jpg`;
  
      // Headers you want to add to the request
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Download the file with headers
      const uri = await FileSystem.downloadAsync(fileUri, localUri, {
        headers: headers,
      });
  
      console.log("File downloaded to:", uri.uri);
      return uri.uri;
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  
  export async function getAvatar(userId) {
    await refreshTokenIfExpired(); // Ensure this function is implemented
    const token = await AsyncStorage.getItem("accessToken");
    console.log("userId", userId);
    try {
      const req = await axios.get(
        // `http://${ip}:8080/api/v1/photos/avatar/${userId}`,
        "https://i.sstatic.net/WndPD.png",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = req.data;
      const base64String = data.split(",")[1];
  
      const fileUri = FileSystem.documentDirectory + `${userId}_avatar.jpg`;
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Image saved to:", fileUri);
  
      return data;
    } catch (error) {
      console.error("Error downloading avatar:", error);
      throw error;
    }
  }
  
  