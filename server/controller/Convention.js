const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {postConvs,getAllConv,getOneConv,DeleteConv} = require("../modules/Convention");



const PoConvs = async (req, res) => {
    try {
      const Convs = {
        File: req.body.File,
        Ajout_Name:req.body.Ajout_Name,
        Date_Ajout:req.body.Date_Ajout,
        User_ID:req.body.User_ID
      };
      await postConvs(Convs);
      res.status(201).send(Convs);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

const getConvs = (req, res) => {
  const callback = (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else res.status(200).send(result);
  };
  getAllConv(callback);
};

const getoneconv = (req, res) => {
  const id = req.query.User_ID;
    console.log(id)
    if (!id) {
      return res.status(400).send("User_ID parameter is required");
    }
  
    const callback = (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else if (!result || result.length === 0) {
        return res.status(404).send("Convention not found");
      } else {
        return res.status(200).send(result);
      }
    };
    getOneConv(id, callback);
  }


  const DeleteNewPost = async (req, res) => {

    const id  = req.query.Id_Convention_TNB; 
    console.log(id)// Assuming the ID is passed as a route parameter
    try {
        const result = await DeleteConv(id); 
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'New deleted successfully' });
        } else {
            res.status(404).json({ message: 'New post not found' });
        }
    } catch (error) {
        console.error('Error deleting New:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {PoConvs,getConvs,getoneconv,DeleteNewPost};
