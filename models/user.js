import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: String,
  password: {
    type: String,
    unique: true
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', UserSchema)
