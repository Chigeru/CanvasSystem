import mongoose from "mongoose";
import TaskLabelMongoose from '../Models/Mongodb/TaskLabel.js'

const progLabels = [
  {name: "Database", color: "#5AE689"},
  {name: "Backend", color: "#5A9CE6"},
  {name: "Frontend", color: "#E68F5A"}
]

const infraLabels = [
  {name: "CCNA", color: "#5A9CE6"},
  {name: "Netværk", color: "#E68F5A"}
]

const supportLabels = [
  {name: "CCNA", color: "#5A9CE6"},
  {name: "Netværk", color: "#E68F5A"}
]

const elecLabels = [
  {name: "Reperation", color: "#E68F5A"}
]


async function LabelTemplate(chosenTemplate) {
  switch (chosenTemplate.toLowerCase()) {
    case "programmer":
      return AddLabelToDatabaseMulti(progLabels);

    case "network":
      return AddLabelToDatabaseMulti(infraLabels);

    case "support": 
      return AddLabelToDatabaseMulti(supportLabels);

    case "electric": 
      return AddLabelToDatabaseMulti(elecLabels);
    default:
      return [];
  }
}

async function AddLabelToDatabaseMulti(labelTemp) {
  var temp = []; 
  for (var i = 0; i < labelTemp.length; i++) {
    const data = new TaskLabelMongoose({
      _id: new mongoose.Types.ObjectId(),
      name: labelTemp[i].name,
      color: labelTemp[i].color
    });

    await data.save();
    temp.push(data._id);
  }

  return temp;
}


export default LabelTemplate