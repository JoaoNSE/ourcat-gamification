import nextConnect from "next-connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import requestControllerMiddleware from "../../../middlewares/requestControllerMiddleware";
import userService from "../../../service/user.service";

export default nextConnect({
    onError: requestControllerMiddleware.onErrorHandler,
    onNoMatch: requestControllerMiddleware.onNoMatchHandler,
}).get(getCurrentUser);

async function getCurrentUser(req, res) {
    const session = await getServerSession(req, res, authOptions);
    console.log("Session", JSON.stringify(session, null, 2));
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userService.findUserById(session.user.id);

    res.status(200).json(user);
}
