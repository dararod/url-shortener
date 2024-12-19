export class LinkDuplicatedError extends Error {
  constructor(message: string = "The provided link is duplicated") {
    super(message);
    this.name = "LinkDuplicated";
  }
}
