import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const router = Router();

router.post("/clients", async (req, res) => {
  await ClientController.create(req, res);
});
router.put("/clients/:id", async (req, res) => {
  await ClientController.update(req, res);
});
router.get("/clients/:id", async (req, res) => {
  await ClientController.getById(req, res);
});

router.get("/clients", async (req, res) => {
  await ClientController.list(req, res);
});

export default router;
