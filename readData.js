import queryDB from "./queryDB.js";

export default function readData(info){
    info.forEach(note => {
        console.log("\n");
        for(let i in note){
            console.log(`${i}: ${note[i]}`);
        }
    });
}

queryDB(readData);