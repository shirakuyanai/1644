const User = require('../models/User');
const Address = require('../models/Address');


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
    else{
        if (user.role !== 1){
            if (user.role >= req.user.role){
                res.status(401).json('Insufficient permissions');
            }
            else{
                res.json(user);
            }
        }
        else{
            if (user.role >= req.user.role){
                res.status(401).json('Insufficient permissions');
            }
            else{
                res.json(user);
            }
        }
    }
}

const addressById = async (req,res) => {
    try{
        const address = await Address.findById(req.params.addressId)
        if (address){
            res.json(address)
        }
        else{
            res.status(404).json('No address found')
        }
    } catch (err){
        console.error(err)
    }
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

const changeUserStatus = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (user){
            if (req.user._id === req.params.id){
                res.status(401).json('You cannot suspend yourself');
            }
            else if (user.role !== 1){
                if (user.role >= req.user.role){
                    res.status(401).json('Insufficient permissions')
                }
                else{
                    user.status = !user.status
                    await user.save()
                    res.json('Changes saved')
                }
            }
            else{
                if (user.role >= req.user.role || user._id === req.user._id){
                    res.status(401).json('Insufficient permissions')
                }
                else{
                    user.status = !user.status
                    await user.save()
                    res.json('Changes saved')
                }
            }
        }
    }
    catch (err){
        res.status(500).json(err)
    }
    
}

const getAddresses = async (req, res) => {
    try{
        if (!req.user){
            res.status(401).json('No user logged in.')
        }else{
            const user = await User.findById(req.user.id)
            if (user){
                const addresses = await Address.find({user: user})
                if (addresses && addresses.length > 0){
                    res.json(addresses)
                }
                else{
                    res.status(404).json('No addresses found')
                }
            }else{
                res.status(404).json('No user found')
            }
        }
    }
    catch (err){
        res.status(500).json('Internal Server Error')
    }
}

const changeRole = async (req, res) =>{
    if (req.params.id === req.user.id){
        res.status(401).json('You cannot change your own role.')
    }
    else{
        const user = await User.findById(req.params.id)
        if(user){
            const role = parseInt(req.body.role)
            if (role !== 1 && role !== 2){
                res.status(400).json('Invalid role')
            }
            else{
                user.role = role
                await user.save()
                res.json('Role changed successfully!')
            }
        }
        else{
            res.status(404).json('No user found')
        }
    }
}

const viewAddressesByUser = async (req,res) => {
    const user = await User.findById(req.params.id)
    if (user){
        const addresses = await Address.find({user: user._id})
        if (addresses && addresses.length > 0){
            res.json(addresses)
        }
        else{
            res.status(404).json('No address found')
        }
    }
}


module.exports = { viewUser, editUser, viewOneUser, changeName, changeUserStatus, viewAddressesByUser, changeRole, getAddresses, addressById}