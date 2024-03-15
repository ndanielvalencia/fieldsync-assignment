export interface ExternalUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: Company;
}

export interface InternalUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}
  

export interface UsersState {
    externalUsers: ExternalUser[],
    internalUsers: InternalUser[],
    isExternalFetching: boolean,
    isExternalFetched: boolean,
    isInternalFetching: boolean,
    isInternalFetched: boolean,
    isPosting: boolean,
    isPosted: boolean,
    error: null | string
}
