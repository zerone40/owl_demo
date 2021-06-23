import { owl } from "@odoo/owl";

import { App } from "./components/App";
import { actions, initialState } from "./store/store";
const { utils, Store } = owl;


function makeStore() {
    const localState = window.localStorage.getItem("todo_list");
    const state = localState ? JSON.parse(localState) : initialState;
    const store = new Store({ state, actions });
    store.on("update", null, () => {
        localStorage.setItem("todo_list", JSON.stringify(store.state));
    });
    return store;
}

function setup() {
    owl.config.mode = "dev";
    App.env.store = makeStore();
    owl.mount(App, { target: document.body });
}

utils.whenReady(setup);