import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar, Notify } from 'quasar';
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  name: 'NavBar',

  props: {
    activeLeft: {
      type: String,
      default: '348px',
    },
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const userStore = useUserStore();
    const isDarkModeActive = ref(false);

    function setDarkMode(val: boolean) {
      $q.dark.set(val);
    }

    function logout() {
      userStore.clearStore();
      router.push('/');
      Notify.create({
        progress: true,
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Você foi deslogado com sucesso. Até breve!',
      });
    }

    return {
      setDarkMode,
      isDarkModeActive,
      logout,
      userStore,
    };
  },
});
