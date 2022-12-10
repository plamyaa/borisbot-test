<template>
  <Field />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Field from './components/Field.vue';
import Footer from './components/Footer.vue';
export default defineComponent({
  name: 'App',
  components: { Field, Footer },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
