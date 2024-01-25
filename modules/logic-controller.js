//logic-controller.js
import createConfig from "./config.js";
import Controller from "./controller.js";

export default class LogicController extends Controller {
    constructor() {
        // Call the constructor of the superclass (Controller) with the default name 'view'.
        super("logic");
    }

    // Updates the href attribute of <a> elements to redirect users to the real WhatsApp link.
    updateWhatsAppLink() {
        if (typeof document !== 'undefined') {
            // Used in Frontend only
            const configLink = createConfig().getWhatsAppLink();
            const linkElement = document.getElementById("whatsAppLink");
            linkElement.setAttribute('href', configLink);
        }
    }
}
