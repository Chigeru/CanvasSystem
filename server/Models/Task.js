import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    worktype: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    deadline: Date,
    startedAt: Date,
    status: {
      type: Object,
      required: true,
    },
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  },
  { timestamps: true, versionKey: false}
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
