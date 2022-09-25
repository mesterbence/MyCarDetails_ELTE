import { UserRole } from "./userrole";

export class User {
    id!: number;
    username!: string;
    //password!: string;
    email!: string;
    role!: UserRole;
}
