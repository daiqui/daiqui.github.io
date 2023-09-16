// app.js

// Import the Controller class from the controller module.
import Controller from "./modules/controller.js";

/******************************   PLEASE CHANGE  **************************************/
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

/* 
*****************************   PLEASE CHANGE  ****************************************
*/
//Start up controllers
_mainController();