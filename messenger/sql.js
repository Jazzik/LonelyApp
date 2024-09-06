import * as SQLite from 'expo-sqlite';

export async function createTable(db){
  console.log('create table')
  //await db.execAsync("DROP TABLE IF EXISTS messages;");
  await db.execAsync("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY NOT NULL, sender INTEGER NOT NULL, receiver TEXT NOT NULL, message TEXT NOT NULL,sentdate INTEGER NOT NULL)");
  await db.execAsync("CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, photo TEXT, participants TEXT)");

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
export function getChats(db){
  let storage = db.getAllSync('SELECT * FROM chats')
  
  return storage
}

export async function addChat(db, id, name, photo, participants){
  console.log("added chat") // Convert milliseconds to seconds
  return db.runAsync("INSERT INTO chats (id, name, photo, participants) VALUES (?, ?,?,?)",id, name, photo, participants)
}

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