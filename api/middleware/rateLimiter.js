const rateLimiter = require("express-rate-limit")

const limiter = rateLimiter({
<<<<<<< HEAD
    max: 15,
=======
    max: 20,
>>>>>>> 77edc9824c8146e8d6f12eb0617a13278f0e8786
    windowMS: 10000,
    message: "Request limit reached."
});

const signInLimiter = rateLimiter({
    max: 3,
    windowMS: 10000,
    message: "Too many login attempts."
});

module.exports = {
    limiter,
    signInLimiter
}