const db = require("../models");
const User = db.user;

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
    // Update existing User
    User.findOne({
        where: {
            username: req.query.username,
        }
    })
        .then(user => {
            user.set(req.body);
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