export interface Tag {
    text: string,
}

type AccountType = 'LDAP' | 'Локальная'

export interface Account {
    tag: Array<Tag>,
    type: AccountType,
    login: string,
    password: string,
}
