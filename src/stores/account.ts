import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])
  
  function addAccount() {
    accounts.value.push({
      tags: [],
      recordType: 'LDAP',
      login: '',
      password: '',
    })
  }

  return { 
    accounts,
    addAccount,
   }
})
