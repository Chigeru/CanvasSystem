import mongoose from "mongoose";
import ProjectSchema from "./Project.js"

const DepartmentSchema = new mongoose.Schema(
  {
    name : String,
    projects: [{type: mongoose.Schema.ObjectId, ref: 'Projects'}],
    users: [{type: mongoose.Schema.ObjectId, ref: 'Users'}]
  }, {versionKey: false}
  );

  DepartmentSchema.pre(/delete\i/, async function(next) {
    try {
      const department = await this.model.findOne(this.getFilter());
      await ProjectSchema.deleteMany({_id: {$in: department.projects}});
      next();
    } catch (err) {
      next(err);
    }
  });
const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
