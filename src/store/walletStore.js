import { writable } from 'svelte/store';

export var user_bech32 = writable("Not connected...");
export var user_base16 = writable("Not connected...");
export var user_network = writable("");
export var zil_amount = writable("0");