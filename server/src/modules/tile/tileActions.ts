import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const { coord_x, coord_y } = req.body;
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tile) {
      next();
    } else {
      res.status(422).json({ error: "Invalid coordinates" });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
