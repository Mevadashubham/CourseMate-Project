import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("roles", roleSchema);
