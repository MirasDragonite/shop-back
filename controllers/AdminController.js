const AdminModel = require('../models/AdminModel')
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }
    const admin= new AdminModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });
    await admin.save().then(data => {

        res.status(200).render('results', {mydata: "admin "+ data.firstName +" created succesfully!"})
    }).catch(err => {

        res.render('results', {mydata: err.message || "Some error occurred while creating admin"})
    });
};

exports.findAll = async (req, res) => {
    try {
        const admin = await AdminModel.find();

        res.status(200).render('results', {mydata: admin})
    } catch(error) {
        res.status(404).render('results', {mydata: error.message})

    }
};

exports.findOne = async (req, res) => {
    try {
        const admin = await AdminModel.findOne({email: req.query.email}).exec();

        if (admin===null){
            res.status(404).render('results', {mydata: "admin not found"
            })
        }else{
            res.status(200).render('results', {mydata: "admin :"+ admin.firstName +" "
                    + admin.lastName +" "+ admin.email +" "+ admin.phone
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


    await AdminModel.findOneAndUpdate({email: query}, {email:req.body.newEmail,
        firstName:req.body.newFirstName,
        lastName:req.body.newLastName,
        phone:req.body.newPhone
    }).then(data => {
        console.log(data)
        if (!data) {

            res.status(404).render('results', {mydata: `admin not found.`})
        }else{

            res.status(200).render('results', {mydata: "admin updated successfully."})
        }
    }).catch(err => {

        res.status(500).render('results', {mydata: err.message})
    });
};

exports.destroy = async (req, res) => {


    let adminemail=req.body.email
    await AdminModel.deleteOne({email: adminemail}).then(data => {

        if (data.deletedCount===0) {

            res.status(404).render('results', {mydata: "admin not found"})

        } else {


            res.status(200).render('results', {mydata: "admin "+adminemail+" deleted succesfully!"})
        }
    }).catch(err => {

        res.status(500).render('results', {mydata: err.message})
    });
};