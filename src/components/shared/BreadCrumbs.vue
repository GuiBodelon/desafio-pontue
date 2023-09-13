<template>
  <q-breadcrumbs>
    <template v-slot:separator>
      <q-icon size="1.5em" name="arrow_right" />
    </template>
    <q-breadcrumbs-el v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" :to="breadcrumb.link"
      :label="breadcrumb.name" :icon="breadcrumb.icon" />
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BreadCrumbs from 'src/interfaces/IBreadCrumbs';

export default defineComponent({
  name: 'BreadCrumbs',

  setup() {
    //const appStore = useAppStore();
    const route = useRoute();
    var breadcrumbList = ref<BreadCrumbs>();

    function getRoute() {
      breadcrumbList.value = route.meta.breadcrumb as {
        link: string;
        name: string;
        icon: string;
      };
    }

    watch(route, () => getRoute());

    onMounted(() => {
      getRoute();
    });

    return {
      getRoute,
      //isDarkActive: computed(() => appStore.isDarkActive),
      breadcrumbList,
    };
  },
});
</script>
