const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all user
const getAllUser = async(req, res, next) => {
    let users;

    try {
        users = await userModel.find()
    } catch (err) {
        console.log(err)
    }
    if (users.length === 0) {
        return res.status(404).json({message: "No User Found"});
    }
    return res.status(200).json({users});
}

// Add user to DB
const register = async(req, res, next) => {
    const {username, email, password} = req.body

    let existingUser
    try {
        existingUser = await userModel.findOne({email})
    }catch(err) {
        console.log(err);
    }
    
    if (existingUser) {
        return res.status(400).json({message: "User already exist! please Login"})
    }
    // Hashed user password stored in the database using
    const hashedPassword = bcrypt.hashSync(password);
    
    const user = new userModel({
        username,
        email,
        password: hashedPassword,
    });
    
    try{
        await user.save();
    } catch(err) {
        return console.log(err)
    }
    return res.status(201).json({user})
}

const login = async(req, res, next) => {
    const {email, password} = req.body

    let existingUser;

    try{
        existingUser = await userModel.findOne({email});
    } catch (err) {
        console.log(err)
    }
    if (!existingUser) {
        return res.status(404).json({message: "No User by this email"})
    }

    // Compare existingUser password
    const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);

    if (!isCorrectPassword) {
        return res.status(400).json({message: "incorrect password! Try again"})
    }

    return res.status(201).json({message: "Login Successfully"})

}

module.exports = {
    getAllUser,
    register,
    login
}

