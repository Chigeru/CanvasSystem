import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: "Department",
    required: true,
  },
  accesslevel: {
    type: mongoose.Schema.ObjectId,
    ref: "AccessLevel",
    required: true,
  },
  email: {
    type: String,
    required: IsLoginRequired
  },
  password: {
    type: String,
    required: IsLoginRequired
  }
}, {versionKey: false}
);

function IsLoginRequired() {
  return typeof this.accesslevel.level >= 10 ? true : false;
}

const User = mongoose.model("Users", UserSchema);
export default User;
