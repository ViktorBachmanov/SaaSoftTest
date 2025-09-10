export interface Tag {
    text: string,
}

export interface Account {
    tag: Array<Tag>,
    type: string,
    login: string,
    password: string,
}