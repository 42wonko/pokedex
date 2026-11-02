import { type State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandMap(state: State): Promise<void> {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
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
};

