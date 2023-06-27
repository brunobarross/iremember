<template>
    <div class="relative h-[350px] pt-16">
        <picture class="absolute top-0 w-full h-full z-[1]">
            <img class="w-full object-cover h-full" src="../assets/img/bg-desktop-dark.jpg" alt="logo" />
        </picture>
        <div class="container-personalizado z-[2]">
            <div class="flex items-center justify-between">
                <h1 class="text-light-grayish-blue font-bold text-2xl md:text-5xl -tracking-tighter">IRemember</h1>
                <div class="flex items-center" v-if="usuarioLogado">
                    <p class="text-light-grayish-blue text-xs md:text-sm">Bem vindo, {{ usuarioLogado.name }}</p>
                    <button class=" p-2 logout-button transition-all" @click="handleClickLogout">
                        <PhSignOut class="text-light-grayish-blue" />
                    </button>
                </div>


            </div>
            <div class="flex justify-between mt-4 items-center">
                <p class="text-light-grayish-blue text-xs md:text-sm">Desenvolvido por Altamiro Bruno.</p>
                <div class="flex items-center">
                    <a href="https://www.linkedin.com/in/altamirobruno/" target="_blank">
                        <PhLinkedinLogo size="24" class="text-white ml-2" />
                    </a>
                   <a href="https://github.com/brunobarross" target="_blank">
                    <PhGithubLogo size="24" class="text-white ml-2" />
                   </a>
                   
                </div>

            </div>
            <div class="input-box mt-8 bg-very-dark-desaturated-blue p-4 h-14 overflow-hidden rounded">
                <div class="flex items-center">
                    <button
                        class="send-button rounded-full w-6 h-6 mr-4 grid place-items-center border border-very-dark-grayish-blue transition-all"
                        @click="handleClickCreate">
                        <img src="../assets/img/icon-check.svg" />
                    </button>

                    <TheInput v-model:text="text" />
                </div>

            </div>


        </div>


    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
import TheInput from './TheInput.vue';
import { useTodoStore } from '../store/todo.store';
import { PhSignOut , PhGithubLogo, PhLinkedinLogo} from "@phosphor-icons/vue";
import { useAuthStore } from '../store/auth.store';

const usuarioLogado = inject('usuarioLogado')

const text = ref('')

const { createTodo } = useTodoStore();

const { logout } = useAuthStore()

const handleClickCreate = () => {
    createTodo(text.value, usuarioLogado.value.id)
    text.value = ''

}

const handleClickLogout = () => {
    logout()
}

</script>

<style  scoped>
.send-button:hover {
    background: linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
    border-color: transparent;

}

.logout-button:hover {
    transform: translateX(3px);

}
</style>