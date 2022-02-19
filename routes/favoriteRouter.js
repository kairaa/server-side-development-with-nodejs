const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Favorites = require("../models/favorites");
const favorites = require("../models/favorites");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Favorites.find({})
      .populate("user")
      .populate("dish")
      .then(
        (favorites) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorites);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorite) => {
          if (favorite) {
            for (var i = 0; i < req.body.length; i++) {
              if (favorite.dish.indexOf(req.body[i]._id) === -1) {
                favorite.dish.push(req.body[i]._id);
              }
            }
            favorite.save().then(
              (favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              },
              (err) => next(err)
            );
          } else {
            Favorites.create({ user: req.user._id, dish: req.body }).then(
              (favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              },
              (err) => next(err)
            );
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //deletes all the favorites of an user
    Favorites.findOneAndRemove({ user: req.user._id })
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200;
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "GET operation is not suppported on /favorites/" + req.params.dishId
    );
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorite) => {
          if (favorite) {
            if (favorite.dish.indexOf(req.params.dishId) === -1) {
              favorite.dish.push(req.params.dishId);
              favorite.save().then(
                (favorite) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favorite);
                },
                (err) => next(err)
              );
            }
          } else {
            Favorites.create({
              user: req.user._id,
              dish: [req.params.dishId],
            }).then(
              (favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              },
              (err) => next(err)
            );
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites/" + req.params.dishId);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorite) => {
          if (favorite) {
            index = favorite.dish.indexOf(req.params.dishId);
            if (index >= 0) {
              favorite.dish.splice(index, 1);
              favorite.save().then(
                (favorite) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favorite);
                },
                (err) => next(err)
              );
            } else {
              err = new Error("Dish " + req.params.dishId + " not found");
              err.status = 404;
              return next(err);
            }
          } else {
            err = new Error("Favorites not found");
            err.statusCode = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
