class Escort {
  constructor(
    public id: string = "",
    public first_name: string,
    public last_name: string,
    public username: string,
    public email: string,
    public password: string
  ) {}

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
