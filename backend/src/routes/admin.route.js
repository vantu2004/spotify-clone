import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.send("Admin route");
});

router.get("/", (req, res) => {
  res.send("Admin route");
});

router.put("/", (req, res) => {
  res.send("Admin route");
});

export default router;
