export interface ILoginResponse {
    accessToken: string | null;
    refreshToken: string | null;
    user: IUserResponse | null;
    auth: boolean | null;
}

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IUserResponse extends IUser { 
    id: string;
}

export interface IRegisterPayload extends IUser {
    password: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}