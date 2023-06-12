const User = require('../models/User')

const viewUser = async (req, res) => {
    const user = await User.find()
    res.json(user)
}

const editUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    await user.save();
    res.json(user);
}

module.exports = { viewUser, editUser }


