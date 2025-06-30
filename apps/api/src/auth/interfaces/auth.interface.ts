export interface User {
  userId: string;
  email: string;
  username?: string;
  role: 'attendee' | 'organizer';
  passwordHash?: string;
  createdAt?: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'attendee' | 'organizer';
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  accessToken: string;
  user: Pick<User, 'userId' | 'email' | 'role' | 'username'>;
}

export interface GoogleProfile {
  id: string;
  email: string;
  displayName: string;
  photo?: string;
}

import { Request } from 'express';
export interface AuthRequest extends Request {
  user: JwtPayload;
}
