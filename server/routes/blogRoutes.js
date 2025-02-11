import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import Blog from "../models/blogModel.js";

const router = express.Router();

// Create a new blog post
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : "";
    const newBlog = await Blog.create({ title, content, image });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl = req.body.image; // Keep old image if not updated
    if (req.file) {
      imageUrl = req.file.path; // Update image if a new one is uploaded
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {title, content, image: imageUrl}, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;