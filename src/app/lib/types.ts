export type UserDetails = {
  id:string;
  name: string;
  startDate:string | Date;
  endDate:string |Date;
  email: string;
  number: string;
  password: string;
  admin:boolean;
  role:string;
  subscription:string;
  amount:number;
  daysLeft:number;
  trainer:string;
  status:string;
  active:boolean;
  expiringSoon:boolean;
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

export type CounterProps = {
  date:string;
  total:number;
  current:number;
};