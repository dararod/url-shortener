export class LinkNotFoundError extends Error {
    constructor(message: string = "The provided id does not match any link") {
      super(message);
      this.name = "LinkDuplicated";
    }
  }
  