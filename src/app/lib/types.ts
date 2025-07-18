export type UserDetails = {
  id:string;
  firstName: string;
  lastName: string;
  startDate:string | Date;
  endDate:string |Date;
  email: string;
  number: string;
  password: string;
  admin:boolean;
  role:string;
  membership:string;
  amount:number;
  trainer:string;
  status:string;
  expired:boolean;
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

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  startDate: string | Date; // ISO string
  endDate: string | Date;   // ISO string
  onSet: (startDate: string, endDate: string) => void;
};