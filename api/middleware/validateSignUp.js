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

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const validateSignUp = {
    validateNoDuplicateUsername: validateNoDuplicateUsername,
    checkRolesExisted: checkRolesExisted
};

module.exports = validateSignUp;