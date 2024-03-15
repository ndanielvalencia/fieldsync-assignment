
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: Company;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}
  

export interface UsersState {
    users: User[],
    isExternalFetching: boolean,
    isInternalFetching: boolean,
    isPosting: boolean,
    isPosted: boolean,
    error: null | string
}
