export class UserInvalidEmailError extends Error {
    constructor(message: string = "The provided email is in use by another user") {
      super(message);
      this.name = "UserInvalidEmail";
    }
  }