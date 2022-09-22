<script lang="ts">
import { defineComponent } from "vue";

const isVideoPlayble = () => {
  let canPlay = false;
  var v = document.createElement("video");
  if (v.canPlayType && v.canPlayType("video/mp4").replace(/no/, "")) {
    canPlay = true;
  }

  return canPlay;
};

export default defineComponent({
  name: "GifCard",
  data() {
    return {
      isVideoPlayble: isVideoPlayble(),
    };
  },
  props: {
    gif: {
      type: null,
    },
  },
  methods: {
    onClick() {
      const el = document.createElement("textarea");
      el.value = this.gif.images.original.url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      this.$emit("copy");
    },
  },
});
</script>

<template>
  <div class="cardWrapper" @click="onClick">
    <video
      autoplay
      loop
      muted
      playsinline
      :src="gif.images.fixed_width.mp4"
      class="gif-video"
      v-if="isVideoPlayble"
    ></video>

    <div
      :style="`background-image: url(${gif.images.fixed_width.url})`"
      class="gif-card"
      v-else
    ></div>
  </div>
</template>

<style scoped>
.cardWrapper {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gif-card {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}

.gif-card:hover {
  transform: scale(1.1);
}

.gif-video:hover {
  transform: scale(1.1);
}
</style>
