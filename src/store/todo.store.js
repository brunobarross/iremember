//pinia example composition api
import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./auth.store";
import { useUsuariosStore } from "./usuarios.store";
import { supabase } from "../lib/supabaseClient";

export const useTodoStore = defineStore("todo", () => {
  const todoList = ref([]);
  const isLoading = ref(false);

  const getTodos = async (idUserActual) => {
    try {
      isLoading.value = true;
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("id_usuario", idUserActual);
      console.log(data, error);

      if (error) return console.log(error);

      await setTodos(data);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  async function setTodos(data) {
    todoList.value = data;
  }

  const createTodo = async (text, id) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ text, done: false, id_usuario: id }]);
      if (error) return console.log(error);
      await getTodos(id);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id, idUserActual) => {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    if (error) return console.log(error);
    await getTodos(idUserActual);
  };

  const removerCompleted = async (idUserActual) => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("done", true)
      .eq("id_usuario", idUserActual);
    if (error) return console.log(error);
    await getTodos(idUserActual);
  };

  const markTodoAsDone = async (id, idUserActual) => {
    const todoToUpdate = todoList.value.find((todo) => todo.id === id);

    if (!todoToUpdate) return;
    const newDoneState = !todoToUpdate.done;

    const { data, error } = await supabase
      .from("todos")
      .update({ done: newDoneState })
      .eq("id", id);

    if (error) return console.log(error);

    await getTodos(idUserActual);
  };

  return {
    getTodos,
    todoList,
    createTodo,
    removeTodo,
    markTodoAsDone,
    removerCompleted,
    isLoading
  };
});
