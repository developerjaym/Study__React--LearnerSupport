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
      try {
        const parsedToken = JSON.parse(atob(token.split(".")[1]));
        if (parsedToken.exp * 1000 > new Date().getTime()) {
          return parsedToken;
        }
      } catch (e) {
        localStorage.removeItem(AuthenticationService.#key); // in case something bad gets in there
      }
    }
    return null;
  }
  get loggedIn() {
    return Boolean(this.#user);
  }
  get user() {
    if (this.#user) {
      return structuredClone(this.#user);
    }
    throw Error("not logged in");
  }
  get token() {
    return localStorage.getItem(AuthenticationService.#key);
  }
  async logIn(credentials) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Basic " + btoa(`${credentials.username}:${credentials.password}`)
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/users/${credentials.username}/token`,
      requestOptions
    );
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem(AuthenticationService.#key, result.token);
      this.#user = this.#tokenToUser(result.token);
    } else {
      console.error(response.status, response.statusText);
      throw Error("Unable to log in");
    }
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
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, requestOptions);
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem(AuthenticationService.#key, result.token);
      this.#user = this.#tokenToUser(result.token);
    } else {
      console.error(response.status, response.statusText);
      throw Error("Unable to sign up");
    }
  }
  signOut() {
    this.#user = null;
    localStorage.removeItem(AuthenticationService.#key);
  }
}

const authentication = new AuthenticationService();

export { authentication };
