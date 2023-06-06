const User= require('../models/User')

const viewUser = async (req, res) => {
 const duongngu = await User.find()
res.json(duongngu)
}

const editUser = async (req, res) => {
    const id = req.params.id;
    const duong = await User.findById(id);

    if (!duong) {
        return res.status(404).json({ error: 'User not found' });
    }
    duong.firstname = req.body.firstname;
    duong.lastname = req.body.lastname;
    await duong.save();
    res.json(duong);
}

module.exports = {viewUser,editUser}


