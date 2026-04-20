import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();

// đăng ký / đăng nhập với clerk, đã có thông tin thì đăng nhập, chưa có thì tạo tài khoản
router.post("/callback", authCallback);

export default router;
