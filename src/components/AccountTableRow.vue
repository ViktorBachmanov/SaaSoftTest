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
  max50: (v: any) => v?.length <= 15,
  max100: (v: any) => v?.length <= 5,
  required: (v: any) => !!v,
}

const data: any = {
  tags: {
    inputRef: useTemplateRef('tags'),
    buffer: ref(props.account.tags.map(tagObj => tagObj.text).join('; '))
  },
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
    switch (fieldName) {
      default:
        props.account[fieldName] = data[fieldName].buffer.value
        break;
      case 'tags':
        const tagsArr = data.tags.buffer.value.split(/\s*(?:;|$)\s*/)
        props.account.tags = tagsArr.map((tagText: string) => (new Tag(tagText)))
        break;
    }
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