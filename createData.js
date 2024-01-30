import fileSystem from "fs";
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

let questions = [
    { type:"input", name:"title", message:"Title: " },
    { type:"input", name:"body", message: "Body: " }
];

let fileURN = "db.json";

export default async function createDate(info){
    
    try{
        let answer = await inquirer.prompt(questions);
        info.push(answer);
        console.log(info);
        
        if(!fileSystem.existsSync(fileURN)){
            fileSystem.appendFile(fileURN, "", (error)=>{
                if(error){
                    console.log("Error while creating new file...", error);
                }
            })
        }
        addDetails(info);
    }
    catch(error){
        console.log("Something went wrong..", error);
    }
}

async function addDetails(info){
    fileSystem.writeFile(fileURN, JSON.stringify(info), (error)=>{
        if(error){
            console.log(error);
        }
        console.log("Data added sucessfully");
    })
}

queryDB(createDate);