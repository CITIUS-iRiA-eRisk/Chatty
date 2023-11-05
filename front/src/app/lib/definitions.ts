

export type User = {
    mail: string;
    password: string;
}

export type Responsonse = {
    user: User;
    token: string;
}