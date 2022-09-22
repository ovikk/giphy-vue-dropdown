<script lang="ts">
import { defineComponent, ref } from "vue";
import GifList from "./components/GifList.vue";
import { useClickOutside } from "./composable/useClickOutside";

export default defineComponent({
  name: "App",
  components: { GifList },
  setup() {
    const wrapper = ref(null);
    const showList = ref(false);
    useClickOutside(wrapper, () => {
      showList.value = false;
    });
    return {
      wrapper,
      showList,
    };
  },
  data() {
    return {
      gifs: [] as Object[],
      loading: false,
      offset: 0,
      inputString: "",
      timeout: 0,
      showSnackbar: false,
    };
  },
  methods: {
    onInput() {
      if (this.inputString.length > 0) {
        this.showList = true;
      } else {
        this.showList = false;
      }
      clearTimeout(this.timeout);
      this.offset = 0;
      this.timeout = setTimeout(() => this.search(), 300);
    },

    openSnackbar() {
      this.showSnackbar = true;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 1000);
    },

    search() {
      this.loading = true;

      const limit = Math.max(
        Math.floor((this.$refs.wrapper as any).clientWidth / 220) * 2,
        5
      );
      fetch(
        `https://api.giphy.com/v1/gifs/search?q=${this.inputString}&limit=${limit}&offset=${this.offset}&api_key=WxdyYLhMuub9clDtbglE0bJkSBExzePj`
      )
        .then((resp) => resp.json())
        .then((result) => {
          this.gifs = [...(this.offset !== 0 ? this.gifs : []), ...result.data];
          this.loading = false;
        });
    },
    loadMore() {
      if (!this.loading) {
        this.offset += 10;
        this.search();
      }
    },
    closeShowList() {
      this.showList = false;
    },
    onCopy() {
      this.closeShowList();
      this.openSnackbar();
    },
    onFocus() {
      if (this.inputString.length > 0) {
        this.showList = true;
      }
    },
  },
});
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <input
      class="input"
      placeholder="kek"
      v-model="inputString"
      @input="onInput"
      @focus="onFocus"
    />
    <GifList
      :gifs="gifs"
      :loading="loading"
      v-if="showList"
      @loadMore="loadMore"
      @copy="onCopy"
    />

    <span class="loader" v-if="loading"></span>

    <transition name="bounce">
      <div v-if="showSnackbar" class="snackbar">Gif Copied</div>
    </transition>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.input {
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  outline: 0;
  border: 1px solid black;
}

.wrapper {
  width: 100%;
  position: relative;
}

.loader {
  width: 30px;
  height: 30px;
  border: 5px solid blue;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  position: absolute;
  right: 15px;
  top: 6px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.snackbar {
  position: fixed;
  bottom: 50px;
  left: 50px;
  width: 100px;
  height: 50px;
  background-color: blue;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  transition: opacity 0.3s;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
