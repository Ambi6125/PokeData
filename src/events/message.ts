import { event, Events } from "../utils/index";

export default event(Events.MessageCreate, ({ log }, msg) => {
  if (msg.content.startsWith("!data")) {
    msg.reply("Please enter something to search for.");
  }
});
