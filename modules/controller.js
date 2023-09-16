// controller.js
export default class Controller {
    #name;                  // private field: controller name
    #isActive = false;      // private field: active state

    constructor(controllerName) {
        this.controllerName = controllerName;
    }

    start() {
        //Activate the controller if it's not already active.
        if (!this.#isActive) {
            this.#isActive = true;
            // Log the controller's activation.
            console.log(`${this.#name} Controller active!`);
            return true;
        } else {
            console.log("Controller is already active!");
            return false;
        }
    }

    getName() {
        // Get the controller's name.
        return this.controllerName;
    }

    getActiveState() {
        // Get the controller's active state.
        return this.#isActive;
    }
}
