const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  postOneEmp,
  getOneEmp,
  getAllEmps,
  getEmp,
  getUser,
  postUser,
  get_user,
  DeleteEmp,
  postArchvEmp,
  getArchv
} = require("../modules/users");

//SIGN UP for user

const signUp = async (req, res) => {
  try {
    const dbUser = await getUser(req.body.E_Mail);
    if (dbUser.length > 0) {
      res.status(409).send("User already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.Password,10);
    console.log(hashedPassword)
    const user = {
      Full_Name: req.body.Full_Name,
      Matricule: req.body.Matricule,
      E_Mail: req.body.E_Mail,
      Password: hashedPassword,
      Picture : req.body.Picture
    };
    await postUser(user);
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getoneuser = (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) {
    return res.status(400).send("Email parameter is required");
  }

  const callback = (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else if (!result || result.length === 0) {
      return res.status(404).send("User not found");
    } else {
      return res.status(200).send(result);
    }
  };
  get_user(userEmail, callback);
};

// Post for information about Employee

const postEmp = async (req, res) => {
  try {
    const dbUser = await getEmp(req.body.E_Mail);
    if (dbUser.length > 0) {
      res.status(409).send("User already exists");
      return;
    }
    const user = {
      Hiring_Date: req.body.Hiring_Date,
      Full_Name: req.body.Full_Name,
      Adress: req.body.Adress,
      Telephone: req.body.Telephone,
      Birth_Date: req.body.Birth_Date,
      Nationality: req.body.Nationality,
      cin: req.body.cin,
      Matricule: req.body.Matricule,
      E_Mail: req.body.E_Mail,
      Family_Situation: req.body.Family_Situation,
      Number_Children: req.body.Number_Children,
      Studies_Level: req.body.Studies_Level,
      Other_Qualification: req.body.Other_Qualification,
      Type_Contract: req.body.Type_Contract,
      Trial_Period: req.body.Trial_Period,
      Contract_Duration: req.body.Contract_Duration,
      Proposed_Salary: req.body.Proposed_Salary,
      rib: req.body.rib,
      Bank_Name: req.body.Bank_Name,
      Job_Title: req.body.Job_Title,
      image: req.body.image,
      Telephone_2: req.body.Telephone_2,
      Type_Emp: req.body.Type_Emp,
    };
    await postOneEmp(user);
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//GET ALL Emps

const getEmps = (req, res) => {
  const callback = (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else res.status(200).send(result);
  };
  getAllEmps(callback);
};

//GET ONE Emp ( GET WITH E-MAIL )

const getEmployee = (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) {
    return res.status(400).send("Email parameter is required");
  }

  const callback = (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else if (!result || result.length === 0) {
      return res.status(404).send("User not found");
    } else {
      return res.status(200).send(result);
    }
  };
  getOneEmp(userEmail, callback);
};


/// DELETE one Employee

const DelEmployee = async (req, res) => {

  const id  = req.query.Emp_Id; 
  console.log(id)// Assuming the ID is passed as a route parameter
  try {
      const result = await DeleteEmp(id); // Call the DeleteEmp function
      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Employee deleted successfully' });
      } else {
          res.status(404).json({ message: 'Employee not found' });
      }
  } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const dbUser = await getUser(req.body.E_Mail);
    // console.log(dbUser)
    if (!dbUser || dbUser.length === 0) {
      res.status(404).send("Non-existing user");
      console.log(req.body)

      return;
    }

    

    const passwordEnteredByUser = req.body.Password
    const hash = dbUser[0].Password
    console.log( dbUser[0].Password,'DB');
    console.log( passwordEnteredByUser,'BODY');
    const matchedPassword = await bcrypt.compare(passwordEnteredByUser,hash);
    console.log(matchedPassword)
  

    if (matchedPassword) {
      const token = jwt.sign(
        {
          User_ID: dbUser[0].User_ID,
          E_Mail: dbUser[0].E_Mail,
        },
        "123"
        
      );
      res.cookie('jwt', token, { httpOnly: true });

      res.status(200).json({
        token: token,
        message: "Authentication successful",
        name: dbUser[0].Full_Name,
      });
    } else {
      res.status(400).send("Wrong password");
    }
  }
   catch (error) {
    console.log('oui  ',error)
    res.status(400).send("Problem with login");
  }
};


const postEmpArchv = async (req, res) => {
  try {
    const dbUser = await getArchv(req.body.E_Mail);
    if (dbUser.length > 0) {
      res.status(409).send("Emp already exists");
      return;
    }
    const user = {
      Hiring_Date: req.body.Hiring_Date,
      Full_Name: req.body.Full_Name,
      Adress: req.body.Adress,
      Telephone: req.body.Telephone,
      Birth_Date: req.body.Birth_Date,
      Nationality: req.body.Nationality,
      cin: req.body.cin,
      Matricule: req.body.Matricule,
      E_Mail: req.body.E_Mail,
      Family_Situation: req.body.Family_Situation,
      Number_Children: req.body.Number_Children,
      Studies_Level: req.body.Studies_Level,
      Other_Qualification: req.body.Other_Qualification,
      Type_Contract: req.body.Type_Contract,
      Trial_Period: req.body.Trial_Period,
      Contract_Duration: req.body.Contract_Duration,
      Proposed_Salary: req.body.Proposed_Salary,
      rib: req.body.rib,
      Bank_Name: req.body.Bank_Name,
      Job_Title: req.body.Job_Title,
      image: req.body.image,
      Telephone_2: req.body.Telephone_2,
      Type_Emp: req.body.Type_Emp,
      Emp_Id:req.body.Emp_Id
    };
    await postArchvEmp(user);
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


module.exports = { postEmp, getEmps, getEmployee, signUp, getoneuser, DelEmployee, loginUser,postEmpArchv};
