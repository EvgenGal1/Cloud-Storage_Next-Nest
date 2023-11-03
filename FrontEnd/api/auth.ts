// мтд.req > БД
import axios from '@/core/axios';
import { destroyCookie } from 'nookies';

import {
  LoginFormDTO,
  LoginResponseDTO,
  RegisterFormDTO,
  RegisterResponseDTO,
  User,
} from '@/api/dto/auth.dto';

// мтд.Авториз. Req - LoginFormDTO, Res - LoginResponseDTO
export const login = async (
  values: LoginFormDTO,
): Promise<LoginResponseDTO> => {
  return (await axios.post('/auth/login', values)).data;
};

// мтд.Регистр.
export const register = async (
  values: RegisterFormDTO,
): Promise<RegisterResponseDTO> => {
  return (await axios.post('/auth/register', values)).data;
};

// инфо о user
export const getMe = async (): Promise<User> => {
  return (await axios.get('/users/me')).data;
};

// мтд.Выход с очистк.cookie
export const logout = () => {
  destroyCookie(null, '_token', { path: '/' });
};
