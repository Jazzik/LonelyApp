import * as SQLite from 'expo-sqlite';

export async function createTable(db){
  console.log('create table')
  // await db.execAsync("DROP TABLE IF EXISTS messages;");
  await db.execAsync("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY NOT NULL, sender INTEGER NOT NULL, message TEXT NOT NULL,sentdate INTEGER NOT NULL)");
}
export async function addMessageObject(db, msg){
  let message = msg[0]
  console.log(message)
  const dateString = message.createdAt
  const date = new Date(dateString);
  const unixTimestamp = date.getTime() / 1000;
  console.log(message._id, message.user._id, message.text, unixTimestamp) // Convert milliseconds to seconds
  console.log(await db.runAsync("INSERT INTO messages (id, sender, message, sentdate) VALUES (?, ?, ?, ?)",Math.round(Math.random()*1000), Math.round(Math.random()*1000), message.text, unixTimestamp))
}
export function getMessages(db){
  return db.getAllSync('SELECT * FROM messages')

}
export async function addMessageRaw(db, id, sender, message, sentdate){
  console.log(await db.runAsync("INSERT INTO messages (id, sender, message, sentdate) VALUES (?, ?, ?, ?)",id, sender,message, sentdate))

}