<template>
  <main class="page-register">
    <div class="max-w-[400px] mx-auto w-full px-8 py-12">
      <h1
        class="text-white font-bold text-2xl md:text-5xl -tracking-tighter text-center"
      >
        IRemember
      </h1>
      <p class="text-white text-sm -tracking-tighter text-center mt-2">Cadastre-se para criar sua lista de tarefas!</p>
      <form @submit.prevent="handleSubmit" class="mt-8 md:mt-8">
        <div class="input-box">
          <input
            class="bg-white text-very-dark-grayish-blue"
            type="text"
            placeholder="Seu nome"
            v-model="nome"
          />
        </div>
        <div class="input-box">
          <input
            class="bg-white text-very-dark-grayish-blue"
            type="email"
            placeholder="Seu e-mail"
            v-model="email"
          />
        </div>
        <div class="input-box">
          <input
            class="bg-white text-very-dark-grayish-blue"
            type="password"
            placeholder="Sua senha"
            v-model="senha"
          />
        </div>
        <div class="btn-container">
          <p class="text-red-500 text-sm">{{ errorText }}</p>
          <button class="btn w-full text-white mt-2" type="submit">Cadastrar</button>
        </div>
      </form>
      <p class="mt-4 text-white">
        Já tem uma conta?
        <router-link to="/login" class="text-light-grayish-blue-hover"
          >Entrar</router-link
        >
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
const {errorText} = storeToRefs(useAuthStore())

function handleSubmit() {
  submitFormRegister(nome.value, email.value, senha.value);
}
</script>

<style scoped lang="scss">
.page-register {
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
    border: 1px solid #eee;
    outline: none;
    color: #333;
  }
}
</style>
