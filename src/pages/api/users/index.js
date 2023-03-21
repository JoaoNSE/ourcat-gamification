import nextConnect from "next-connect";
import db from "../../../models";
import requestControllerMiddleware from "../../../middlewares/requestControllerMiddleware";

export default nextConnect({
    onError: requestControllerMiddleware.onErrorHandler,
    onNoMatch: requestControllerMiddleware.onNoMatchHandler,
}).get(getUsers);

async function getUsers(req, res) {
    const users = await db.User.findAll();
    res.json({ users });
}
