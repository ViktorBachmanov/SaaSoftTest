<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import AccountTableRow from './AccountTableRow.vue'

const { accounts } = useAccountStore()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Метки</th>
        <th>Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
      </tr>
    </thead>

    <tbody>
      <AccountTableRow
        v-for="(account, index) in accounts"
        :account
        :index
      />
    </tbody>
  </table>
</template>

<style scoped>
th {
  width: 12em;
  text-align: left;
  padding-left: 0.5em;;
}
</style>