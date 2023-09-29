const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {postGal,getAllGal,getOneGal,DeleteGal} = require("../modules/galerie");



const PoGal = async (req, res) => {
    try {
      const Gal = {
        FileVdImg:req.body.FileVdImg,
        Date_Ajout:req.body.Date_Ajout,
        User_ID:req.body.User_ID,
        Type_fich:req.body.Type_fich
      };
      await postGal(Gal);
      res.status(201).send(Gal);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

const getGal = (req, res) => {
  const callback = (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else res.status(200).send(result);
  };
  getAllGal(callback);
};

const getoneGal = (req, res) => {
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
        return res.status(404).send("Gallery not found");
      } else {
        return res.status(200).send(result);
      }
    };
    getOneGal(id, callback);
  }

  const DeleteGalPost = async (req, res) => {

    const id  = req.query.Id_Gal; 
    console.log(id)// Assuming the ID is passed as a route parameter
    try {
        const result = await DeleteGal(id); 
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

module.exports = {PoGal,getGal,getoneGal,DeleteGalPost};
