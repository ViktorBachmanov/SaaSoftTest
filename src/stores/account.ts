import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Account } from '@/types'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])
  
  function addAccount() {
    accounts.value.push(new Account())
  }

  return { 
    accounts,
    addAccount,
   }
}, {
  persist: {
    pick: ['accounts']
  },
})
