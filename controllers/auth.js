const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        console.log("USER CREATED",user);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message,test:"FAIL" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message:"User logged in",token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('jwt_token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signup, login, logout };
