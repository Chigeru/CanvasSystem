import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {type: String, default: ""},
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabels", default: () => [] }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users", default: () => [] }],
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

/* Tjekker ALLE workstates igennem for se om de indeholder den slettede task, for derefter at slette referencen.
*
* TODO: Begræns hvilke workstates der kigges i, ud fra projektets workstates  
*/
// TaskSchema.pre('remove', function(next) {
//   this.model("Workstate").remove({task: {$pullAll: {_id: this._id}}});
//   next();
// })

const Task = mongoose.model("Tasks", TaskSchema);
export default Task;
