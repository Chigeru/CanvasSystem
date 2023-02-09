import mongoose from "mongoose";

const TaskCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  }
);

const TaskCategory = mongoose.model('TaskCategory', TaskCategorySchema);
export default TaskCategory;