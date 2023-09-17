export default function createConfig() {
    const whatsapp = "https://chat.whatsapp.com/C0Y6CNoNNSdB6K06Eb6Pf9";
    const mongoDbApiKey = "your_mongodb_api_key_here";

    return {
        getWhatsAppLink: function () {
            return whatsapp;
        },
        getMongoDbApiKey: function () {
            return mongoDbApiKey;
        },
    };
}
