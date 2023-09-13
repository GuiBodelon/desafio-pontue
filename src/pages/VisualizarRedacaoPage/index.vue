<template>
  <div class="q-gutter-md">
    <q-btn label="Voltar" color="primary" icon="arrow_back" to="/redacoes"></q-btn>
    <div v-for="redacao in redacoes" :key="redacao.id">
      <h5>Visualizando redação número: <b>{{ redacao.numero }}</b></h5>
      <h5>Escrita por: <b>{{ redacao.aluno.nome_completo }}</b></h5>
      <div class="row q-gutter-x-md">
        <div v-for="url in redacao.urls" :key="url.id" class="q-mt-lg">
          <iframe v-if="url.url.endsWith('.pdf')" :src="url.url" class="pdf-iframe borderImg"></iframe>
          <q-img v-else :src="url.url" spinner-color="primary" style="width: 300px;" class="borderImg"></q-img>
          <!--<div class="row">
              <div class="col-6">
                <h5>Anotações</h5>
                <q-input v-model="text" filled type="textarea" :value="redacao.anotacoes" />
              </div>
              <div class="col-6">
                <h5>Comentários</h5>
                <q-input v-model="text" filled type="textarea" :value="redacao.comentarios" />
              </div>
            </div>-->
        </div>
      </div>
      <div class="q-gutter-x-sm q-mt-sm">
        <q-btn icon="edit" label="Atualizar Redação" color="primary"
          @click="modalAtualizarRedacao = true; currentRedacaoId = redacao.id; currentRedacaoNumero = redacao.numero; currentRedacaoURLs = redacao.urls">
          <q-tooltip> Clique para Atualizar a Redação </q-tooltip>
        </q-btn>
        <q-btn icon="delete" label="Deletar Redação" color="negative"
          @click="modalDeleteRedacao = true; currentRedacaoId = redacao.id; currentRedacaoNumero = redacao.numero">
          <q-tooltip> Clique para Deletar a Redação </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="modalDeleteRedacao">
      <q-card style="width: 300px">
        <q-card-section>
          <div>Tem certeza que deseja deletar a redação de número: <b>{{ currentRedacaoNumero }}</b></div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat color="negative" label="Cancelar" v-close-popup />
          <q-btn flat color="positive" label="Sim" v-close-popup @click="deleteRedacao(currentRedacaoId)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalAtualizarRedacao" persistent :maximized="maximizedToggle" transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form @submit.prevent="updateRedacao(currentRedacaoId, newRedacaoFiles, currentRedacaoURLs)">
          <q-card-section>
            <div class="text-h3 q-mb-md">Atualizando redação número: <b>{{ currentRedacaoNumero }}</b></div>
            <div class="row items-start q-gutter-md">
              <div v-for="(url, index) in currentRedacaoURLs" :key="url.id">
                <div class="column q-gutter-y-sm items-start">
                  <div><b>ID:</b> {{ url.id }}</div>
                  <iframe v-if="url.url.endsWith('.pdf')" :src="url.url" class="borderImg"></iframe>
                  <q-img v-else :src="url.url" spinner-color="primary" style="width: 300px" class="borderImg"></q-img>
                  <q-btn label="Remover" color="negative" @click="removeURL(index)"></q-btn>
                </div>
              </div>
            </div>
            <q-separator class="q-my-lg" />
            <div class="text-h4 q-mb-md">Novos arquivos:</div>

            <q-file filled bottom-slots v-model="newRedacaoFiles" label="Selecionar Arquivos" counter multiple dark
              use-chips lazy-rules :rules="[
                (val) => (val && val.length > 0) || 'Por favor, insira algum arquivo',
              ]" accept=".jpg, .jpeg, .png, .pdf">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click.stop.prevent="newRedacaoFiles = null" class="cursor-pointer" />
              </template>
              <template v-slot:hint>
                Arquivos permitidos: jpg, png ou pdf
              </template>
            </q-file>
          </q-card-section>
          <q-card-section class="row full-width justify-end q-gutter-x-sm q-gutter-y-lg q-pt-lg">
            <q-btn label="Cancelar" color="negative" v-close-popup @click="getRedacao"></q-btn>
            <q-btn color="positive" label="Confirmar" type="submit"></q-btn>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped lang="scss">
h5 {
  margin: 0;
}

.borderImg {
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
}

.pdf-iframe {
  width: 100%;
  height: 60vh;
}
</style>
