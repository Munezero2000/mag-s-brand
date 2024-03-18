import UserServive from "./userServices.js";

 
export default class MessageServices{
    static async sendMessage(message) {
        try {
            const response = await fetch("https://mag-s-brand-backend.onrender.com/api/messages/", {
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
    static async deleteMessage(messageId) {
        try {
            const token = UserServive.getUserToken();
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/messages/${messageId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                }
            });
            return response; 
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }
    static async getAllMessages() {
        try {
            const token = UserServive.getUserToken();
            const response = await fetch("https://mag-s-brand-backend.onrender.com/api/messages/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                }
            });
            return response; 
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }
}