import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Account } from '@/types'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])
  
  function addAccount() {
    accounts.value.push(new Account())
  }

  function removeAccount(index: number) {
    accounts.value.splice(index, 1)
  }

  return { 
    accounts,
    addAccount,
    removeAccount,
   }
}, {
  persist: {
    pick: ['accounts'],
    serializer: {
      deserialize: (data) => {
        const parsedData = JSON.parse(data)
        parsedData.accounts = parsedData.accounts.map(
          (acc: any) => new Account(acc.tags, acc.recordType, acc.login, acc.password, acc.id)
        )
        return parsedData
      },
      serialize: JSON.stringify
    }
  },
})
