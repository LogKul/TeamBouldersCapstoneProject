const { Op } = require("sequelize");
const db = require("../models");
const Game = db.game;
const User = db.user;

/*exports.cull_games = (req, res) => {

};*/

exports.find_completed_games = (req, res) => {
    // Return all current completed games
    Game.findAll({
        where: {
            [Op.and]: [
                {
                    player1: {
                        [Op.not]: null
                    },
                },
                {
                    player2: {
                        [Op.not]: null
                    },
                },
                {
                    winner: {
                        [Op.not]: null
                    },
                }
            ]
        }
    })
        .then((completed_games) => {
            res.status(200).send({
                games: completed_games,
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
            console.log(err.message)
        });
};

exports.find_completed_games_by_user = (req, res) => {
    // First, find user id by username
    User.findOne({
        where: {
            username: req.query.username,
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            // Then return all current completed games
            // containing a particular user
            Game.findAll({
                where: {
                    [Op.and]: [
                        {
                            player1: {
                                [Op.not]: null
                            },
                        },
                        {
                            player2: {
                                [Op.not]: null
                            },
                        },
                        {
                            winner: {
                                [Op.not]: null
                            },
                        }
                    ],
                    [Op.or]: [
                        { player1: user.id },
                        { player2: user.id },
                    ]
                }
            })
                .then((completed_games) => {
                    res.status(200).send({
                        games: completed_games,
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                    console.log(err.message)
                });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.find_open_games = (req, res) => {
    // Return all current open games, where at least one
    // player slot is null, creates new empty game if none
    // are found
    Game.findAll({
        where: {
            [Op.or]: [
                { player1: null },
                { player2: null },
            ]
        }
    })
        .then((open_games) => {
            if (open_games.length !== 0) {
                res.status(200).send({
                    games: open_games,
                });
            }
            else {
                Game.create({
                    player1: null,
                    player2: null,
                })
                    .then(game => {
                        res.status(200).send({ games: game });
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
            console.log(err.message)
        });
};

exports.join_game = (req, res) => {
    // Search for unique game, add the queried
    // user in as one of the players at random
    Game.findOne({
        where: {
            id: req.query.gameid,
        }
    })
        .then(game => {
            if (!game) {
                return res.status(404).send({ message: "Game Not found." });
            }

            if (game.player1 == null && game.player2 == null) {
                if (Math.random() < 0.50) {
                    game.set({ player1: req.query.playerid });
                }
                else {
                    game.set({ player2: req.query.playerid });
                }
            }
            else if (game.player1 == req.query.playerid || game.player2 == req.query.playerid) {
                return res.status(208).send({ message: "User already in game." });
            }
            else if (game.player1 == null) {
                game.set({ player1: req.query.playerid });
            }
            else if (game.player2 == null) {
                game.set({ player2: req.query.playerid });
            }
            else {
                console.log("This should not be reachable");
                res.status(500).send({ message: "Game is full" });
            }

            game.save();

            // Original response, can go back to it if we need to
            //res.status(200).send({ message: "Successfully joined game!" });

            // Find opponent username
            User.findOne({
                where: {
                    id: req.query.playerid,
                }
            })
                .then(user => {
                    if (!user) {
                        return res.status(404).send({ message: "Opponent has no username" });
                    }

                    res.status(200).send({
                        opponent: opponent_username
                    });

                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.cleanup_on_isle_nine = (req, res) => {
    // Delete games with the designated player, but no opponent
    Game.destroy({
        where: {
            [Op.or]: [
                { player1: null, player2: req.query.playerid },
                { player1: req.query.playerid, player2: null },
            ]
        }
    })
        .then(() => {
            res.status(200).send({ message: "Games unmounted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = (req, res) => {
    // Save Game to Database
    Game.create({
        player1: req.body.player1,
        player2: req.body.player2,
    })
        .then(game => {
            //res.status(200).send({ message: "Game created successfully!" });
            res.status(200).send({ id: game.id });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = (req, res) => {
    // Search for unique game in database
    Game.findOne({
        where: {
            id: req.query.gameid,
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
            id: req.query.gameid,
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
    Game.destroy({
        where: {
            id: req.query.gameid,
        }
    })
        .then(() => {
            res.status(200).send({ message: "Game was deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};