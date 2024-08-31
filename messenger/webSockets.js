import EventEmitter from "events";
import { ip } from "@/ip.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMessageRaw } from "./sql";
export const eventEmitter = new EventEmitter();


let ws = undefined;
async function getConnection(){
    console.log(ws)
    if (ws === undefined || ws.readyState === WebSocket.CLOSED){
        const token = await AsyncStorage.getItem("accessToken");
        const auth = "Bearer " + token;
        ws = new WebSocket(`ws://${ip}:8080/ws/messages`, [], { headers: {Authorization:auth} })
        console.log('connected')
    } else {
        return ws;
    }
}
export async function sendMessage(){
    const ws = await getConnection();
    ws.send(JSON.stringify({type: "MESSAGE", data: "test message"}))
}
export async function socketConnection(db) {
  await getConnection();
  console.log(ws)
  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = async (event) => {
    data = JSON.parse(event.data)
    console.log(data)
    console.log(await addMessageRaw(db, data.id, data.from, data.to, data.message, data.sentdate ))
    eventEmitter.emit('message')
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };
}

