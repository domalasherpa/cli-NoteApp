import fileSystem from "fs";

export default async function writeToFile(fileURN, info){
    return new Promise((resolve, reject)=>{
        fileSystem.writeFile(fileURN, JSON.stringify(info), (error)=>{
            if(error){
                reject();
            }
            else{
                resolve();
            }
        })
    });
}