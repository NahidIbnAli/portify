import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import Service from "../models/serviceModel.js";


const router = express.Router();

// Create a Service
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : "";
    const newService = await Service.create({name, description, image});
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single service by ID
router.get("/:id", async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update a service
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
    try {
      const { name, description } = req.body;
      let imageUrl = req.body.image; 
      if (req.file) {
        imageUrl = req.file.path;
      }
      const updatedService = await Service.findByIdAndUpdate(req.params.id, {name, description, image: imageUrl}, { new: true });
      if (!updatedService) return res.status(404).json({ error: "Service not found" });
      res.json(updatedService);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Delete a Service
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;