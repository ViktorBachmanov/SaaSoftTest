export class Tag {
    text: string

    constructor(text: string) {
        this.text = text
    }
}

type RecordType = 'LDAP' | 'Локальная'

export class Account {
    tags: Array<Tag> = []
    recordType: RecordType = 'Локальная'
    login: string = ''
    password: string = ''
}
