const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.use(express.json());

const userControllers = require("./controllers/userControllers");
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

const validateMovie = require("./middlewares/validateMovie");
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);

const validateUser = require("./middlewares/validateUser");
app.post("/api/users", validateUser, userControllers.postUser);
app.put("/api/users/:id", validateUser, userControllers.updateUser);

module.exports = app;
