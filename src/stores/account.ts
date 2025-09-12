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
    pick: ['accounts']
  },
})
