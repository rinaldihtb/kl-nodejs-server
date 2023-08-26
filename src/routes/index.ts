import { Router } from "express";
import api from "./api";
const router = Router();

router.use("/api/v1", api);
// router.use("/", api);
// router.get("/", api.route);

export default router;
