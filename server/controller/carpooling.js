const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {postCar,getAllCarp,postPar,getPar,getOneCar,DeleteCar,DeletePar} = require("../modules/carpooling");



const carPost = async (req, res) => {
    try {
      const car = {
        Id_Carpooling: req.body.Id_Carpooling,
        Governorate: req.body.Governorate,
        Name:req.body.Name,
        Work_site:req.body.Work_site,
        Delegation:req.body.Delegation,
        User_ID:req.body.User_ID
      };
      await postCar(car);
      res.status(201).send(car);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  const getCarpp = (req, res) => {
    const callback = (err, result) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else res.status(200).send(result);
    };
    getAllCarp(callback);
  };

  const ParPost = async (req, res) => {
    try {
      const par = {
        Id_Carpooling: req.body.Id_Carpooling,
        Num_Tel: req.body.Num_Tel,
        Name:req.body.Name,
        User_ID:req.body.User_ID
      };
      await postPar(par);
      res.status(201).send(par);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  const getParps = (req, res) => {
    const callback = (err, result) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
        
      } 
      else res.status(200).send(result);
    };
    getPar(callback);
  };

  const getonecarr = (req, res) => {
    const id = req.query.User_ID;
    // console.log(id)
    if (!id) {
      return res.status(400).send("User_ID parameter is required");
    }
  
    const callback = (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else if (!result || result.length === 0) {
        return res.status(404).send("carpooling not found");
      } else {
        return res.status(200).send(result);
      }
    };
    getOneCar(id, callback);
  };

  const DeleteCarPost = async (req, res) => {

    const id  = req.query.Id_Carpooling; 
    console.log(id)// Assuming the ID is passed as a route parameter
    try {
        const result = await DeleteCar(id); // Call the DeleteEmp function
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Carpooling deleted successfully' });
        } else {
            res.status(404).json({ message: 'Carpooling post not found' });
        }
    } catch (error) {
        console.error('Error deleting Carpooling:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };

  const DeleteParPost = async (req, res) => {

    const id  = req.query.Id_Carpooling; 
    console.log(id)// Assuming the ID is passed as a route parameter
    try {
        const result = await DeletePar(id); // Call the DeleteEmp function
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Carpooling participation deleted successfully' });
        } else {
            res.status(404).json({ message: 'Carpooling participation post not found' });
        }
    } catch (error) {
        console.error('Error deleting Carpooling:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {carPost,getCarpp,ParPost,getParps,getonecarr,DeleteCarPost,DeleteParPost};
