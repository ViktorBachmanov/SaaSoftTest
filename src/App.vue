<script setup lang="ts">
import { useAccountStore } from '@/stores/account'

const { addAccount } = useAccountStore()
</script>

<template>
  <v-sheet class="d-flex align-center ga-2">
    <h1>Учетные записи</h1>
    <v-btn 
      density="compact" 
      icon="mdi-plus"
      @click="addAccount"
    ></v-btn>
  </v-sheet>
</template>

<style scoped></style>
