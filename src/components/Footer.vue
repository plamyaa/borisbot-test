<template>
  <footer class="footer">
    <button @click="$store.commit('addFigure')">add</button>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'AppFooter',
  mutations: {
    ...mapMutations({
      addSqaure: 'addFigure',
    }),
  },
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 15px;
  max-width: 900px;
  width: 100%;
  height: 80px;
  border: 2px solid #222222;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.277);
  padding: 5px;
}
</style>
