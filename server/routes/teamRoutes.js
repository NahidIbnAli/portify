import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import Team from "../models/teamModel.js";



const router = express.Router();

// Create Team Member
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, role, country } = req.body;
    const imageUrl = req.file.path;
    const newMember = await Team.create({name, role, country, image: imageUrl});
    res.status(201).json({ message: "Team member added successfully", service: newMember });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Team Members
router.get("/", async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single team member by ID
router.get("/:id", async (req, res) => {
    try {
      const member = await Team.findById(req.params.id);
      if (!member) return res.status(404).json({ error: "Team member not found" });
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update a team member profile
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
    try {
      const { name, role, country } = req.body;
      let imageUrl = req.body.image; 
      if (req.file) {
        imageUrl = req.file.path;
      }
      const updatedMember = await Team.findByIdAndUpdate(req.params.id, {name, role, country, image: imageUrl}, { new: true });
      if (!updatedMember) return res.status(404).json({ error: "Team member not found" });
      res.json(updatedMember);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Delete a Team Member
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedMember = await Team.findByIdAndDelete(req.params.id);
    if (!deletedMember) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;