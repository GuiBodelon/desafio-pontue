import { ref, defineComponent } from 'vue';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
import { apiBackend } from 'src/boot/axios';

export default defineComponent({
  name: 'LoginForm',

  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const userStore = useUserStore();

    function onSubmitLogin() {
      //const meta = document.querySelector('meta[name="csrf-token"]');
      //csrfToken.value = meta ? meta.getAttribute('content') ?? '' : '';
      apiBackend
        .post('/auth/login', {
          email: email.value,
          password: password.value,
        })
        .then((response) => {
          if (response.statusText === 'OK') {
            userStore.updateWholeStore(
              response.data.aluno_id,
              response.data.access_token,
              response.data.token_type,
              response.data.expires_at
            );
            Notify.create({
              progress: true,
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Bem vindo ao sistema aluno - ID: ' + userStore.user.id,
            });
            router.push('/dashboard');
          } else {
            Notify.create({
              progress: true,
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: 'Error: ' + response,
            });
            console.log(response);
          }
        })
        .catch((error) => {
          Notify.create({
            progress: true,
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: 'Erro na Requisição: ' + error.response.data.message,
          });
          console.log(error.response);
        });
    }

    return {
      email,
      password,
      onSubmitLogin,
      isPwd: ref(true),
      rememberMe: ref(false),
    };
  },
});
