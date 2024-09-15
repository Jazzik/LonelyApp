import * as SQLite from 'expo-sqlite';
import { getChats } from '@/api/apiv1';
export function createTable(db){
  console.log('create table')


  db.execSync("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY NOT NULL, sender INTEGER NOT NULL, receiver TEXT NOT NULL, message TEXT NOT NULL,sentdate INTEGER NOT NULL)");
  db.execSync("CREATE TABLE IF NOT EXISTS chats (id VARCHAR(50) PRIMARY KEY NOT NULL, name TEXT NOT NULL, photo TEXT)");
  db.execSync("CREATE TABLE IF NOT EXISTS chatMembers (id INTEGER PRIMARY KEY NOT NULL, groupid INTEGER, memberid INTEGER, role INTEGER, membersince INTEGER)");

  
}
export function dropTables(db){
  db.execSync("DROP TABLE IF EXISTS chats;");
  db.execSync("DROP TABLE IF EXISTS messages;");
}
export async function addMessageObject(db, msg){
  let message = msg[0]
  console.log(message)
  const dateString = message.createdAt
  const date = new Date(dateString);
  const unixTimestamp = date.getTime();
  console.log(message._id, message.user._id, message.text, unixTimestamp) // Convert milliseconds to seconds
  console.log(await db.runAsync("INSERT INTO messages (id, sender, receiver, message, sentdate) VALUES (?, ?, ?, ?, ?)",Math.round(Math.random()*1000), Math.round(Math.random()*1000), message.text, unixTimestamp))
}
export function getMessages(db){
    
  messages_array = []
  storage = db.getAllSync('SELECT * FROM messages')
  storage.forEach(element => {
    message ={
      _id: element.id,
      text: element.message,
      createdAt: element.sentdate,
      user: {
        _id: element.sender,
        name: "React Native",
        avatar: undefined,
      },
    }
    messages_array.push(message)
  });
return messages_array.reverse()
}
export async function getLocalChats(db){
  let chats = await getChats()
  
  let storage = await db.getAllAsync('SELECT id FROM chats')
  Object.entries(chats).forEach((id)=>{
    console.log(id)      
    addChat(db,id[0],id[1], '')

  })
  let s = await db.getAllAsync('SELECT * FROM chats')
  console.log(s)
  return s
}

export function addChat(db, id, name, photo){
  console.log("added chat") // Convert milliseconds to seconds
  return db.runAsync("INSERT OR IGNORE INTO chats (id, name, photo) VALUES (?, ?, ?)", id, name, photo);}

export async function getDialog(db, name){
  messages_array = []
  storage = db.getAllSync('SELECT * FROM messages WHERE sender = ? or receiver = ? ;' , [name, name])
  storage.forEach(element => {
    message ={
      _id: element.id,
      text: element.message,
      createdAt: element.sentdate,
      user: {
        _id: element.sender,
        name: "React Native",
        avatar: undefined,
      },
    }
    messages_array.push(message)
  });
return messages_array.reverse()
}
export async function addMessageRaw(db, id, sender, receiver, message, sentdate){
  console.log("added message")
  await db.runAsync("INSERT INTO messages (id, sender,receiver, message, sentdate) VALUES (?, ?, ?, ?, ?)",id, sender,receiver, message, sentdate)
}