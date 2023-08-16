import axios, { AxiosResponse } from "axios";
import { error } from "console";

interface Pokemon {
  name: string;
  sprite: string;
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
}

const baseURL: string = "https://pokeapi.co/api/v2/pokemon/";

const pokeAPI = {
  getPokemon: (name: string): Promise<Pokemon> => {
    return axios.get(baseURL.concat(name)).then((response: AxiosResponse) => {
      const data: any = response.data;
      const pokemon: Pokemon = {
        name: data.name,
        sprite: data.sprites.front_default,
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        abilities: data.abilities.map((ability: any) => ability.ability.name),
      };
      return pokemon;
    })
    .catch(error => {throw new Error(error.message)})
  },
};

export default pokeAPI;