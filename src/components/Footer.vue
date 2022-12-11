<template>
  <footer class="footer">
    <button class="footer__add-button" @click="handleAdd">add</button>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'AppFooter',
  methods: {
    ...mapMutations({
      addFigure: 'addFigure',
      addConnectors: 'addConnectorsGroup',
    }),
    handleAdd() {
      this.addFigure();
      const { width, height, coords } = this.lastFigure;
      this.addConnectors({
        width: width,
        height: height,
        figurePosition: coords,
      });
    },
  },
  computed: {
    ...mapGetters({ lastFigure: 'getLastFigure' }),
  },
});
</script>

<style scoped>
.footer {
  background: #ffffff;
  position: fixed;
  bottom: 15px;
  max-width: 400px;
  width: 100%;
  height: 80px;
  border: 2px solid #222222;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.277);
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer__add-button {
  width: 40px;
  height: 40px;
  background-color: #57fe4b;
  border-radius: 5px;
  border: 2px solid black;
  transition: 0.3s;
  cursor: pointer;
}
.footer__add-button:hover {
  transform: scale(1.1);
  background-color: #37fd28;
}
</style>
