import WorkstateMongoose from "../Models/Mongodb/Workstate.js";
import mongoose from "mongoose";

const workstateTypes = ["ready", "open", "waiting", "help", "closed"];

const progWorkstates = [
  { name: "unscheduled", type: workstateTypes[0] },
  { name: "Ready for development", type: workstateTypes[1] },
  { name: "In development", type: workstateTypes[1] },
  { name: "Ready for review", type: workstateTypes[2] },
  { name: "Help needed", type: workstateTypes[3] },
  { name: "Ready for deploy", type: workstateTypes[4] },
  { name: "Completed", type: workstateTypes[4] },
];

const infraWorkstate = [
  { name: "unscheduled", type: workstateTypes[0] },
  { name: "Ready for development", type: workstateTypes[1] },
  { name: "In development", type: workstateTypes[1] },
  { name: "Blocked", type: workstateTypes[2] },
  { name: "Help needed", type: workstateTypes[3] },
  { name: "Completed", type: workstateTypes[4] },
];

const simpleWorkstate = [
  { name: "Ready", type: workstateTypes[1] },
  { name: "In development", type: workstateTypes[1] },
  { name: "Help needed", type: workstateTypes[3] },
  { name: "Completed", type: workstateTypes[4] },
];

async function WorkstateTemplate(chosenTemplate) {
  switch (chosenTemplate.toLowerCase()) {
    case "programmer":
      return AddWorkstateToDatabaseMulti(progWorkstates);

    case "network":
      return AddWorkstateToDatabaseMulti(infraWorkstate);

    case "simple":
      return AddWorkstateToDatabaseMulti(simpleWorkstate);

    default:
      return [];
  }
}

async function AddWorkstateToDatabaseMulti(workstates) {
  var temp = []; 
  for (var i = 0; i < workstates.length; i++) {
    const data = new WorkstateMongoose({
      _id: new mongoose.Types.ObjectId(),
      name: workstates[i].name,
      type: workstates[i].type,
      order: i,
    });

    await data.save();
    temp.push(data._id);
  }

  return temp;
}

export default WorkstateTemplate;
