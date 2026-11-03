import {createInterface, type Interface} from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_map_b.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI } from "./pokeapi.js"
import { type PokemonObj } from "./pokeapi.js";

export type State = {
    interface:          Interface;
    registry:           Record<string, CLICommand>;
    pokemons:           Record<string, PokemonObj>;
    pokeAPI:            PokeAPI;
    nextLocationsURL:   string;
    prevLocationsURL:   string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
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
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Try to catch a Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Prints the name, height, weight, stats and type(s) of a Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Print a list of all the Pokemon you have cuaght",
      callback: commandPokedex,
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
    const pokemons = {};
    const pokeAPI = new PokeAPI(interval);
    const nextLocations = "";
    const prevLocations = "";

    return {
        interface:          rl,
        registry:           registry,
        pokemons:           pokemons,
        pokeAPI:            pokeAPI,
        nextLocationsURL:   nextLocations,
        prevLocationsURL:   prevLocations,
    };
}

