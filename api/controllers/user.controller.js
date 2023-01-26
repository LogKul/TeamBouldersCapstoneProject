const db = require("../models");
const User = db.user;

exports.userAccess = (req, res) => {
    res.status(200).send("JWTs working!");
};

exports.read = (req, res) => {
    // Save User to Database
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
                admin: user.admin,
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = (req, res) => {
    // Save User to Database
    User.findOne({
        where: {
            username: req.query.username,
        }
    })
        .then(user => {
            user.set(req.body);

            res.status(200).send({ message: "User was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = (req, res) => {
    // Save User to Database
    User.destroy({
        where: {
            username: req.body.username,
        }
    })
        .then(() => {
            res.status(200).send({ message: "User was deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};