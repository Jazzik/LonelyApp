import AsyncStorage from "@react-native-async-storage/async-storage";
class IpManager{
    constructor(){
        this.initialize();

    }
    async initialize() {
        try{
        this.ip = await AsyncStorage.getItem('ip');
        }
        catch(error){
        this.ip = "100.67.78.26";
        await AsyncStorage.setItem('ip', this.ip);
        }        
    }
    async setIp(ip){
        this.ip = ip;
        await AsyncStorage.setItem('ip', ip);
    }
    getIp(){
        return this.ip;
    }

}
export const ipManager = new IpManager();