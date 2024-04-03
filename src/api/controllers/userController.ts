// TODO: create the following functions:
// - userGet - get user by id
// - userListGet - get all users
// - userPost - create new user. Remember to hash password
// - userPutCurrent - update current user
// - userDeleteCurrent - delete current user
// - checkToken - check if current user token is valid: return data from res.locals.user as UserOutput. No need for database query

import {Request, Response, NextFunction} from 'express';
import {User} from '../../types/DBTypes';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import bcrypt from 'bcryptjs';

const userGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select('-password -__v -role');
    if (!user) {
      throw new CustomError('No species found', 404);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const userListGet = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
) => {
  try {
    const users = await userModel.find().select('-password -__v -role');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const userPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.role = 'user';
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await userModel.create(req.body);
    const response = {
      message: 'User added',
      data: {
        ...user.toObject(),
        password: undefined,
        role: undefined,
      },
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const userPutCurrent = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user._id;
    const user = await userModel
      .findByIdAndUpdate(id, req.body, {
        new: true,
      })
      .select('-password -__v -role');
    if (!user) {
      throw new CustomError('No user found', 404);
    }
    const response = {
      message: 'User updated',
      data: {
        ...user.toObject(),
        password: undefined,
        role: undefined,
      },
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const userDeleteCurrent = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user._id;
    const user = await userModel
      .findByIdAndDelete(id)
      .select('-password -__v -role');
    if (!user) {
      throw new CustomError('No user found', 404);
    }
    res.json({
      message: 'User deleted',
      data: user.toObject(),
    });
  } catch (error) {
    next(error);
  }
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    if (user) {
      res.json(user);
      return;
    }
    throw new CustomError('No user found', 404);
  } catch (error) {
    next(error);
  }
};

export {
  userGet,
  userListGet,
  userPost,
  userPutCurrent,
  userDeleteCurrent,
  checkToken,
};
