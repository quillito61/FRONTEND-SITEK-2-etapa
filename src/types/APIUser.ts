export interface GetUsers {
    msg:   string;
    users: APIUser[];
}

export interface APIUser {
    

    UserId: number;
    Username: string;
    Name: string;
    UserTypeId: string;
    Description: string;
    proveedor_id: string;
    proveedor_dsc: string;
    puesto_id: string;
    puesto_dsc: string;
}

export interface getUserByUsernameResponse
{

    ok:         boolean;
    usuario: APIUser;
    msg:        string;


}

export interface getUser
{

    ok:         boolean; 
    msg:        string;
    user: APIUser;
   


}

export interface Usuario {
    UserId: number;
    Username: string;
    Name: string;
    UserType: string;
    proveedor_id: string;
    puesto_id: string;
  } 
