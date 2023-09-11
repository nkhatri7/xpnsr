export interface AuthFormInputData {
  value: string;
  errorMessage: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}
