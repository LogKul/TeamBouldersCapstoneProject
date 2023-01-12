const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({ "users": ["user1", "user2", "user3"] })
})

// When changing port number, DON'T FORGET
// to also change it in proxy in /client/package.json
app.listen(5000, () => { console.log("Server started on port 5000") })