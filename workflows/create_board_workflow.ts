import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SampleFunctionDefinition } from "../functions/create_board_function.ts";

const BoardWorkflow = DefineWorkflow({
  callback_id: "create_board_workflow",
  title: "Create board workflow",
  description: "The workflow",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity"],
  },
});

const inputForm = BoardWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Create a new board",
    interactivity: BoardWorkflow.inputs.interactivity,
    submit_label: "Create board",
    fields: {
      elements: [{
        name: "channel",
        title: "Channel for sending board details",
        type: Schema.slack.types.channel_id,
        default: BoardWorkflow.inputs.channel,
      }, {
        name: "boardname",
        title: "Board name",
        type: Schema.types.string,
      }, {
        name: "type",
        title: "Board type: public, private, or shared",
        type: Schema.types.string,
      },
    ],
      required: ["channel", "boardname", "type"],
    },
  },
);

const sampleFunctionStep = BoardWorkflow.addStep(SampleFunctionDefinition, {
  bname: inputForm.outputs.fields.boardname,
  btype: inputForm.outputs.fields.type,
});

BoardWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: sampleFunctionStep.outputs.updatedMsg,
});

export default BoardWorkflow;