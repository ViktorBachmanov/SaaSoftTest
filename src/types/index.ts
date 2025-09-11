export interface Tag {
    text: string,
}

type RecordType = 'LDAP' | 'Локальная'

export interface Account {
    tags: Array<Tag>,
    recordType: RecordType,
    login: string,
    password: string,
}
