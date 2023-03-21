async function onNoMatchHandler(req, res) {
    return res.status(404).json({ message: "Not found" });
}

async function onErrorHandler(err, req, res, next) {
    console.error(err.stack);
    return res.status(500).end("Something broke!");
}

export default Object.freeze({
    onNoMatchHandler,
    onErrorHandler,
});
