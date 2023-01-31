class AuthenticationService {
  #user;
  static #key = "learner-support-token";
  constructor() {
    const token = localStorage.getItem(AuthenticationService.#key);
    this.#user = this.#tokenToUser(token);
    // otherwise, user is null
  }
  #tokenToUser(token) {
    if (token) {
      const parsedToken = JSON.parse(
        atob(token.split(".")[1])
      );
      if (parsedToken.exp * 1000 > new Date().getTime()) {
        return parsedToken;
      }
    }
    return null;
  }
  get loggedIn() {
    return Boolean(this.#user);
  }
  get user() {
    // TODO get user from token?
    if (this.#user) {
      return structuredClone(this.#user);
    }
    throw Error("not logged in");
  }
  get token() {
    return localStorage.getItem(AuthenticationService.#key)
  }
  async logIn(credentials) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + btoa(`${credentials.username}:${credentials.password}`));


    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(`http://127.0.0.1:5000/users/${credentials.username}/token`, requestOptions);
    const result = await response.json();
    localStorage.setItem(AuthenticationService.#key, result.token)
    this.#user = this.#tokenToUser(result.token);
  }
  async signUp(credentials) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(credentials);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("http://127.0.0.1:5000/users", requestOptions);
    const result = await response.json();
    localStorage.setItem(AuthenticationService.#key, result.token)
    this.#user = this.#tokenToUser(result.token);
  }
  signOut() {
    this.#user = null;
    localStorage.removeItem(AuthenticationService.#key);
  }
}

const authentication = new AuthenticationService();

export { authentication };
