import fileSystem from "fs";

export default async function queryDB(externalFunction){
    try{
        let info = [];
        const fileURN = "db.json";

        if(fileSystem.existsSync(fileURN)){
            
            fileSystem.readFile(fileURN, (error, data)=>{
                if(error){
                    console.log("Unable to read file..", error);
                }
                info = JSON.parse(data.toString());
                console.log(info);

                if(externalFunction && !error){
                    externalFunction(info);
                }
            })
        }
        else{
            if(externalFunction){
                externalFunction(info);
            }
        }
    }
    catch(error){
        console.log("something went wrong.", error);
    } 
} 






