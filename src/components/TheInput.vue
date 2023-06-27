<template>
   
    <input class="bg-very-dark-desaturated-blue h-full text-light-grayish-blue " type="text"
        placeholder="Digite sua tarefa" :value="text" @input="$emit('update:text', $event.target.value)"
        />
</template>


<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const emits = defineEmits(['update:text'])

const props = defineProps({
    text: {
        type: String,
        default: ''
    }
})

</script>

<style scoped>
input {
    outline: none;
    border: none;
    border-radius: .25rem;
    width: 100%;
}
</style>