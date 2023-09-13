<template>
  <q-header reveal elevated class="bg-primary text-white flex items-center"
    style="height: 65px; margin: 10px 10px 0 10px; border-radius: 5px">
    <q-toolbar>
      <q-toolbar-title>
        Bem vindo - {{ userStore.user.id }}!
      </q-toolbar-title>

      <q-toggle v-model="isDarkModeActive" checked-icon="dark_mode" color="secondary" unchecked-icon="light_mode"
        @update:model-value="setDarkMode(isDarkModeActive)">
        <q-tooltip>{{ isDarkModeActive ? 'Light Mode' : 'Dark Mode' }}</q-tooltip>
      </q-toggle>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" src="./index.ts" />
