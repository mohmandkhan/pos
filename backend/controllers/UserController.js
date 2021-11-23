const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {

    //METHOD FOR CREATING A USER
    async createUser(req, res) {
        try{
            //Get the following fields from the body
        const { firstName, lastName, email, phoneno, username, password } = req.body;
    
        //Check if user exists
            const useremailExists = await User.findOne({email});
            const userusernameExists = await User.findOne({username});
    
            if(!useremailExists || !userusernameExists){
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    phoneno,
                    username,
                    password: hashedPassword
                });
                //IF SUCCESSFUL
                return res.json({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneno: user.phoneno
                });
            }
    
            //IF NOT SUCCESSFUL
            return res.status(400).json({
                message: 'User already exists. Do you want to login?'
            })

        }catch(error) {
            throw Error(`Error while registering new user: ${error}`);
        }
        
    },

    //METHOD FOR GETTING A USER BY ID
    async getUserById(req, res) {
        const {userId} = req.params;
        try{

            const user = await User.findById(userId);
            if(user){
                return res.json(user);
            }
            return res.status(400).json({message: 'User not found'})

        }catch(error)
        {
            return res.status(400).json({message: 'User not found'})
        }
    },

    //METHOD FOR GETTING ALL USERS
    async getAllUsers(req, res){
        try{
            const users = await User.find();
            if(users){
                return res.json(users);
            }
            return res.status(400).json({message: 'No users found'})

        }catch(error){

        }
    },

    //METHOD FOR DELETING USER BY ID
    async deleteUserById(req, res){
        const {userId} = req.params;
        try{
            await User.findByIdAndDelete(userId);
            return res.status(200).send();

        }catch(error){
            throw Error(`Error deleting user ${error}`)
        }
    }

}