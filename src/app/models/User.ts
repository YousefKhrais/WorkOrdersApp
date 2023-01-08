export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    SiteEngineer = 'SiteEngineer',
    Foremen = 'Foremen',
}