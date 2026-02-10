import { Router } from "express";
import { getUsers, updateUserRole, updateUserActive, getAvaliableUsers } from "../controllers/user.controller";
import { authMiddleware } from "./middlewares/auth.middlewares";

const router = Router();

router.get("/getUsers", authMiddleware, getUsers);
router.patch("/users/:user_id/role", authMiddleware, updateUserRole);
router.patch("/users/:user_id/active", authMiddleware, updateUserActive);
router.get("/users/:classId/available-users", authMiddleware, getAvaliableUsers);
export default router;
