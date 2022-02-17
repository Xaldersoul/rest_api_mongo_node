import { Router } from "express";
import Task from "../models/task";

const router = Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().lean();
  res.render("index", { tasks: tasks });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/edit", (req, res) => {
  res.render("edit");
});

router.post("/task/add", async (req, res) => {
  try {
    const task = Task(req.body);
    await task.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/edit/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  res.render("edit", { task });
});

router.get("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id).lean();
  res.redirect("/");
});

export default router;
