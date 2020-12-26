<template>
  <h1>My To-Do list</h1>
  <to-do-list />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ToDoList from './components/ToDoList.vue'

export default defineComponent({
  name: 'App',
  components: {
    ToDoList,
  },
})
</script>

<style></style>
