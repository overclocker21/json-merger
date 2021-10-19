const fs = require('fs');

let object1, object2 = {};

object1 = JSON.parse(fs.readFileSync('./file1.json'));
object2 = JSON.parse(fs.readFileSync('./file2.json'));

let merged = {};
Object.keys(object1).forEach(k => merged[k] = object1[k]);
Object.keys(object2).forEach(k => { 
   if (merged[k] !== object2[k]) {
       k = Object.assign(merged[k], object2[k])
   }
});

let data = JSON.stringify(merged);
fs.writeFileSync('merged.json', data);


