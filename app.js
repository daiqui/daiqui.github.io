// app.js
// Import the Controller class from the controller module.
import LogicController from "./modules/logic-controller.js";
import ViewController from "./modules/view-controller.js";
import { connectToMongoDB } from "./db_controller.js";

// Log the app's activation.
console.log("app active!");

// Create instances of controllers with appropriate names.
const logicController = new LogicController();      // Handles business logic and data processing. 
const viewController = new ViewController();        // Controls the user interface and views.

// Start each controller.
logicController.start();
viewController.start();

// Configure the navigation panel, allowing users to switch between pages and display page content
viewController.navPanel();

// Updates href attribute to redirect users to WhatsApp.
logicController.updateWhatsAppLink();


/*-----------------------------------------------------------------
testing UUID for UserId !!! */
if (typeof window !== 'undefined' && typeof window.crypto !== 'undefined' && typeof window.crypto.randomUUID === 'function') {
    console.log(window.crypto.randomUUID());
} else {
    console.log("Crypto.randomUUID() is not available in this environment.");
}

//console.log(crypto.randomUUID());
/*----------------------------------------------------------------*/


// Call the connectToMongoDB function
connectToMongoDB();

