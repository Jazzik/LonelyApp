const fs = require('fs');

export function setIp(ip){
// Step 1: Read the JSON file
const jsonData = fs.readFileSync('ip.json', 'utf8');

// Step 2: Parse the JSON data
let data = JSON.parse(jsonData);

// Step 3: Modify the data
data.ip = ip;

// Step 4: Write back to the JSON file
const updatedJsonData = JSON.stringify(data, null, 4);
fs.writeFileSync('ip.json', updatedJsonData, 'utf8');
}