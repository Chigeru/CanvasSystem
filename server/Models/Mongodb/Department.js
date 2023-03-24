import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    name : String,
    projects: [{type: mongoose.Schema.ObjectId, ref: 'Projects'}],
    users: [{type: mongoose.Schema.ObjectId, ref: 'Users'}]
  }, {versionKey: false}
  );

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
