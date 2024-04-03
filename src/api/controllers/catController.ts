// TODO: create following functions:
// - catGetByUser - get all cats by current user id
// - catGetByBoundingBox - get all cats by bounding box coordinates (getJSON)
// - catPutAdmin - only admin can change cat owner
// - catDeleteAdmin - only admin can delete cat
// - catDelete - only owner can delete cat
// - catPut - only owner can update cat
// - catGet - get cat by id
// - catListGet - get all cats
// - catPost - create new cat

import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import catModel from '../models/catModel';

const catGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const cat = await catModel
      .findById(req.params.id)
      .select('-password -__v -role');
    if (!cat) {
      throw new CustomError('No species found', 404);
    }
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

const catListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cats = await catModel.find().select('-password -__v -role');
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const catPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {cat_name, birthdate, weight} = req.body;
    const file = req.file as Express.Multer.File;

    // Create a new cat document using catModel.create()
    const newCat = await catModel.create({
      cat_name,
      birthdate,
      weight,
      filename: file.filename,
    });
    const response = {
      message: 'Cat added',
      data: {
        ...newCat.toObject(),
      },
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const catPut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({message: 'catPut'});
  } catch (error) {
    next(error);
  }
};

const catDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({message: 'catDelete'});
  } catch (error) {
    next(error);
  }
};

const catGetByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({message: 'catGetByUser'});
  } catch (error) {
    next(error);
  }
};

const catGetByBoundingBox = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({message: 'catGetByBoundingBox'});
  } catch (error) {
    next(error);
  }
};

const catPutAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({message: 'catPutAdmin'});
  } catch (error) {
    next(error);
  }
};

const catDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({message: 'catDeleteAdmin'});
  } catch (error) {
    next(error);
  }
};

export {
  catGet,
  catListGet,
  catPost,
  catPut,
  catDelete,
  catGetByUser,
  catGetByBoundingBox,
  catPutAdmin,
  catDeleteAdmin,
};
