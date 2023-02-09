import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    worktype: {
      type: String,
      required: true
    },
    title: String,
    description: String,
    deadline: Date,
    startedAt: Date,
    status: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);
export default Task;