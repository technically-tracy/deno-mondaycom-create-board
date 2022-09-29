import { Manifest } from "deno-slack-sdk/mod.ts";
import BoardWorkflow from "./workflows/create_board_workflow.ts";

export default Manifest({
  name: "mondaycom-create-board",
  description: "A sample app to create a new board within your Monday.com workspace.",
  icon: "assets/icon.png",
  workflows: [BoardWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});