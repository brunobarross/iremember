<template>
    <div class="todo-item p-4 h-14 flex items-center justify-between">
        <div class="flex items-center">
            <button class="check-button rounded-full w-6 h-6 mr-4 grid place-items-center border border-very-dark-grayish-blue transition-all" :class="{active: todo.done} " @click="$emit('action-todo', todo.id)">
                <img src="../assets/img/icon-check.svg" v-show="todo.done" />
            </button>
            <p class="text-base text-light-grayish-blue">{{todo.text}}</p>
        </div>

        <button class="p-2" @click="$emit('remover-todo', todo.id)">
            <img src="../assets/img/icon-cross.svg" />
        </button>

    </div>
</template>

<script setup>

import {ref, defineProps, defineEmits} from 'vue'


const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['remover-todo', 'action-todo'])

</script>

<style  scoped>
.todo-item:not(:last-child){
    border-bottom: 1px solid hsl(233, 14%, 35%);
}


.check-button.active, .check-button:hover{
    background: linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
    border-color: transparent;

}

.check-button:hover img{
    display: block !important;
}

</style>