// app.js
// Import the Controller class from the controller module.
import MainController from "./modules/main-controller.js";
import LogicController from "./modules/logic-controller.js";
import ViewController from "./modules/view-controller.js";

// Log the app's activation.
console.log("app active!");

// Create instances of controllers with appropriate names.
const mainController = new MainController();        // Manages main application logic. 
const logicController = new LogicController();      // Handles business logic and data processing. 
const viewController = new ViewController();        // Controls the user interface and views.

// Start each controller.
mainController.start();
logicController.start();
viewController.start();

// Configure the navigation panel, allowing users to switch between pages.
mainController.pageMenu(viewController);

// Load the content displayed for each page of the website.
mainController.loadPageContent();