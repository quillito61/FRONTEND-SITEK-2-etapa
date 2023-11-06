export interface User {
  id: string;
  avatar?: string;
  email: string;
  name: string;
  UserType: string;
  proveedor_id: string;
  puesto_id: string;
  [key: string]: any;
}
