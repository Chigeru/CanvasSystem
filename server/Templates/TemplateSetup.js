import WorkstateTemplate from "./WorkstateTemplate.js";
import LabelTemplate from "./LabelTemplate.js";


async function TemplateProjectLayout(chosenTemplate) {
  var templateInformations = {
    workstates: [],
    labels: []
  }

  templateInformations.workstates = await WorkstateTemplate(chosenTemplate);
  templateInformations.labels = await LabelTemplate(chosenTemplate);

  return templateInformations;
}

export default TemplateProjectLayout