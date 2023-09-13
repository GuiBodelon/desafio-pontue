<template>
  <div>
    <q-table title="Redacoes" :rows="rows" :columns="columns" row-key="id" :filter="filterRedacoesTable"
      :loading="loadingRedacoesTable">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top>
        <div class="q-gutter-x-sm">
          <q-btn icon="refresh" @click="getRedacoes()" color="primary">
            <q-tooltip>Atualizar Tabela</q-tooltip>
          </q-btn>
          <q-btn icon="add" label="Adicionar Redação" color="secondary" @click="modalCreateRedacao = true"></q-btn>
        </div>
        <q-space />
        <q-input dense debounce="300" v-model="filterRedacoesTable" placeholder="Procurar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="numero" :props="props">
            {{ props.row.numero }}
          </q-td>
          <q-td key="created_at" :props="props">
            {{ props.row.created_at }}
          </q-td>
          <q-td key="acoes" class="flex justify-center">
            <div class="q-gutter-x-sm">
              <q-btn icon="visibility" color="primary" dense @click="visualizarRedacao(props.row.id)">
                <q-tooltip> Clique para Visualizar a Redação </q-tooltip>
              </q-btn>
              <q-btn icon="delete" color="negative" dense
                @click="modalDeleteRedacao = true; currentRedacaoId = props.row.id; currentRedacaoNumero = props.row.numero">
                <q-tooltip> Clique para Deletar a Redação </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
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

    <q-dialog v-model="modalCreateRedacao" persistent :maximized="maximizedToggle" transition-show="slide-up"
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

        <q-card-section>
          <div class="text-h3">Nova Redação</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="createRedacao(newRedacaoFiles)" class="q-pt-lg q-gutter-y-lg q-gutter-x-sm">
            <q-file filled bottom-slots v-model="newRedacaoFiles" label="Selecionar Arquivos" counter multiple dark
              use-chips accept=".jpg, .jpeg, .png, .pdf" lazy-rules :rules="[
                (val) => (val && val.length > 0) || 'Por favor, insira algum arquivo',
              ]">
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
            <q-btn label="Cancelar" color="negative" v-close-popup></q-btn>
            <q-btn color="positive" label="Confirmar" type="submit"></q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
