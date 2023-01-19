const db = require("../models");
const User = db.user;

validateNoDuplicateUsername = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Username taken"
            });
            return;
        }

        next();
    });
};

const validateSignUp = {
    validateNoDuplicateUsername: validateNoDuplicateUsername
};

module.exports = validateSignUp;