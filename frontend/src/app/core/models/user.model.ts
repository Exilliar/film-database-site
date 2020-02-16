import { Role } from 'src/app/core/models/role.model';

export interface User {
    role: Role;
    uid: string;
    email: string;
}