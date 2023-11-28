const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.use(express.json());

const userControllers = require("./controllers/userControllers");
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", userControllers.postUser);

app.put("/api/movies/:id", movieControllers.updateMovie);
app.put("/api/users/:id", userControllers.updateUser);

module.exports = app;
