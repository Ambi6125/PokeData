import { event as messageEvent, Events } from "../utils/index";
import pokeAPI from "../API/pokeAPI";
import { Embed, EmbedBuilder } from "discord.js";
import { capitalizeWords } from "../funcs";

export default messageEvent(Events.MessageCreate, ({ log }, msg) => {
  if (!msg.content.startsWith("!data")) {
    return;
  }

  const args: string[] = msg.content.slice("!data".length).trim().split(" "); //removes prefix and organizes args

  //handle less than 1 arg
  if (args.length === undefined || args.length === 0) {
    msg.reply(
      "Please specify something to look for.\nUsage: `!data <pokemon name>`"
    );
    return;
  }

  if (args.length !== 1) {
    msg.reply("Please provide `1` argument to search for.");
  }

  const pokemonNameArg: string = args[0];

  //call api to retrieve data
  pokeAPI
    .getPokemon(pokemonNameArg)
    .then((response) => {
      const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle(capitalizeWords(response.name))
        .setThumbnail(response.sprite)
        .addFields(
          {
            name: "Abilities",
            value: response.abilities
              .map((ability) => capitalizeWords(ability))
              .join(", "),
          },
          {
            name: "Stats",
            value:
              `**HP** ${
                response.stats.find((stat) => stat.name === "hp")?.value
              }\n` +
              `**Atk** ${
                response.stats.find((stat) => stat.name === "attack")?.value
              }\n` +
              `**Def** ${
                response.stats.find((stat) => stat.name === "defense")?.value
              }\n` +
              `**SpA** ${
                response.stats.find((stat) => stat.name === "special-attack")
                  ?.value
              }\n` +
              `**SpD** ${
                response.stats.find((stat) => stat.name === "special-defense")
                  ?.value
              }\n` +
              `**Spe** ${
                response.stats.find((stat) => stat.name === "speed")?.value
              }`,
          }
        );

      msg.reply({ embeds: [embed] });
    })
    .catch((err) => {
      msg.reply("[Error] error fetching pokémon data");
      log("[Error]: " + err.message);
    });
});
