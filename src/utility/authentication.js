class AuthenticationService {
    #user;
    constructor() {

    }
    get loggedIn() {
        return Boolean(this.#user);
    }
    get user() {
        // TODO get user from token?
        if(this.#user) {
            return structuredClone(this.#user);
        }
        throw Error('not logged in');
    }
    logIn(credentials) {
        // TODO real login
        this.#user = {
            name: credentials.username,
            rating: 5
        }
    }
    signUp(credentials) {
        this.logIn(credentials); // TODO real sign up
    }
    signOut() {
        this.#user = null;
    }
}

const authentication = new AuthenticationService();

export {authentication}