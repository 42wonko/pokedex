import { type State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandMapB(state: State): Promise<void> {
    if(state.prevLocationsURL === ""){
        console.log("you're on the first page");
    } else {
        const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
        if(locations.results){
            for(var location of locations.results) {
                console.log(location.name);
            }
        }
        if(locations.next){
            state.nextLocationsURL = locations.next;
        } else {
            state.nextLocationsURL = "";
        }
        if(locations.previous){
            state.prevLocationsURL = locations.previous;
        } else {
            state.prevLocationsURL = "";
        }
    }
};

