import { defineComponent, ref, onMounted } from 'vue';
import { apiBackend } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { useRoute, useRouter } from 'vue-router';
import { Notify } from 'quasar';
import IRedacaoURLs from 'src/interfaces/IRedacaoURLs';
import RedacaoURL from 'src/interfaces/IRedacaoURLs';

export default defineComponent({
  name: 'VisualizarRedacaoPage',

  methods: {
    endsWithPdf(url: string) {
      return !url.endsWith('.pdf');
    },
    removeURL(index: number) {
      this.currentRedacaoURLs.splice(index, 1);
    },
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const token = userStore.user.access_token;
    const redacaoId = ref(route.params.id);
    const redacoes = ref();
    const urls = ref();

    function getRedacao() {
      apiBackend
        .get('/redacao/' + redacaoId.value, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          if (response.data) {
            redacoes.value = response.data;
            urls.value = response.data.data.urls;
          }
        })
        .catch((error) => {
          Notify.create({
            progress: true,
            color: 'yellow-8',
            textColor: 'dark',
            position: 'bottom',
            message: error.message,
            icon: 'warning',
          });
        });
    }

    function deleteRedacao(redacaoId: string) {
      apiBackend
        .delete('/redacao/' + redacaoId + '/delete', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          if (response.data) {
            Notify.create({
              progress: true,
              color: 'positive',
              textColor: 'white',
              position: 'bottom',
              message: 'Redação excluída com sucesso!',
              icon: 'check_circle',
            });
            router.push('/redacoes');
          }
        })
        .catch((error) => {
          Notify.create({
            progress: true,
            color: 'yellow-8',
            textColor: 'dark',
            position: 'bottom',
            message: error.message,
            icon: 'warning',
          });
        });
    }

    function updateRedacao(
      redacaoId: string,
      newRedacaoFiles: File[] | null,
      currentRedacaoURLs: RedacaoURL[]
    ) {
      if (
        (newRedacaoFiles && newRedacaoFiles.length > 0) ||
        currentRedacaoURLs
      ) {
        const formData = new FormData();
        const urlIds = currentRedacaoURLs.map((url) => url.id);
        //formData.append('urls', JSON.stringify(urlIds));
        formData.append('urls', []);

        if (newRedacaoFiles) {
          newRedacaoFiles.forEach((file, index) => {
            formData.append(`file[${index}]`, file);
          });
        }
        apiBackend
          .post('/redacao/' + redacaoId + '/update', formData, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data) {
              Notify.create({
                progress: true,
                color: 'positive',
                textColor: 'white',
                position: 'bottom',
                message: 'Redação atualizada com sucesso!',
                icon: 'check_circle',
              });
              router.push('/redacoes');
            }
          })
          .catch((error) => {
            console.log(error);
            Notify.create({
              progress: true,
              color: 'yellow-8',
              textColor: 'dark',
              position: 'bottom',
              message: error.message,
              icon: 'warning',
            });
          });
      }
    }

    onMounted(() => {
      getRedacao();
    });

    const currentRedacaoURLs: IRedacaoURLs[] = [
      {
        id: '',
        redacao_id: '',
        correcao_id: '',
        url: '',
        anotacoes: '',
        comentarios: '',
      },
    ];

    return {
      urls,
      redacoes,
      getRedacao,
      deleteRedacao,
      updateRedacao,
      newRedacaoFiles: ref(null),
      modalDeleteRedacao: ref(false),
      modalAtualizarRedacao: ref(false),
      maximizedToggle: ref(true),
      currentRedacaoId: ref(''),
      currentRedacaoNumero: ref(''),
      currentRedacaoURLs,
    };
  },
});
