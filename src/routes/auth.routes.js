const express = require("express");
const db = require("../models");

const UserService = require("../service/user.service");

const router = express.Router();

const userService = new UserService(db);

router.get("/users", async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
});

router.get("/auth/me", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userService.findUserById(req.session.user.id);

    res.status(200).json(user);
});

router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.findUserByEmailAndPassword(email, password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = { email: user.email, id: user.id, role: user.role };
    res.json(user);
});

router.get("/auth/logout", async (req, res) => {
    res.clearCookie("session");
    res.json({ message: "Logout successful" });
});

router.get("/users/:id/courses", async (req, res) => {
    const { id } = req.params;
    const courses = await userService.findUserCourses(id);
    res.json(courses);
});

module.exports = router;
