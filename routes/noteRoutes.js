const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const note = await Note.create({ ...req.body, user: req.user.id });
  res.json(note);
});

router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

router.put("/:id", auth, async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;

router.put("/:id", auth, async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(note);
});
