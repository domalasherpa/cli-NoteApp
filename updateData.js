import fileSystem from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";
import inquirer  from "inquirer";
import writeToFile from "./writeToFile.js";


async function updateDetails(currentData, info){
    let questions = [
        {
            type: "input",
            name: "title",
            message: "new Title: ",
            default: currentData.title
        },
        {
            type: "input",
            name: "body",
            message: "new Body: ",
            default: currentData.body
        }
    ]
    try{
        let fileURN = "db.json";
        const newData = await inquirer.prompt(questions);
        currentData.title = newData.title;
        currentData.body = newData.body;

        await writeToFile(fileURN, info).then(
            (value)=>{console.log("Data updated sucessfully.")},
            (error)=>{console.log("Unable to update data")}
        );
    }
    catch(error){
        console.log("Something went wrong.. ", error);
    }
}


//Update the previous note to the file
export default async function updateData(info){
    await dbFileCheck();
    
    try{
        const answers = await inquirer.prompt([
            { type: "number", name: "id", message: "Enter note id: "}
        ]);

        let currentData= {};

        info.forEach((note) => {
            console.log(answers.id, " ", typeof(answers.id));
            if(note.id === answers.id){
                currentData = note;  //shallow copy of note
                updateDetails(currentData, info);
            }
            
        });
    }
    catch(error){
        console.log("Something went wrong: ", error);
    }
}

queryDB(updateData);