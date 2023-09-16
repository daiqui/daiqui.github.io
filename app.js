// app.js
console.log("app active!");

// Import the Controller class from the controller module.
import Controller from "./modules/controller.js";
import { mainController as _mainController } from "./modules/main-controller.js";

// Create instances of controllers with appropriate names.
const mainController = new Controller('main');      // Manages main application logic.
const logicController = new Controller('logic');    // Handles business logic and data processing.
const viewController = new Controller('view');      // Controls the user interface and views.

// Start each controller.
mainController.start();
logicController.start();
viewController.start();

/* 
//Start up controllers
_mainController();
*/