<template>
  <main class="page-login">
    <div class=" max-w-[400px] mx-auto w-full px-8 py-12">
      <h1 class="text-white font-bold text-2xl md:text-5xl -tracking-tighter text-center">IRemember</h1>
      <form @submit.prevent="handleSubmit" class="mt-8 md:mt-12">
        <div class="input-box">
          <input class="bg-white text-very-dark-grayish-blue" type="email" placeholder="Seu e-mail" v-model="email" />
        </div>
        <div class="input-box">
          <input class="bg-white text-very-dark-grayish-blue" type="password" placeholder="Sua senha" v-model="senha" />
        </div>
        <div class="btn-container">
        <p class="text-red-500 text-sm">{{errorText}}</p>
          <button class="btn w-full text-white-hover mt-2" type="submit">
          Login
        </button>
        </div>
   
      </form>
      <p class="mt-4 text-white">
        Não tem uma conta?
        <router-link to="/register" class="text-light-grayish-blue-hover">Cadastre-se</router-link>
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

const {errorText} = storeToRefs(useAuthStore())

function handleSubmit() {
  submitFormLogin(email.value, senha.value);
}





</script>

<style scoped lang="scss">
.page-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  input {
    padding: 0.75rem;
    border-radius: 4px;

    outline: none;

  }
}
</style>
