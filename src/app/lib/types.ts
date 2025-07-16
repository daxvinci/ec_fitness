export type UserDetails = {
  id:string;
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate:Date;
  email: string;
  number: string;
  password: string;
  admin:boolean;
  role:string;
};

export type Users = UserDetails[]

export type AdminDetails = {
    id:string;
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    date:Date;
    admin:boolean;
    role:string;
}