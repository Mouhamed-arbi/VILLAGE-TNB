const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {postNews,getAllNews,getOneNew,DeleteNew} = require("../modules/News");



const PoNews = async (req, res) => {
    try {
      const News = {
        Description: req.body.Description,
        image:req.body.image,
        Title:req.body.Title,
        Date_Ajout:req.body.Date_Ajout,
        User_ID:req.body.User_ID
      };
      await postNews(News);
      res.status(201).send(News);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

const getNews = (req, res) => {
  const callback = (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else res.status(200).send(result);
  };
  getAllNews(callback);
};

const getonenew = (req, res) => {
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
        return res.status(404).send("NEWS not found");
      } else {
        return res.status(200).send(result);
      }
    };
    getOneNew(id, callback);
  }

  const DeleteNewPost = async (req, res) => {

    const id  = req.query.Id_News; 
    console.log(id)// Assuming the ID is passed as a route parameter
    try {
        const result = await DeleteNew(id); 
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

module.exports = {PoNews,getNews,getonenew,DeleteNewPost};
