const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "This field is required" });
  } else if (title.length >= 255) {
    errors.push({
      field: "title",
      message: "This column therefore cannot store more than 255 characters",
    });
  }

  if (director == null) {
    errors.push({ field: "director", message: "This field is required" });
  } else if (director.length >= 255) {
    errors.push({
      field: "director",
      message: "This column therefore cannot store more than 255 characters",
    });
  }

  if (year == null) {
    errors.push({ field: "year", message: "This field is required" });
  } else if (year.length >= 255) {
    errors.push({
      field: "year",
      message: "This column therefore cannot store more than 255 characters",
    });
  }

  if (color == null) {
    errors.push({ field: "color", message: "This field is required" });
  } else if (color.length >= 255) {
    errors.push({
      field: "color",
      message: "This column therefore cannot store more than 255 characters",
    });
  }

  if (duration == null) {
    errors.push({ field: "duration", message: "This field is required" });
  } else if (duration.length >= 255) {
    errors.push({
      field: "duration",
      message: "This column therefore cannot store more than 255 characters",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateMovie;
