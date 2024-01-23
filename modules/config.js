export default function createConfig() {
    const whatsapp = "https://chat.whatsapp.com/C0Y6CNoNNSdB6K06Eb6Pf9";
    const mongoDbApiKey = "mongodb+srv://nowMAKI:monG!o4tlas@cluster0.jphtbp6.mongodb.net/?retryWrites=true&w=majority";

    return {
        getWhatsAppLink: function () {
            return whatsapp;
        },
        getMongoDbApiKey: function () {
            return mongoDbApiKey;
        },
    };
}
