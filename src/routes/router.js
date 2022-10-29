const express = require("express");
const db = require("../models");
const ModuleService = require("../service/module.service");
const ModuleController = require("../controller/module.controller");
const UserService = require("../service/user.service");

const router = express.Router();

const moduleService = new ModuleService(db);
const moduleController = new ModuleController(moduleService);

router.get("/modules", moduleController.getModules.bind(moduleController));

router.post("/modules", moduleController.createModule.bind(moduleController));

router.get(
  "/modules/:id",
  moduleController.getModuleById.bind(moduleController)
);

router.post(
  "/modules/:id",
  moduleController.updateModuleById.bind(moduleController)
);

router.get("/users", async (req, res) => {
  const userService = new UserService(db);
  const users = await userService.getUsers();
  res.json(users);
});

router.get("/auth/me", async (req, res) => {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json(req.session.user);
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const userService = new UserService(db);
  const user = await userService.findUserByEmailAndPassword(email, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = { email: user.email, id: user.id, role: user.role };

  console.log(req.session);

  res.json(user);
});

router.get("/auth/logout", async (req, res) => {
  res.clearCookie("session");
  res.json({ message: "Logout successful" });
});

module.exports = router;
