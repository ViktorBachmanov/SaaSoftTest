<script setup lang="ts">
import type { Account } from '@/types'
import { useTemplateRef, ref } from 'vue';

const props = defineProps<{
  account: Account
}>()

const rules = {
  max50: (v: any) => v.length <= 15,
  max100: (v: any) => v.length <= 5,
  required: (v: any) => !!v,
}

const data: any = {
  tags: createDataObj('tags'),
  login: createDataObj('login'),
  password: createDataObj('password'),
}

function createDataObj(name: 'tags' | 'login' | 'password') {
  return {
    inputRef: useTemplateRef(name),
    buffer: ref(props.account[name])
  }
}

async function handleBlur(fieldName: 'tags' | 'login' | 'password') {
  await new Promise(res => setTimeout(res))
  const isInputValid = data[fieldName].inputRef.value?.isValid
  if (isInputValid) {
    props.account[fieldName] = data[fieldName].buffer.value
  }

  validateRequired()
}

function validateRequired() {
  data.login.inputRef.value.validate()
  data.password.inputRef.value.validate()
}
</script>

<template>
  <tr>
    <td>
      <v-textarea 
        variant="outlined"
        v-model="data.tags.buffer.value"
        :rows="1"
        auto-grow
        :rules="[rules.max50]"
        ref="tags"
        :validate-on="'blur'"
        @blur="handleBlur('tags')"
      ></v-textarea>
    </td>
    <td>
      <v-select
        :items="['LDAP', 'Локальная',]"
        variant="outlined"
        v-model="account.recordType"
        @update:model-value="validateRequired"
      ></v-select>
    </td>
    <td>
      <v-text-field 
        variant="outlined"
        v-model="data.login.buffer.value"
        :rules="[rules.max100, rules.required]"
        :validate-on="'blur'"
        ref="login"
        @blur="handleBlur('login')"
      ></v-text-field>
    </td>
    <td>
      <v-text-field 
        variant="outlined"
        v-model="data.password.buffer.value"
        :rules="[rules.max100, rules.required]"
        :validate-on="'blur'"
        ref="password"
        @blur="handleBlur('password')"
      ></v-text-field>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding: 0.5em;
}
</style>