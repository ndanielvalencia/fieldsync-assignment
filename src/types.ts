
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

export interface UsersState {
    users: User[],
    loading: boolean,
    error: null | string
}
