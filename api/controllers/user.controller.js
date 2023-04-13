const db = require("../models");
const User = db.user;
const Game = db.game;

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

exports.readid = (req, res) => {
    // Read single User
    User.findOne({
        where: {
            id: req.query.playerid,
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
            if (req.body.password) {
                const salted = process.env.S1 + req.body.password + process.env.S2
                const new_pass = bcrypt.hashSync(salted, parseInt(process.env.SROUNDS))
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

exports.get_rankings = (req, res) => {
    // Return all players, ranked by win/loss ratio
    User.findAll({
        attributes: ["username", "mmr", "wins", "losses"]
    })
        .then((users) => {

            // Sort by winrate
            users.sort((a, b) => ((a.mmr) < (b.mmr)) ? 1 : -1)

            res.status(200).send({
                users: users,
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
            console.log(err.message)
        });
};