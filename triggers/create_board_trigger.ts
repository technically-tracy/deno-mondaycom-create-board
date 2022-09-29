import { Trigger } from "deno-slack-api/types.ts";
import BoardWorkflow from "../workflows/create_board_workflow.ts";

const BoardTrigger: Trigger<typeof BoardWorkflow.definition> = {
  type: "shortcut",
  name: "The trigger",
  description: "Triggers are wonderful things!",
  workflow: "#/workflows/create_board_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default BoardTrigger;