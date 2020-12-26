<template>
  <ul data-testid="to-do-list">
    <li v-for="(todo, index) in toDos" :key="todo.id">
      <input
        type="checkbox"
        aria-label="Complete to do"
        :checked="todo.completed"
        @change="() => completeToDo(index)"
      />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <button @click="() => deleteToDo(index)">Delete</button>
    </li>
  </ul>
  <label for="todo-editor">Add task +</label>
  <input
    type="text"
    id="todo-editor"
    v-model="newToDoText"
    @keydown.enter="addToDo"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Todo {
  id: number
  text: string
  completed?: boolean
}

export default defineComponent({
  name: 'ToDoList',
  setup() {
    const toDos = ref<Array<Todo>>([])
    const newToDoText = ref('')

    function addToDo() {
      const text = newToDoText.value.trim()

      if (text) {
        toDos.value.push({
          id: new Date().getTime(),
          text,
        })

        newToDoText.value = ''
      }
    }

    function completeToDo(index: number) {
      toDos.value[index].completed = !toDos.value[index].completed
    }

    function deleteToDo(index: number) {
      toDos.value.splice(index, 1)
    }

    return {
      toDos,
      newToDoText,
      addToDo,
      completeToDo,
      deleteToDo,
    }
  },
})
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
