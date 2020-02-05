import { Role } from 'src/app/models/role.model';

export interface User {
    role: Role;
    uid: string;
    email: string;
}