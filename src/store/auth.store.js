import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const router = useRouter();
  const user = ref(null);
  const session = ref(null);

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    }
  }

  async function submitFormLogin(email, senha) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });
      if (data.user) {
        user.value = data;
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function submitFormRegister(nome, email, senha) {
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });
      if (!data) return;
      await saveUserOnBd({ uuid: data.user?.id, email: data.user.email,name:nome });
      router.push("/login");

    } catch (error) {
      console.log(error);
    }
  }

  async function saveUserOnBd({ uuid, email, name }) {
    try {
      const { data, error } = await supabase.from("usuarios").insert([
        {
          uuid,
          email,
          name
        },
      ]);
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAuthUser() {
    try {
      const { data } = await supabase.auth.getUser();
      console.log(data);
      user.value = data.user;
    } catch (err) {
      console.log(err);
    }
  }

  async function getAuthSession() {
    const { data, error } = await supabase.auth.getSession();
    if (!data) return;
    session.value = data.session;
  }



  return {
    user,
    session,
    submitFormLogin,
    saveUserOnBd,
    submitFormRegister,
    getAuthUser,
    getAuthSession,
    logout,
  };
});
