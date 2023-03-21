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

// const TaskLabel = mongoose.model("Task_Label", TaskLabelSchema);
// export default TaskLabel;

export default TaskLabelSchema;