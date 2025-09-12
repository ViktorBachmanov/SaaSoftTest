<script setup lang="ts">
import { Account, Tag } from '@/types'
import type { RecordType } from '@/types'
import { useTemplateRef, ref, watch } from 'vue';
import { useAccountStore } from '@/stores/account'

const props = defineProps<{
  account: Account,
  index: number,
}>()

const { removeAccount } = useAccountStore()

const rules = {
  max50: (v: any) => v?.length <= 50,
  max100: (v: any) => v?.length <= 100,
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
    buffer: ref(props.account.getProperty(name))
  }
}

async function handleBlur(fieldName: 'tags' | 'login' | 'password') {
  await new Promise(res => setTimeout(res))
  const isInputValid = data[fieldName].inputRef.value?.isValid
  if (isInputValid) {
    props.account.setProperty(fieldName, data[fieldName].buffer.value)
  }

  validateRequired()
}

function validateRequired() {
  data.login.inputRef.value?.validate()
  data.password.inputRef.value?.validate()
}

async function handleSelectUpdated(val: RecordType) {
  await new Promise(res => setTimeout(res))

  validateRequired()

  if (val == 'LDAP') {
    data.password.buffer.value = props.account.password = null
  }
}

const passwordVisibe = ref(false)
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
        @update:model-value="handleSelectUpdated"
      ></v-select>
    </td>
    <td
      :colspan="account.recordType == 'Локальная' ? '' : 2"
    >
      <v-text-field 
        variant="outlined"
        v-model="data.login.buffer.value"
        :rules="[rules.max100, rules.required]"
        :validate-on="'blur'"
        ref="login"
        @blur="handleBlur('login')"
      ></v-text-field>
    </td>
    <td
      v-if="account.recordType == 'Локальная'"
    >
      <v-text-field 
        variant="outlined"
        v-model="data.password.buffer.value"
        :rules="[rules.max100, rules.required]"
        :validate-on="'blur'"
        ref="password"
        @blur="handleBlur('password')"
        :append-inner-icon="passwordVisibe ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisibe ? 'text' : 'password'"
        @click:append-inner="passwordVisibe = !passwordVisibe"
      ></v-text-field>
    </td>
    <td>
      <v-btn 
      density="compact" 
      icon="mdi-trash-can-outline"
      @click="removeAccount(index)"
    ></v-btn>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding: 0.5em;
}
</style>