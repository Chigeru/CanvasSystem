import mongoose from "mongoose";

const TaskLabelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    color: String
  }, {versionKey: false}
);

const TaskLabel = mongoose.model("TaskLabels", TaskLabelSchema);
export default TaskLabel;