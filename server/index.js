const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("./database");
const cors = require("cors");
const postRouter = require("./routes/user");
const getRouter = require("./routes/user");
const getOne = require("./routes/user");
const signUp = require("./routes/user");
const getuser = require("./routes/user");
const DelEmployee = require("./routes/user");
const ArchvPost = require("./routes/user");
const carPost = require("./routes/carpooling");
const carGet = require("./routes/carpooling");
const PostPar = require("./routes/carpooling");
const GetPar = require("./routes/carpooling");
const GetOneCarr = require("./routes/carpooling");
const Delcar = require("./routes/carpooling");
const Delpar = require("./routes/carpooling");
const PostNew = require("./routes/News");
const GetNew = require("./routes/News");
const GetoneNew = require("./routes/News");
const deletenew = require("./routes/News");
const PostConv = require("./routes/Convention");
const GetConv = require("./routes/Convention");
const GetoneConv = require("./routes/Convention");
const deleteconv =require("./routes/Convention");
const PostGal = require("./routes/galerie");
const GetGal = require("./routes/galerie");
const GetoneGal = require("./routes/galerie");
const deleteGal =require("./routes/galerie");



const { getUser } = require("./modules/users");
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/info", postRouter);
app.use("/getallemp", getRouter);
app.use("/", getOne);
app.use("/signup", signUp);
app.use("/getuser", getuser);
app.use("/", DelEmployee);
app.use("/",ArchvPost)


app.use("/car", carPost);
app.use("/getcar", carGet);
// app.use('/CarPar', CarPar);
app.use("/", GetPar);
app.use("/", PostPar);
app.use("/onecar", GetOneCarr);
app.use("/delcar", Delcar);
app.use("/delpar", Delpar);



app.use("/news", PostNew);
app.use("/news", GetNew);
app.use("/", GetoneNew);
app.use("/delnew", deletenew);



app.use("/conv",PostConv);
app.use("/conv",GetConv);
app.use("/", GetoneConv);
app.use("/delconv", deleteconv);



app.use("/gal",PostGal);
app.use("/gal",GetGal);
app.use("/", GetoneGal);
app.use("/delgal", deleteGal);


app.put("/update/:E_Mail", async (req, res) => {
  try {
    const { E_Mail, Matricule, Full_Name, Picture, Password } = req.body;
    var d = Password;
    console.log("Pass ", Password);
    const dbUser = await getUser(req.params.E_Mail);
    const hash = dbUser[0].Password;
    console.log(dbUser[0].Password, "DB");
    console.log(Password, "BODY");
    const matchedPassword = await bcrypt.compare(Password, hash);
    console.log(matchedPassword);
    if (hash == Password) {
      d = dbUser[0].Password;
    } else if (!matchedPassword) {
      d = await bcrypt.hash(Password, 10);
    } else d = dbUser[0].Password;

    connection.query(
      "UPDATE users SET E_Mail=?, Matricule=?, Full_Name=?, Picture=?, Password=? WHERE E_Mail=?",
      [E_Mail, Matricule, Full_Name, Picture, d, req.params.E_Mail],
      (error, results) => {
        if (error) {
          console.error("Error updating user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json("Updated");
      }
    );
  } catch (err) {
    console.error("Error hashing password:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});




app.put("/updateEmp/:E_Mail", async (req, res) => {
  try {
    const { Hiring_Date,
  Full_Name,
Adress,
Telephone,
Birth_Date,
Nationality,
cin,
Matricule,
E_Mail,
Family_Situation,
Number_Children,
Studies_Level,
Other_Qualification,
Type_Contract,
Trial_Period,
Contract_Duration,
Proposed_Salary,
rib,
Bank_Name,
Job_Title,
image,
Telephone_2,
Type_Emp,
} = req.body;
    
    const dbUser = await getUser(req.params.E_Mail);

    connection.query(
      "UPDATE employees SET E_Mail=?, Matricule=?, Full_Name=?, image=?, Adress=?,Family_Situation=?,Telephone_2=?,Type_Emp=?,Number_Children=?,Studies_Level=?,Other_Qualification=?,Type_Contract=?,Trial_Period=?,Contract_Duration=?,Proposed_Salary=?,rib=?,Bank_Name=?,Job_Title=?,Telephone=?,Birth_Date=?,Nationality=?,cin=? WHERE E_Mail=?",
      [E_Mail, Matricule, Full_Name, image, Adress,Family_Situation,Telephone_2,Type_Emp,Number_Children,Studies_Level,Other_Qualification,Type_Contract,Trial_Period,Contract_Duration,Proposed_Salary,rib,Bank_Name,Job_Title,Telephone,Birth_Date,Nationality,cin, req.params.E_Mail],
      (error, results) => {
        if (error) {
          console.error("Error updating Employee:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json("Updated");
      }
    );
  } catch (err) {
    console.error("Error :", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});



const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
