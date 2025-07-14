export type UserDetails = {
  id:string;
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate:Date;
  email: string;
  number: string;
  password: string;
};

export type Users = UserDetails[]

export type AdminDetails = {
    id:string;
    name:string;
    email:string;
    password:string;
    date:Date;
}