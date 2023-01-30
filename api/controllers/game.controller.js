const db = require("../models");
const Game = db.game;
const User = db.user;

exports.create = (req, res) => {
    // Save Game to Database
    Game.create({
        player1: req.body.player1,
        player2: req.body.player2,
    })
        .then(() => {
            res.status(200).send({ message: "Game created successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = (req, res) => {
    // Search for unique game in database
    Game.findOne({
        where: {
            id: req.query.id,
        }
    })
        .then(game => {
            if (!game) {
                return res.status(404).send({ message: "Game Not found." });
            }

            res.status(200).send({
                id: game.id,
                player1: game.player1,
                player2: game.player2,
                gamestate: game.gamestate,
                recording: game.recording,
                time: game.time,
                winner: game.winner
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = (req, res) => {
    // Update unique game in database
    Game.findOne({
        where: {
            id: req.query.id,
        }
    })
        .then(game => {
            game.set(req.body);
            game.save();

            res.status(200).send({ message: "Game was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = (req, res) => {
    // Delete game from database
    User.destroy({
        where: {
            id: req.query.id,
        }
    })
        .then(() => {
            res.status(200).send({ message: "Game was deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};