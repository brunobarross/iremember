<template>
  <main class="page-login">
    <div class=" max-w-[400px] mx-auto w-full px-8 py-12">
      <h1 class="dark:text-light-grayish-blue font-bold text-2xl md:text-5xl -tracking-tighter text-center">IRemember</h1>
      <form @submit.prevent="handleSubmit" class="mt-8 md:mt-16">
        <div class="input-box">
          <input class="dark:bg-light-grayish-blue-hover dark:text-very-dark-grayish-blue" type="email" placeholder="Seu e-mail" v-model="email" />
        </div>
        <div class="input-box">
          <input class="dark:bg-light-grayish-blue-hover dark:text-very-dark-grayish-blue" type="password" placeholder="Sua senha" v-model="senha" />
        </div>
        <button class="btn w-full dark:text-light-grayish-blue-hover" type="submit">
          Login
        </button>
      </form>
      <p class="mt-4 dark:text-light-grayish-blue">
        Não tem uma conta?
        <router-link to="/register" class="dark:text-light-grayish-blue-hover">Cadastre-se</router-link>
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/auth.store";


const email = ref("");
const senha = ref("");

const { submitFormLogin } = useAuthStore();

function handleSubmit() {
  submitFormLogin(email.value, senha.value);
}





</script>

<style scoped lang="scss">
.page-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 64px);
}

.input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  input {
    padding: 0.75rem;
    border-radius: 4px;

    outline: none;

  }
}
</style>
