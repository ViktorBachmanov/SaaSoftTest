export class Tag {
    text: string

    constructor(text: string) {
        this.text = text
    }
}

export enum RecordType {
    LDAP = 'LDAP',
    Local = 'Локальная'
}

export class Account {
    tags: Array<Tag>
    recordType: RecordType
    login: string
    password: string|null
    id: number

    constructor(
        tags: Array<Tag> = [], 
        recordType: RecordType = RecordType.Local, 
        login: string = '', 
        password: string|null = '', 
        id: number = Date.now()
    ) {
        this.tags = tags
        this.recordType = recordType
        this.login = login
        this.password = password
        this.id = id
    }

    setProperty(name: 'tags' | 'login' | 'password', val: string) {
        switch (name) {
            default:
                this[name] = val
                break;
            case 'tags':
                const tagsArr = val.trim().split(/\s*(?:;|$)\s*/)
                this.tags = tagsArr.map((tagText: string) => (new Tag(tagText)))
                break;
        }
    }

    getProperty(name: 'tags' | 'login' | 'password'): string|null {
        switch (name) {
            default:
                return this[name]
            case 'tags':
                return this.tags.map(tagObj => tagObj.text).join('; ')
        }
    }
}
