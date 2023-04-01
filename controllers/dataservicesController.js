const History = require("../models/History")

const data = async (req,res) => {
    try{
        const ans = await History.find()
        if(!ans){
            res.status(404).json({ message: "Cannot find Anything" });
        }
        res.json(ans);
  } catch (err) {
    res.status(500).json({ message: err.message });
}};

module.exports = data