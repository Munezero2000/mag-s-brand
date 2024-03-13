export default class UserServive {
    static async registerUser(user) {
        try {
            const response = await fetch("http://localhost:4000/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            return response;
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }

    static async authenticateUser(user) {
        try {
            const response = await fetch("http://localhost:4000/api/auth/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            return response;
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }

    static getAuthenticatedUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user
    }
}
