import fileSystem from "fs";
import { exit }  from "process";

export default async function dbFileCheck(){
    const fileURN = "db.json";
    if(!fileSystem.existsSync(fileURN)){
        console.log("File does not exits");
        exit(1);
    }
}