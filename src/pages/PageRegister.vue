<template>
  <main class="page-register">
    <div class=" max-w-[400px] mx-auto w-full px-8 py-12">
      <h1 class="dark:text-light-grayish-blue font-bold text-2xl md:text-5xl -tracking-tighter text-center">IRemember</h1>
      <form @submit.prevent="handleSubmit" class="mt-8 md:mt-16">
        <div class="input-box">
          <input class="dark:bg-light-grayish-blue-hover dark:text-very-dark-grayish-blue" type="text" placeholder="Seu nome" v-model="nome" />

        </div>
        <div class="input-box">
          <input class="dark:bg-light-grayish-blue-hover dark:text-very-dark-grayish-blue" type="email" placeholder="Seu e-mail" v-model="email" />

        </div>
        <div class="input-box">
          <input type="password" placeholder="Sua senha" v-model="senha" />
        </div>
        <button class="btn w-full text-white" type="submit">
          Cadastrar
        </button>
      </form>
      <p class="mt-4 dark:text-light-grayish-blue">
        Já tem uma conta?
        <router-link to="/login" class="dark:text-light-grayish-blue-hover">Entrar</router-link>
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/auth.store";

const nome = ref("");
const email = ref("");
const senha = ref("");

const { submitFormRegister } = useAuthStore();

function handleSubmit() {
  submitFormRegister(nome.value, email.value, senha.value);
}
</script>


<style scoped lang="scss">
.page-register {
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
    border: 1px solid #eee;
    outline: none;
    color: #333;

  }
}
</style>
