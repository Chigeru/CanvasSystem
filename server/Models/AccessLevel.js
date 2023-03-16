import mongoose from "mongoose";

const AccessLevelSchema = new mongoose.Schema(
  {
    group: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  }, {versionKey: false}
)

const AccessLevel = mongoose.model('AccessLevel', AccessLevelSchema);
export default AccessLevel;