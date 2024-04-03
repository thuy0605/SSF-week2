// TODO: mongoose schema for user
import {Schema, model} from 'mongoose';
import {User} from '../../types/DBTypes';

const userSchema = new Schema<User>({
  user_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    select: false,
  },
  password: {type: String, required: true, select: false},
});

export default model<User>('User', userSchema);
