import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const SampleFunctionDefinition = DefineFunction({
  callback_id: "create_board_function",
  title: "Create board function",
  description: "The function",
  source_file: "functions/create_board_function.ts",
  input_parameters: {
    properties: {
      bname: {
        type: Schema.types.string,
        description: "Board name",
      },
      btype: {
        type: Schema.types.string,
        description: "Board type",
      }
    },
    required: ["bname", "btype"],
  },
  output_parameters: {
    properties: {
      updatedMsg: {
        type: Schema.types.string,
        description: "Updated message to be posted",
      },
    },
    required: ["updatedMsg"],
  },
});

export default SlackFunction(
  SampleFunctionDefinition,
  ({ inputs }) => {
    const { bname, btype } = inputs;
    const updatedMsg = 
      `:tada: You created the following new board: \n\n>${bname}\n of type ${btype}. See it on https://monday.com/.`

      let query = `mutation { create_board (board_name: \"${bname}\", board_kind: ${btype}) {   id }}`;

      fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          
          //Needs to go in .env file
          'Authorization': 'Your_Auth_Key',
         },
         body: JSON.stringify({
           'query' : query
         })
        })
         .then(res => res.json())

      return { outputs: { updatedMsg } };
  },
);
