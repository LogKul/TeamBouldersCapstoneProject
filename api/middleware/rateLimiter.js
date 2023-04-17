const rateLimiter = require("express-rate-limit")

const limiter = rateLimiter({
    max: 50,
    windowMS: 10000,
    message: "Request limit reached."
});

const signInLimiter = rateLimiter({
    max: 3,
    windowMS: 10000,
    message: "Too many login attempts."
});

const MMRLimiter = rateLimiter({
    max: 2,
    windowMS: 5000,
    message: "Fallback for React StrictMode."
});

module.exports = {
    limiter,
    signInLimiter,
    MMRLimiter
}