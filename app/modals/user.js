import { Schema, model, models } from 'mongoose';

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  username: {
    type: String,
    required: true,
    maxlength: 30,
  },
  profilePic: {
    type: String,
    required: false,
  },
  coverPic: {
    type: String,
    required: false,
  },
  account: {
    type: String,
    required: true,
    maxlength: 20,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Easypaisa', 'JazzCash'],
  },
});

const Profile = models.Profile || model('Profile', ProfileSchema);

export default Profile;
