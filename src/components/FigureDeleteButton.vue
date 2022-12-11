<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    @click="deleteObject"
    cursor="pointer"
  >
    <line
      :x1="newX(2)"
      :y1="newY(-2)"
      :x2="newX(-6)"
      :y2="newY(6)"
      stroke="red"
      stroke-width="2"
    />
    <line
      :x1="newX(-6)"
      :y1="newY(-2)"
      :x2="newX(2)"
      :y2="newY(6)"
      stroke="red"
      stroke-width="2"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'FigureDeleteButton',
  props: {
    x: Number,
    y: Number,
    id: Number,
  },
  methods: {
    ...mapMutations(['deleteFigure', 'deleteConnectorsGroup', 'deleteLines']),
    deleteObject() {
      const id = this.id;
      this.deleteFigure(id);
      this.deleteConnectorsGroup(id);
      this.deleteLines(id);
    },
    newX(num: number) {
      const x = this.x;
      return x ? x + num : x;
    },
    newY(num: number) {
      const y = this.y;
      return y ? y + num : y;
    },
  },
});
</script>

<style scoped></style>
