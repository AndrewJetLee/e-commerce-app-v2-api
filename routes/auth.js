const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", (req, res) => {
    
    if (!req.body) {
        let errorMessage = "Please enter necessary information"
        res.status(400).send(errorMessage);
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC.toString()),
    });
    newUser.save()
    .then((data) => {
        console.log("successfully saved user:", data);
        res.status(201).json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("User doesn't exist")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Invalid password");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
   
})

module.exports = router; 