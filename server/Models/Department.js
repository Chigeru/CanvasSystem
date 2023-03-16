import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    name : String,
    projects: [{type: mongoose.Schema.ObjectId, ref: 'Projects'}],
  }, {versionKey: false}
  );

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
