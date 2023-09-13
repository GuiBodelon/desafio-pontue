import { apiBackend } from 'src/boot/axios';
import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'RedacoesPage',

  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const alunoId = userStore.user.id;
    const token = userStore.user.access_token;
    const modalCreateRedacao = ref(false);
    const rows = ref([]);
    const columns = [
      {
        name: 'id',
        align: 'left',
        label: 'ID',
        field: 'id',
        sortable: true,
      },
      {
        name: 'numero',
        align: 'left',
        label: 'Número',
        field: 'numero',
        sortable: true,
      },
      {
        name: 'created_at',
        align: 'left',
        label: 'Criado Em',
        field: 'created_at',
        sortable: true,
      },
      {
        name: 'acoes',
        align: 'center',
        label: 'Ações',
        field: 'acoes',
        sortable: false,
      },
    ];
    const loadingRedacoesTable = ref(false);

    function getRedacoes() {
      loadingRedacoesTable.value = true;
      apiBackend
        .get('/index/aluno/' + alunoId, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          if (response.data) {
            rows.value = response.data.data;
            loadingRedacoesTable.value = false;
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
            getRedacoes();
            Notify.create({
              progress: true,
              color: 'positive',
              textColor: 'white',
              position: 'bottom',
              message: 'Redação excluída com sucesso!',
              icon: 'check_circle',
            });
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

    function createRedacao(newRedacaoFiles: File[] | null) {
      if (newRedacaoFiles && newRedacaoFiles.length > 0) {
        const formData = new FormData();
        newRedacaoFiles.forEach((file, index) => {
          formData.append(`file[${index}]`, file);
        });

        apiBackend
          .post('/alunos/redacao/create', formData, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data) {
              getRedacoes();
              Notify.create({
                progress: true,
                color: 'positive',
                textColor: 'white',
                position: 'bottom',
                message:
                  'Nova redação criada com sucesso com o ID: ' +
                  response.data.data.id,
                icon: 'check_circle',
              });
              modalCreateRedacao.value = false;
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
    }

    function visualizarRedacao(id: string) {
      router.push('/redacoes/' + id);
    }

    onMounted(() => {
      getRedacoes();
    });

    return {
      rows,
      columns,
      loadingRedacoesTable,
      filterRedacoesTable: ref(''),
      getRedacoes,
      createRedacao,
      deleteRedacao,
      visualizarRedacao,
      modalDeleteRedacao: ref(false),
      modalCreateRedacao,
      maximizedToggle: ref(true),
      currentRedacaoId: ref(''),
      currentRedacaoNumero: ref(''),
      newRedacaoFiles: ref(null),
    };
  },
});
