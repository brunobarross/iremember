<template>
    <div >
        <TheHeader/>
        <TodoVue/>
    </div>
    <Loading v-if="isLoading"/>
</template>

<script setup>
import { onMounted, provide } from 'vue';
import { useAuthStore } from "../store/auth.store";
import { storeToRefs } from "pinia";
import { useUsuariosStore } from "../store/usuarios.store";
import { useTodoStore } from '../store/todo.store';
import TheHeader from '../components/TheHeader.vue';
import TodoVue from '../components/Todo.vue';
import Loading from '../components/Loading.vue';

const { getAuthUser, getAuthSession } = useAuthStore();
const { getDataUserLogged } = useUsuariosStore();
const { usuarioLogado } = storeToRefs(useUsuariosStore());
const { user, } = storeToRefs(useAuthStore());
const {getTodos } = useTodoStore()

const {isLoading} = storeToRefs(useTodoStore());


provide("user", user);
provide("usuarioLogado", usuarioLogado);

onMounted(async () => {
  await getAuthUser();
  await getAuthSession();
  await getDataUserLogged();
  await getTodos(usuarioLogado.value?.id);


});


</script>

<style scoped>

</style>