<template>
    <footer class="todo-footer p-4 lg:h-14 hidden md:flex items-center justify-between ">
        <p class="text-sm text-very-dark-grayish-blue font-bold">{{ itensLeft }} itens restantes</p>
        <ul class="nav-footer">
            <li class="text-very-dark-grayish-blue transition-all" @click="$emit('filter-todo', 'all')">Todos</li>
            <li class="text-very-dark-grayish-blue transition-all" @click="$emit('filter-todo', 'done')">Ativos</li>
            <li class="text-very-dark-grayish-blue transition-all" @click="$emit('filter-todo', 'undone')">Feitos</li>
        </ul>
        <button class="p-2 text-very-dark-grayish-blue font-bold text-sm" @click="$emit('clear-completed')">Limpar
            feitos</button>
    </footer>
    <footer class="todo-footer p-4 lg:h-14 flex md:hidden lg:items-center justify-between flex-col lg:flex-row">
        <div class="flex items-center justify-between">
            <p class="text-sm text-very-dark-grayish-blue font-bold">{{ itensLeft }} itens restantes</p>
            <ul class="nav-footer">
                <li class="text-very-dark-grayish-blue transition-all" @click="$emit('filter-todo', 'all')">Todos</li>
                <li class="text-very-dark-grayish-blue transition-all" @click="$emit('filter-todo', 'done')">Ativos
                </li>
                <li class="text-very-dark-grayish-blue transition-all" @click="$emit('filter-todo', 'undone')">Feitos
                </li>
            </ul>
        </div>

        <button class="p-2 text-very-dark-grayish-blue font-bold text-sm mt-4" @click="$emit('clear-completed')">Limpar
            feitos</button>
    </footer>
</template>

<script setup>

import { ref, defineProps, defineEmits, computed } from 'vue'

const emits = defineEmits(['filter-todo', 'clear-completed'])

const props = defineProps({
    todoList: {
        type: Array,
        required: true
    }
})

const itensLeft = computed(() => {
    return props.todoList.filter(todo => !todo.done).length
})

</script>

<style  scoped>
.nav-footer {
    display: flex;
    gap: 1rem;
    list-style: none;
    align-items: center;


}

.nav-footer li {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;

}

.nav-footer li:hover,
.nav-footer li.active {
    color: hsl(220, 98%, 61%);
}</style>