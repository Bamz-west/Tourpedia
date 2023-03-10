import express from "express";
import { createTour, deleteTour, getRelatedTours, getTour, getTours, getToursBySearch, getToursByTag, getToursByUser, likeTour, updateTour } from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTours);

router.get("/:id", getTour);

router.get("/search", getToursBySearch);

router.get("/tag/:tag", getToursByTag);

router.get("/userTours/:id", auth, getToursByUser);

router.post("/relatedTours", getRelatedTours);

router.post("/", auth, createTour);

router.delete("/:id", auth, deleteTour);

router.patch("/:id", auth, updateTour);

router.patch("/like/:id", auth, likeTour);


export default router;