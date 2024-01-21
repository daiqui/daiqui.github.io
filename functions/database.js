// functions/database.js
import { connectToMongoDB } from '../db_controller';

exports.handler = async (event, context) => {
    try {
        await connectToMongoDB();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Netlify-Funktion erfolgreich ausgeführt!',
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Fehler beim Ausführen der Netlify-Funktion', error: error.message }),
        };
    }
};
