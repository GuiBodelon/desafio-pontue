<template>
  <q-drawer v-model="isSideBarOpen" show-if-above :width="250" :breakpoint="500">
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item clickable v-ripple to="/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section>
            Dashboard
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/redacoes">
          <q-item-section avatar>
            <q-icon name="rate_review" />
          </q-item-section>

          <q-item-section>
            Redações
          </q-item-section>
        </q-item>

        <q-separator />
        <q-item clickable v-ripple @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            Deslogar
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img class="absolute-top"
      src="https://static.vecteezy.com/system/resources/previews/006/868/934/non_2x/abstract-purple-fluid-wave-background-free-vector.jpg"
      style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
        <div class="text-weight-bold">Nome</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script lang="ts" src="./index.ts" />
