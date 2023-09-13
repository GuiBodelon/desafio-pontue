<template>
  <q-layout view="lHh Lpr lFf">
    <SideBar />

    <NavBar />

    <q-page-container>
      <div class="row q-pt-sm q-pb-xl q-px-xl">
        <div class="col-12">
          <BreadCrumbs class="q-py-lg" />
        </div>
        <div class="col-12">
          <router-view v-slot="{ Component }">
            <transition name="scale-app" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import NavBar from 'src/components/shared/NavBar/index.vue';
import BreadCrumbs from 'src/components/shared/BreadCrumbs.vue';
import SideBar from 'src/components/shared/SideBar/index.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';

export default defineComponent({
  name: 'AppLayout',

  components: {
    NavBar,
    BreadCrumbs,
    SideBar,
  },

  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    let routeName = ref();

    function getRoute() {
      routeName.value = route.name;
    }

    watch(route, () => getRoute());

    onMounted(() => {
      getRoute();
    });
    return {
      routeName,
      userStore
    };
  },
});
</script>
<style scoped>
/*ROUTER ANIMATED TRANSITION*/

.scale-app-enter-from,
.scale-app-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.profilePicture {
  object-fit: cover;
  object-position: center;
}

* {
  transition: all 0.3s ease;
}
</style>
