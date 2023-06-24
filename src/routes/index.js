import { createRouter, createWebHistory } from 'vue-router'
import PageLogin from "../pages/PageLogin.vue";
import PageHome from "../pages/PageHome.vue";
import PageRegister from "../pages/PageRegister.vue";
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';


const routes = [
  { path: "/login", component: PageLogin },
  { path: "/register", component: PageRegister },
  { path: "/", component: PageHome },
];

const router  = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});


router.beforeEach(async (to, prev, next)=>{
  const auth = useAuthStore();
  await auth.getAuthSession();

  const publicPages = ['/login', '/register'];
  const paginasObrigatorias = !publicPages.includes(to.path)
  const haveRefresh = auth.session?.refresh_token
  const haveToken = auth.session?.access_token
  if (paginasObrigatorias && !haveRefresh && !haveToken) {
    next({ path: '/login' })
  } else if (to.fullPath === '/login' && haveRefresh) {
    next({ path: '/' })
  } else {
    next()
  }

})

export default router;
