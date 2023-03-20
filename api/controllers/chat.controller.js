const db = require("../models");
const Chat = db.chat;

exports.create = (req, res) => {
    // Save Chat to Database
    Chat.create({
        game_id: req.body.gameid,
        chat_text: req.body.chat_text,
        player: req.body.player
    })
        .then(chat => {
            res.status(200).send({ id: chat.id });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = (req, res) => {
    // Search for unique chat in database
    Chat.findOne({
        where: {
            id: req.query.chatid,
        }
    })
        .then(chat => {
            if (!chat) {
                return res.status(404).send({ message: "Chat Not found." });
            }

            res.status(200).send({
                id: chat.id,
                game_id: chat.game_id,
                chat_text: chat.chat_text,
                time: chat.time,
                player: chat.player
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = (req, res) => {
    // Update unique chat in database
    Chat.findOne({
        where: {
            id: req.query.chatid,
        }
    })
        .then(chat => {
            chat.set(req.body);
            chat.save();

            res.status(200).send({ message: "Chat was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = (req, res) => {
    // Delete chat from database
    Chat.destroy({
        where: {
            id: req.query.chatid,
        }
    })
        .then(() => {
            res.status(200).send({ message: "Chat was deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};