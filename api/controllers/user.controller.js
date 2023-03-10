const db = require("../models");
const User = db.user;

require('dotenv').config();
var bcrypt = require("bcryptjs");

exports.read = (req, res) => {
    // Read single User
    User.findOne({
        where: {
            username: req.query.username,
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            res.status(200).send({
                id: user.id,
                username: user.username,
                wins: user.wins,
                losses: user.losses,
                mmr: user.mmr,
                deleted: user.deleted,
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = (req, res) => {
    var salted = process.env.S1 + req.body.password + process.env.S2

    // Update existing User
    User.findOne({
        where: {
            username: req.query.username,
        }
    })
        .then(user => {
            const new_pass = bcrypt.hashSync(salted, parseInt(process.env.SROUNDS))
            user.set(req.body);
            if (new_pass !== 'undefined') {
                user.set({ password: new_pass });
            }
            user.save();

            res.status(200).send({ message: "User was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = (req, res) => {
    // Delete User from Database
    User.destroy({
        where: {
            username: req.query.username,
        }
    })
        .then(() => {
            res.status(200).send({ message: "User was deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};