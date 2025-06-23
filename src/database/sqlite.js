import sqlite3 from 'sqlite3';


const SQLite = sqlite3.verbose();



function execute(command, params, method = "all"){
    return new Promise ((resolve, reject)=>{
        db[method](command, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}

const db = new SQLite.Database("./src/database/banco.db", SQLite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error opening database:", err);
    } else {
        console.log("Database opened successfully");
    }
});

export {db, execute};