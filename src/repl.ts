import { createInterface } from 'node:readline';
import { type State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_map_b.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex} from "./command_pokedex.js";

export async function startREPL(state: State){
    const rl = state.interface;

    rl.prompt();

    rl.on('line', async(line) => {
        var words = cleanInput(line);
        if(words.length > 0){
            if(words[0] == "exit"){
                await commandExit(state);
            } else if(words[0] == "help"){
                await commandHelp(state);
            } else if(words[0] == "map"){
                try {
                    await commandMap(state);
                } catch (e) {
                    console.log("Network Error");
                }
            } else if(words[0] == "mapb"){
                try {
                    await commandMapB(state);
                } catch (e) {
                    console.log("Network Error");
                }
            } else if(words[0] == "explore"){
                try {
                    await commandExplore(state, words[1]);
                } catch (e) {
                    console.log("Network Error");
                }
            } else if(words[0] == "catch"){
                try {
                    await commandCatch(state, words[1]);
                } catch (e) {
                    console.log("Network Error");
                }
            } else if(words[0] == "inspect"){
                await commandInspect(state, words[1]);
            } else if(words[0] == "pokedex"){
                await commandPokedex(state);
            } else {
                console.log("Unknown command");
            }
            rl.prompt();
        } else {
            console.log("Unknown command");
            rl.prompt();
        }
    })
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ").filter((val) => val.trim() !== "");
}

