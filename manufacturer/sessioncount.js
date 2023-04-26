const db=require('../dbconnector/connection')
const{formattedDate, formattedTime}=require('../dateandtime');
const { resolve } = require('promise');
const { Promise } = require('mongoose');


module.exports = {
  count: (sesssionname) => {
    console.log(sesssionname);
    return new Promise((resolve, reject) => {
      let data = [[sesssionname, "online", formattedDate, formattedTime]];
      console.log(data);
      db.query("INSERT INTO sessioncount (name,status,date,time) VALUES ?",[data],(err, result) => {
            if (err) {reject(console.log(err));} 
            else { if (result.affectedRows > 0) 
                 { resolve({ data: result, message: "inserted" });
            } else {
              reject({ data: "NO inserted", message: "ERROR" });
            }
          }
        }
      );
    });
  },
  count_entries:(sessionname)=>{
      return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total_entries FROM sessioncount where name=?",[sessionname],(err,result)=>{
                  if(result.length>0){
                        //pending

                  }
            });
            
      })

  },
  update_status: (statusname) => {
      
    return new Promise((resolve, reject) => {
      console.log(statusname);
      let status = [[]];
      db.query(
        "UPDATE sessioncount SET status = ? WHERE name = (SELECT MAX(name) FROM sessioncount WHERE name = ?)"
      );
      //pending
    });
  },

};