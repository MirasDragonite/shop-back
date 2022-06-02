const UserModel = require('../models/UserModel')
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }
    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });
    await user.save().then(data => {

        res.status(200).render('results', {mydata: "user "+ data.firstName +" created succesfully!"})
    }).catch(err => {

        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
    });
};

exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();

        res.status(200).render('results', {mydata: user})
    } catch(error) {
        res.status(404).render('results', {mydata: error.message})

    }
};

exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec();

        if (user===null){
            res.status(404).render('results', {mydata: "user not found"
            })
        }else{
            res.status(200).render('results', {mydata: "user :"+ user.firstName +" "
                    + user.lastName +" "+ user.email +" "+ user.phone
            })
        }

    } catch(error) {

        res.status(404).render('results', {mydata: error.message})
    }
};

exports.update = async (req, res) => {

    if (!req.body.newEmail || !req.body.newFirstName || !req.body.newLastName || !req.body.newPhone) {

        res.status(400).render('results', {mydata: "Data to update can not be empty!"})
        return
    }


    const query = req.body.oldEmail;


    await UserModel.findOneAndUpdate({email: query}, {email:req.body.newEmail,
        firstName:req.body.newFirstName,
        lastName:req.body.newLastName,
        phone:req.body.newPhone
    }).then(data => {
        console.log(data)
        if (!data) {

            res.status(404).render('results', {mydata: `User not found.`})
        }else{

            res.status(200).render('results', {mydata: "User updated successfully."})
        }
    }).catch(err => {

        res.status(500).render('results', {mydata: err.message})
    });
};

exports.destroy = async (req, res) => {


    let useremail=req.body.email
    await UserModel.deleteOne({email: useremail}).then(data => {

        if (data.deletedCount===0) {

            res.status(404).render('results', {mydata: "User not found"})

        } else {


            res.status(200).render('results', {mydata: "user "+useremail+" deleted succesfully!"})
        }
    }).catch(err => {

        res.status(500).render('results', {mydata: err.message})
    });
};