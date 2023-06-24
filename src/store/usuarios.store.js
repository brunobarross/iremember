import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./auth.store";

export const useUsuariosStore = defineStore("usuariosStore", () => {
  const usuarios = ref(null);
  const usuarioLogado = ref(null);
  const {user} = storeToRefs(useAuthStore());

  async function getUsuarios() {
    const { data, error } = await supabase.from("usuarios").select("*");
    console.log(data, error);
  }

  async function getDataUserLogged() {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("uuid", user.value.id);
    if (data) {
      usuarioLogado.value = data[0];
    }
  }

  return {
    getUsuarios,
    usuarios,
    usuarioLogado,
    getDataUserLogged,
  };
});
