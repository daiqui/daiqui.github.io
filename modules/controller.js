// controller.js
export default class Controller {
    #name = null;           // private field: controller name
    #isActive = false;      // private field: active state

    constructor(controllerName) {
        this.#name = controllerName;
    }

    start() {
        //Activate the controller if it's not already active.
        if (this.#isActive) {
            console.log(`${this.#name} Controller is already active!`);
        } else {
            this.#isActive = true;
            // Log the controller's activation.
            console.log(`${this.#name} Controller active!`);
        }
    }

    getName() {
        // Get the controller's name.
        return this.#name;
    }

    getActiveState() {
        // Get the controller's active state.
        return this.#isActive;
    }
}
