<script lang="ts">
import { defineComponent, type PropType } from "vue";
import GifCard from "./GifCard.vue";

export default defineComponent({
  name: "GifList",
  methods: {
    onScroll(e: any) {
      const clientHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;

      if (scrollTop + clientHeight >= scrollHeight) {
        this.$emit("loadMore");
      }
    },

    onCopy() {
      this.$emit("copy");
    },
  },
  props: {
    gifs: {
      type: Array as PropType<Array<any>>,
    },
  },
  components: { GifCard },
});
</script>

<template>
  <div class="listWrapper" @scroll="onScroll">
    <div class="gifList">
      <GifCard v-for="gif in gifs" :key="gif.id" :gif="gif" @copy="onCopy" />
    </div>
  </div>
</template>

<style scoped>
.gifList {
  display: grid; /* 1 */
  grid-template-columns: repeat(auto-fill, 200px); /* 2 */
  grid-gap: 1rem; /* 3 */
  justify-content: space-between; /* 4 */
  height: 100%;
}

.listWrapper {
  border: 1px solid black;
  border-radius: 5px;
  position: absolute;
  width: 100%;
  height: 380px;
  top: 50px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
}
</style>
