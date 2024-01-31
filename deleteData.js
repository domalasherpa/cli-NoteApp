import fileSystem, { writeFile } from "fs";
import inquirer from "inquirer";
import writeToFile from "./writeToFile.js";
import queryDB from "./queryDB.js";
import { error } from "console";

export default async function deleteData(info){
    try{
        let fileURN = "db.json";
        queryDB(); 
        let noteIds= [];
        let newSet = new Set(info);

        newSet.forEach(element => {
            noteIds.push(element.id);            
        });

        const answer = await inquirer.prompt([
            {
                type: "checkbox",
                name: "id",
                message: "Select the note id you want to delete: ",
                choices: noteIds
            }
        ])

        answer.id.forEach((id)=>{     
            newSet.forEach((arrayId)=>{
                if(id === arrayId.id){
                    newSet.delete(arrayId)
                    return;
                }
            })
        });
       
        info = [...newSet];
        await writeToFile(fileURN, info).then(
            (value)=>{console.log("Sucessfull deleted.")},
            (error)=>{console.log("Unable to delete note.")}
        );
    }
    catch(error){
        console.log(error);
    }
}

queryDB(deleteData);