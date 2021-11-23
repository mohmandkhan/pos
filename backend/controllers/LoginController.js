const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async login(req, res){
        try{
            const {username, password} = req.body;
            if(!username || !password){
                return res.status(200).json({message: 'Required fields missing'})
            }

            const user = await User.findOne({username});
            if(!user){
                return res.status(200).json({message: 'User not found'});
            }
            // console.log(bcrypt.hash(password, 10));
            // console.log(user.password);

            if(user && await bcrypt.compare(password, user.password)){
                const userResponse = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
                return res.json(userResponse);
            }else {
                return res.status(200).json({message: 'Credentials miss-matched.'})
            }

        }catch(error){
            throw Error(`Error while authenticating user ${error}`)
        }
    }
}