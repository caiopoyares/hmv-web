export interface Order {
  id: string;
  user: User;
  arrivalDate: Date;
  reason: string;
  description: string;
  status: string;
  suggestions?: string;
  hospital: Hospital;
  doctor?: Doctor;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  cpf: string;
  age: number;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  crm: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
}
