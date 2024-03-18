export default class UserServive {
    static async registerUser(user) {
        try {
            const response = await fetch("https://mag-s-brand-backend.onrender.com/api/users/", {
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


    static async getAllUsers() {
        const token = this.getUserToken();
        try {
            const response = await fetch("https://mag-s-brand-backend.onrender.com/api/users/", {
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

    static async getUserById(userId) {
        const token = this.getUserToken();
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/users/${userId}`, {
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

    static async updateUserInformation(userId, data) {
        const token = this.getUserToken();
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    'x-auth-token': token
                }
                ,
                body: data
            });

            return response;
        }
        catch (error) {
            console.error(`Error in user registration ${error}`);
            throw error;
        }
    }

    static async deleteUserAccount(userId) {
        const token = this.getUserToken();
        try {
            const response = await fetch(`https://mag-s-brand-backend.onrender.com/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    'x-auth-token': token
                }
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
            const response = await fetch("https://mag-s-brand-backend.onrender.com/api/auth/", {
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
        return JSON.parse(localStorage.getItem("user"));
    }

    static getUserToken() {
        return JSON.parse(localStorage.getItem("token"));
    }
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password) {
        // Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    static validateName(name) {
        if (name.length > 3) {
            return name;
        }
    }
}
