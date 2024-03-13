 
export default class MessageServices{
    static async sendMessage(message) {
        try {
            const response = await fetch("http://localhost:4000/api/messages/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            });

            return response; 
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }
}