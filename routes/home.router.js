import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getMovies,
  addMovies,
  editMovies,
  addGenre
} from "../controllers/home.controller.js";

const homeRouter = express.Router();

homeRouter.route("/get-movies").get(getMovies);
homeRouter.route("/add-movie").post(protect, isAdmin, addMovies);
homeRouter.route("/edit-movie").post(protect, isAdmin, editMovies);
homeRouter.route("/add-genre").post(protect, isAdmin, addGenre);

export default homeRouter;
