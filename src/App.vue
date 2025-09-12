<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import AccountTable from '@/components/AccountTable.vue'
import { useTheme } from 'vuetify'

const { addAccount } = useAccountStore()

const theme = useTheme()
</script>

<template>
  <v-sheet class="mt-4 ml-4 d-flex align-center ga-2">
    <h1>Учетные записи</h1>
    <v-btn 
      density="compact" 
      icon="mdi-plus"
      @click="addAccount"
    ></v-btn>

    <v-btn
      @click="theme.toggle()"
      text="Toggle Light / Dark"
      class="ml-16"
    ></v-btn>
  </v-sheet>

  <v-banner
    icon="mdi-help-circle-outline"
    lines="one"
    text="Для указания нескольких меток логин/пароль используйте разделитель ;"
    :stacked="false"
  />

  <AccountTable
    style="margin: 2em"
  />
</template>

<style scoped></style>
