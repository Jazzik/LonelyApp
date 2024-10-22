import EventEmitter from "events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMessageRaw } from "./sql";
import { ipManager } from "@/apiv1/ip";
class WebsocketService {
  constructor(){
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(1);
  }


async getConnection(){
        const token = await AsyncStorage.getItem("accessToken");
        const auth = "Bearer " + token;
        this.ws = new WebSocket(`ws://${ipManager.getIp()}:8080/ws/messages`, [], { headers: {Authorization:auth} })
        console.log('connected')
    
    
}
async sendMessage(username, message){

  this.ws.send(JSON.stringify({receiver:username, text:message}))

    
}
async socketConnection(db) {
  if(this.ws == undefined){
    await this.getConnection()
  }
  this.ws.onopen = () => {
    console.log("WebSocket connected");
  };

  this.ws.onmessage = async (event) => {
    data = JSON.parse(event.data)
    console.log(data)

    console.log(await addMessageRaw(db, data.id, data.from, data.to, data.message, data.sentdate ))
    this.eventEmitter.emit('message')
  };

  this.ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  this.ws.onclose = () => {
    console.log("WebSocket closed");
  };
  return true
}
disconnect(){
  if(this.ws!=undefined)
    {
      this.ws.close();
      this.ws = undefined;
    }
}
}

export const websocketService =  new WebsocketService()