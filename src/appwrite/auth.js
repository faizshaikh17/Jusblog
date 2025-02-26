import { Client, Account, ID, AppwriteException } from 'appwrite';
import conf from '../conf/conf';

export class AuthService {

    client = new Client();
    account;
    users;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your Project Id

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login
            } else throw new Error
        } catch (error) {
            console.log("AuthService :: login :: error", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("AuthService :: createAccount :: error", error);
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getUser :: error", error);
            if (error instanceof AppwriteException && error.code === 401) {
                // Session has expired
                return null; // Or redirect to login
            }
            throw error; // Re-throw the error for the calling code to handle
        }
    }

    // async getUsers() {
    //     const list = await this.users.list([]);
    // }

    async logout() {
        try {
            const userlogout = await this.account.deleteSessions();
            if (userlogout) return this.login;
        } catch (error) {
            console.log("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;