export class User {
  constructor(
    public uid: string = '',
    public email: string = '',
    public password: string = '',
    public displayName: string = '',
    public imageURL: string = '',
    public emailVarfied: boolean = false,
    public name: string = '',
    public about: string = ''
  ) {}
}
