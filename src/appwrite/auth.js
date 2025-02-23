import { Client, Account, ID } from 'appwrite';
import conf from '../conf/conf';

export class AuthService {
    client = new Client();
    account;

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
            console.log(error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async logout() {
        try {
            const userlogout = await this.account.deleteSessions();
            if (userlogout) return this.login;
        } catch (error) {
            console.log(error);
        }
    }
}

const authService = new AuthService();
export default authService;