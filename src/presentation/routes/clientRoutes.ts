import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const router = Router();

router.post("/clients", async (req, res) => {
  await ClientController.create(req, res);
});

export default router;
