import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {type: String, default: ""},
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabels" }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
    estimate: { 
      type: Number,
      default: 2,
    },
    priority: { 
      type: Number,
      default: 2,
    },
    deadline: Date,
    startedAt: Date,
  },
  { timestamps: true, versionKey: false}
);


const Task = mongoose.model("Tasks", TaskSchema);
export default Task;
