const rateLimiter = require("express-rate-limit")

const limiter = rateLimiter({
    max: 8,
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