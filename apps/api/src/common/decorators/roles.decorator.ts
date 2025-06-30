import { SetMetadata } from '@nestjs/common';

export type UserRole = 'attendee' | 'organizer';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
