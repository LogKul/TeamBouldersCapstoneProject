const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(() => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            username: req.params.username,
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
                req.params.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                wins: user.wins,
                losses: user.losses,
                mmr: user.mmr,
                deleted: user.deleted,
                admin: user.admin,
                accessToken: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};