import {createInterface, type Interface} from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_map_b.js";
import { commandExplore } from "./command_explore.js";
import { PokeAPI } from "./pokeapi.js"

export type State = {
    interface:          Interface;
    registry:           Record<string, CLICommand>;
    pokeAPI:            PokeAPI;
    nextLocationsURL:   string;
    prevLocationsURL:   string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Print a help message describing how to use this REPL",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the names of location areas in the Pokemon world",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the names of location areas in the previous Pokemon world",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Explore a specific location in the Pokemon world",
      callback: commandMap,
    },
  };
}

export function initState(interval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });
    const registry = getCommands();
    const pokeAPI = new PokeAPI(interval);
    const nextLocations = "";
    const prevLocations = "";

    return {
        interface:  rl,
        registry:   registry,
        pokeAPI: pokeAPI,
        nextLocationsURL: nextLocations,
        prevLocationsURL: prevLocations,
    };
}

