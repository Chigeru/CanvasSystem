import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accesslevel: {
    type: mongoose.Schema.ObjectId,
    ref: "AccessLevel",
    required: true,
  },
  email: {
    type: String,
    required: IsLoginRequired,
    default: () => ""
  },
  password: {
    type: String,
    required: IsLoginRequired,
    default: () => ""
  }, 
  active: {
    type: Boolean,
    required: true
  }
}, {versionKey: false});

function IsLoginRequired() {
  return this.accesslevel.level >= 20 ? true : false;
}

UserSchema.pre('remove', function(next) {
  this.model("Department").remove({user: {$pullAll: {_id: this._id}}});
  next();
})

const User = mongoose.model("Users", UserSchema);
export default User;
