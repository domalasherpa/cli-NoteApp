import fileSystem from "fs";
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";
import writeToFile from "./writeToFile.js";

// ADD new data to the file
export default async function createDate(info){
    let questions = [
        { type:"input", name:"title", message:"Title: " },
        { type:"input", name:"body", message: "Body: " }
    ];
    
    let fileURN = "db.json";

    try{
        let answer = await inquirer.prompt(questions);
        info.push(answer);
                
        if(!fileSystem.existsSync(fileURN)){
            fileSystem.appendFile(fileURN, "[]", (error)=>{
                if(error){
                    console.log("Error while creating new file...", error);
                }
            })
        }
        await writeToFile(fileURN, info).then(
            (value)=>{console.log("Data sucessfully added")},
            (error)=>{console.log("Unable to add data.")}
        );
    }
    catch(error){
        console.log("Something went wrong..", error);
    }
}

queryDB(createDate);