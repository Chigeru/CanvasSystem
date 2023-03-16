import mongoose from "mongoose";

const TaskCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  }, {versionKey: false}
);

const TaskCategory = mongoose.model('Task_Category', TaskCategorySchema);
export default TaskCategory;