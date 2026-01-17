import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  program: {
    type: String,
  },
  semester: {
    type: Number,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
