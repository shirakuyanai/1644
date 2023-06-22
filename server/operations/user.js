const User = require('../models/User');


const viewUser = async (req, res) => {
    const user = await User.find()
    res.json(user)
}

const viewOneUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}

const editUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.role = req.body.role;
    await user.save();
    res.json(user);
}

const changeName = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user){
        res.status(404).json({ error: 'User not found' });
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    await user.save();
    res.json('Changed name successffully!')
}



module.exports = { viewUser, editUser, viewOneUser, changeName }


