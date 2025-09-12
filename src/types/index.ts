import { computed } from 'vue'

class Tag {
    text: string

    constructor(text: string) {
        this.text = text
    }
}

type RecordType = 'LDAP' | 'Локальная'

export class Account {
    _tags: Array<Tag> = []
    recordType: RecordType = 'Локальная'
    _login: string = ''
    _password: string = ''


    get tags(): string {
        return this._tags.map(tagObj => tagObj.text).join('; ')
    }
    set tags(val: string) {
        const tagsArr = val.split(/\s*(?:;|$)\s*/)
        this._tags = tagsArr.map(tagText => (new Tag(tagText)))
    }

    get login(): string {
        return this._login
    }
    set login(val: string) {
        this._login = val
    }

    get password(): string {
        return this._password
    }
    set password(val: string) {
        this._password = val
    }
}
