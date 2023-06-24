<template>
    <div class="todo">
        <div class="container-personalizado">
            <div class="todo-wrapper bg-very-dark-desaturated-blue">
                <TodoItem v-for="item in todoFiltrados" :key="item.id" :todo="item" @remover-todo="handleClickRemove"
                    @action-todo="handleClickTodo" />
                <TodoFooter :todoList="todoFiltrados"  @filter-todo="handleClickFilter" @clear-completed="handleClickClearCompleted" />
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, provide, onMounted, inject, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../store/todo.store';
import TodoItem from './TodoItem.vue';
import TodoFooter from './/TodoFooter.vue';
import { useAuthStore } from '../store/auth.store';

const { removeTodo, markTodoAsDone, removerCompleted } = useTodoStore()
const { todoList } = storeToRefs(useTodoStore())
const usuarioLogado = inject('usuarioLogado')


const filtro = ref('all')

const todoFiltrados = ref([])

provide('todoList', todoList)

const handleClickRemove = (id) => {
    removeTodo(id, usuarioLogado.value.id)
}

const handleClickClearCompleted = () => {
    removerCompleted(usuarioLogado.value.id)
}

watch(
    () => todoList.value,
    (v) => {
        todoFiltrados.value = todoList.value
    },
    {
        immediate: true
    }

)

watch(
 () => filtro.value,
 (v) => {
    console.log(v)
        if (v === 'all') {
            todoFiltrados.value = todoList.value
        } else if (v === 'done') {
            todoFiltrados.value = todoList.value.filter((todo) => !todo.done)
        } else if (v === 'undone') {
            todoFiltrados.value = todoList.value.filter((todo) => todo.done)
        }
 }

)


function handleClickTodo(id) {
    markTodoAsDone(id, usuarioLogado.value.id)
}

const handleClickFilter = (active) => {
    filtro.value = active
}


</script>

<style scoped>
.todo {
    margin-top: -128px;
    position: relative;
    z-index: 2;

}

.todo-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: .25rem;
}
</style>