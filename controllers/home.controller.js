import { User } from "../models/users.model.js";
import { Movie } from "../models/movies.model.js";
import { Logs } from "../models/changelog.model.js"
import asyncHandler from "express-async-handler";
import { Genre } from "../models/genre.model.js";

// Public
const getMovies = asyncHandler(async (req, res) => {
    const { limit, offset } = req.query;
    const searchQuery = req.query.search ? req.query.search : ""
    const sort = req.query.sort ? req.query.sort : ""
    const genresToMatch = req.query.genre ? req.query.genre.split(',') : null

    const sortQuery = {}
    if(sort) {
        sortQuery[sort] = -1
    } else {
        sortQuery["createdAt"] = -1
    }

    const movies = await Movie.find({
        isDeleted: false,
        $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { director: { $regex: searchQuery, $options: "i" } },
        ],
        ...(genresToMatch && { genre: { $in: genresToMatch} })
    })
        .limit(+limit)
        .skip(+offset)
        .sort(sortQuery);

    const genres = await Genre.find()

    res.json({
        movies,
        genres
    });
});

// Private
const addMovies = asyncHandler(async (req, res) => {
    const addedBy = req.user._id;
    const movie = new Movie({
        addedBy,
        ...req.body,
    });
    await movie.save();

    if (movie) {
        res.status(200).json({
            message: "Success",
        });
    } else {
        res.status(400).json({
            message: "There has been an error",
        });
    }
});

// Private
const editMovies = asyncHandler(async (req, res) => {
    const author = req.user._id;
    const prev = await Movie.findOneAndUpdate(
        {
            _id: req.body._id,
        },
        {
            ...req.body.updates,
        }
    );

    const log = new Logs({
      "doneBy": author,
      "doneOn": req.body._id,
      "prevData": prev,
      "newData": req.body.updates
    })

    log.save()

    if (prev) {
        res.status(202).json({
            message: "Success",
        });
    } else {
        res.status(400).json({
            message: "There has been an error",
        });
    }
});

const addGenre = asyncHandler(async (req, res) => {
    const genre = new Genre({name: req.body.name})
    await genre.save()

    if (genre) {
        res.status(200).json({
            message: "Success",
        });
    } else {
        res.status(400).json({
            message: "There has been an error",
        });
    }
})

export { getMovies, addMovies, editMovies, addGenre };
