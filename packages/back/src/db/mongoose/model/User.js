import mongoose from '../mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
