<script setup lang="ts">
import type { Account } from '@/types'

const props = defineProps<{
  account: Account
}>()
</script>

<template>
  <tr>
    <td>
      <v-textarea 
        variant="outlined"
        v-model="account.tags"
        :rows="1"
        auto-grow
      ></v-textarea>
    </td>
    <td>
      <v-select
        :items="['LDAP', 'Локальная',]"
        variant="outlined"
        v-model="account.recordType"
      ></v-select>
    </td>
    <td>
      <v-text-field 
        variant="outlined"
        v-model="account.login"
      ></v-text-field>
    </td>
    <td>
      <v-text-field 
        variant="outlined"
        v-model="account.password"
      ></v-text-field>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding: 0.5em;
}
</style>