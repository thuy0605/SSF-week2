// TODO: mongoose schema for cat
import {Schema, model} from 'mongoose';
import {Cat} from '../../types/DBTypes';

const catSchema = new Schema<Cat>({
  cat_name: {type: String, required: true},
  weight: {type: Number, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  filename: {type: String, required: true},
  birthdate: {type: Date, required: true},
  location: {
    type: {type: String, enum: ['Point'], required: true},
    coordinates: {type: [Number], required: true},
  },
});

export default model<Cat>('Cat', catSchema);
