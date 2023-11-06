import { RestoreOutlined } from '@mui/icons-material';
import { APIUser, Usuario ,GetUsers ,getUserByUsernameResponse,getUser} from 'src/types/APIUser';
import { GetProviders, Provider } from 'src/types/getProvider';
import type { User } from '../types/user';
import { createResourceId } from '../utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from '../utils/jwt';
import { wait } from '../utils/wait';
import API from './API';
export interface LoginToken {
  msg:   string;
  token: string;
}



class AuthApi {
  async login({ email, password }: { email: string; password: string; }): Promise<string> {
    const result = await API.post<LoginToken>('auth/login', { username: email, password });
    return Promise.resolve(result.data.token);
  }
  async getProviders(): Promise<Provider[]> {
    const result = await API.get<GetProviders>('sitek/getProviders');
    return Promise.resolve(result.data.providers);
  }
  async newUser (username: string, password: string, name: string, proveedor_id: string | null, puesto_id: string | null, selectedUserType: string | null): Promise<boolean> {
    await API.post<APIUser>('auth/newUser', { username, password, name, proveedor_id, puesto_id, selectedUserType });
    return Promise.resolve(true);
  }

  async deleteUser (userId: number): Promise<boolean> {
    //alert(userId )
    const count = await API.delete<APIUser>('auth/deleteUser',{ params: { userId: userId } });
    return Promise.resolve(true);
  }

  async getUsers(): Promise<APIUser[]> {
    const result = await API.get<GetUsers>('auth/getUsers');
    return Promise.resolve(result.data.users);
  }

  

  async GetUser(userId: number): Promise<APIUser> {
    console.log('Parametro a la api',userId)
    const result = await API.get<getUser>('auth/getUser', { params: { UserId: userId } });
    console.log('Resultado de la api:',result.data)
  
    return Promise.resolve(result.data.user);
  }


async getUserByUsername(username: string): Promise<APIUser> {
  console.log('Parametro',username)
  const result = await API.get<getUserByUsernameResponse>('auth/getUserByUsername', { params: { username: username } });
  console.log('RESULT',result.data.usuario)
  return Promise.resolve(result.data.usuario);
}

  async register({
    email,
    name,
    password
  }: { email: string; name: string; password: string; }): Promise<string> {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
       

        const accessToken = sign(
          { userId: "user.id "},
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(accessToken: string): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const { userId, userName, name, proveedor_id, puesto_id,UserType } = decode(accessToken) as any;
        // Find the user
        resolve({
          id: userId,
          avatar: '/static/mock-images/avatars/user.png',
          email: userName,
          name: name,
          plan: 'Standard',
          formActive: false ,
          proveedor_id: proveedor_id,
          puesto_id: puesto_id,
          UserType: UserType
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
