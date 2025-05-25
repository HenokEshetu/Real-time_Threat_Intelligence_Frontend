export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  deletionRequested: boolean;
}

export interface Role {
  name: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
  description: string;
}

export interface RefreshResponse {
  access_token: string;
  user: User;
}