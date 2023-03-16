import mongoose from "mongoose";

const UserLoginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password:  {
      type: String,
      required: true
    }
  }, {versionKey: false}
)


const UserLogin = mongoose.model('UserLogin', UserLoginSchema);
export default UserLogin;