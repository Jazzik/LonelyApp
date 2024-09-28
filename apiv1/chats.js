import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshTokenIfExpired } from "@/apiv1/apiv1";
import axios from "axios";
import { ip } from "@/ip.json";
export async function getMessages(chatId, start, limit) {
  await refreshTokenIfExpired(); // Ensure this function is implemented
  const token = await AsyncStorage.getItem("accessToken");
  try {
    const req = await axios.get(
      `http://${ip}:8080/api/v1/account/chats/messages`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          chatId: chatId,
          start: start,
          limit: limit,
        },
      }
    );

    const data = await req.data;
    return data;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
}

export async function getMembers(chat_id) {
  await refreshTokenIfExpired(); // Ensure this function is implemented
  const token = await AsyncStorage.getItem("accessToken");
  try {
    const req = await axios.get(
      `http://${ip}:8080/api/v1/account/chats/members/${chat_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await req.data;
    return data;
  } catch (error) {
    console.error("Error getting members:", error);
    throw error;
  }
}

export async function getChats() {
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  const req = await axios.get(`http://${ip}:8080/api/v1/account/chats`, {
    headers: { Authorization: "Bearer " + token },
  });
  const dat = await req.data;
  return dat;
}
