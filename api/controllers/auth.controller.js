const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
require('dotenv').config();

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    var salted = process.env.S1 + req.body.password + process.env.S2

    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(salted, process.env.SROUNDS)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.login = (req, res) => {
    var salted = process.env.S1 + req.query.password + process.env.S2;

    User.findOne({
        where: {
            username: req.query.username,
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            if (user.deleted) {
                return res.status(404).send({ message: "User has been deleted." });
            }

            var passwordIsValid = bcrypt.compareSync(
                salted,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 600 // 86400 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    wins: user.wins,
                    losses: user.losses,
                    mmr: user.mmr,
                    deleted: user.deleted,
                    lightswitch: user.lightswitch,
                    theme: user.theme,
                    banned: user.banned,
                    hideschat: user.hideschat,
                    roles: authorities,
                    accessToken: token
                });
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.refresh = (req, res) => {
    User.findOne({
        where: {
            username: req.query.username,
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            if (user.deleted) {
                return res.status(404).send({ message: "User has been deleted." });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 600 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
