import express from 'express'
import fs from 'fs'
import { format } from 'date-fns';
import path from 'path';

const PORT=process.env.PORT ||9000;
let app=express()
app.use(express.json())
app.get('/',(req,res)=>{
    let today=format(new Date(),'dd-MM-yyyy-HH-mm-ss')
    const filePath = `DateTime/${today}.txt`;
    fs.writeFileSync(filePath,`${today}`,'utf8')
    let data=fs.readFileSync(filePath,'utf8')
    try {
        res.status(200).send(data)
        
    } catch (error) {
        req.res(500).send('Internel server error')
        
    }
})

app.get("/getfiles", (req, res) => {
    const folderPath = "DateTime";
  
    fs.readdir(folderPath, (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("An error occured while listing the files from directory");
      } else {
        const textFiles = data.filter((data) => path.extname(data) === ".txt");
        res.status(200).json(textFiles);
      }
    });
  });




app.listen(PORT,()=>console.log(`Loading Port No... ${PORT}`))