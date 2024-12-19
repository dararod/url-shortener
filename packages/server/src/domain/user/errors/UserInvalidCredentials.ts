export class UserInvalidCredentialsError extends Error {
    constructor(message: string = "The email or password provided is incorrect") {
      super(message);
      this.name = "UserInvalidCredentials";
    }
  }