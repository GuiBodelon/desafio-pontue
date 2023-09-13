import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'SideBar',

  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    function logout() {
      userStore.clearStore();
      router.push('/');
      Notify.create({
        progress: true,
        color: 'positive',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Você foi deslogado com sucesso!',
      });
    }
    return {
      logout,
      isSideBarOpen: ref(true),
    };
  },
});
