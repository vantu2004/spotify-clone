import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  checkAdmin,
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
} from "../controller/admin.controller.js";

const router = Router();

// khi có req vào thì sẽ đi qua 2 middleware này trước
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
