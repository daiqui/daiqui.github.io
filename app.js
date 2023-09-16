// app.js

// Import the Controller class from the controller module.
import Controller from "./modules/controller.js";
import { mainController as _mainController } from "./modules/main-controller.js";

// Log the app's activation.
console.log("app active!");

// Create instances of controllers with appropriate names.
const mainController = new Controller('main');      // Manages main application logic.
const logicController = new Controller('logic');    // Handles business logic and data processing.
const viewController = new Controller('view');      // Controls the user interface and views.

// Start each controller.
mainController.start();
logicController.start();
viewController.start();

let test = mainController.getName();
console.log("test");

/* 
//Start up controllers
_mainController();
*/