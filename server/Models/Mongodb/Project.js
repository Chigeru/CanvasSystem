import mongoose from "mongoose";
import WorkflowSchema from "./Workflow.js";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    workflows: [{ type: mongoose.Schema.ObjectId, ref: "Workflows", default: () => [] }],
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabels", default: () => [] }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users", default: () => [] }],
    active: {
      type: Boolean,
      default: false
    },
    done: {
      type: Boolean,
      default: false
    },
    deadline: Date,
    startedAt: Date,
  },
  { timestamps: true, versionKey: false }
);

ProjectSchema.pre(/(delete)\i/, async function (next) {
  try {
    const project = await this.model.findOne(this.getFilter());
    await WorkflowSchema.deleteMany({ _id: { $in: project.workflow } });
    next();
  } catch (err) {
    next(err);
  }
});

const Project = mongoose.model("Projects", ProjectSchema);
export default Project;
