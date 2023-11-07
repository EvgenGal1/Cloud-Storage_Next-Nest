// ^ типизация данн.Авториз./Регистр./Пользователь

// Авториз.
// отправка на БД
export interface LoginFormDTO {
  email: string;
  password: string;
}
// получение с БД
export interface LoginResponseDTO {
  token: string;
}

// Регистр.
// расшир.LoginFormDTO + fullName
export type RegisterFormDTO = LoginFormDTO & { fullName: string };
export type RegisterResponseDTO = LoginResponseDTO;

// Пользователь
export interface User {
  id: number;
  email: string;
  fullName: string;
}
