// client specific messages
// each client gets an individual instance
function individualPipeline(ctx) {
    let idx = 0;
    const interval = setInterval(() => {
        ctx.send(`ping pong ${idx}`);
        idx++;
    }, 5000);
    return interval;
}

// broadcast messages
// one instance for all clients
function broadcastPipeline(clients) {
    let idx = 0;
    const interval = setInterval(() => {
        for (let c of clients.values()) {
            c.send(`broadcast message ${idx}`);
        }
        idx++;
    }, 3000);
    return interval;
}

module.exports = {
    individualPipeline,
    broadcastPipeline
}