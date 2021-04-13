<template>
  <div :class="settings">
    <div class="title">Improved Managebac Settings</div>
    <div v-if="isLoading">
      <vue-loading
        type="bars"
        color="#000"
        :size="{ width: '50px', height: '50px' }"
      ></vue-loading>
    </div>
    <div v-else class="settings">
      <p-check v-model="dark_mode">Dark Mode</p-check>
      <p-check v-model="graph_mode">Use Improve Managebac Graph</p-check>
      <p-check v-model="url_change">Change Unit Url to All Tasks</p-check>
    </div>
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
import "vue-loading-overlay/dist/vue-loading.css";
import PrettyInput from "pretty-checkbox-vue/input";
import PrettyCheck from "pretty-checkbox-vue/check";

export default {
  name: "App",
  components: {
    "p-check": PrettyCheck,
    "p-input": PrettyInput,
    "vue-loading": VueLoading,
  },
  data: () => ({
    isLoading: true,
    fullPage: false,
    dark_mode: null,
    graph_mode: null,
    url_change: null,
    settings: "main",
    checkedPlacement: false, // default is one Boolean
  }),
  methods: {
    update(updatePages) {
      if (this.dark_mode) {
        this.settings = "main darkMode";
      } else {
        this.settings = "main lightMode";
      }
    },
  },
  watch: {
    async dark_mode() {
      this.isLoading = true;
      if (!isNaN(this.dark_mode)) {
        browser.storage.sync.set({ darkMode: this.dark_mode });
      }
      this.update();
      browser.runtime.sendMessage({ reloadPages: true });
      this.isLoading = false;
    },
    async graph_mode() {
      this.isLoading = true;
      if (!isNaN(this.graph_mode)) {
        browser.storage.sync.set({ graphMode: this.graph_mode });
      }
      this.update();
      browser.runtime.sendMessage({ reloadPages: true });
      this.isLoading = false;
    },
    async url_change() {
      this.isLoading = true;
      if (!isNaN(this.url_change)) {
        browser.storage.sync.set({ graphMode: this.url_change });
      }
      this.update();
      browser.runtime.sendMessage({ reloadPages: true });
      this.isLoading = false;
    },
  },
  created: async function () {
    let items = await browser.storage.sync.get({ darkMode: false, graphMode: true, changeURL: true });
    this.dark_mode = items.darkMode;
    this.graph_mode = items.graphMode;
    this.changeURL = items.changeURL;
    this.update();
    this.isLoading = false;
  },
};
</script>

<style lang="scss">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
html {
  width: 100%;
  height: 100%;
}
body {
  background-color: rgb(110, 110, 110);
}
.title {
  top: 10px;
  font-size: 30px;
  text-align: center;
  // height: 50px;
}
.settings {
  text-size-adjust: 5;
  position: absolute;
  top: 60px;
  left: 25%;
  font-size: 15px;
  // height: 150px;
}
.main {
  border-radius: 25px;
  position: absolute;
  left: 25%;
  width: 50%;
  height: 250px;
}
.darkMode {
  background-color: rgb(49, 49, 49);
  color: rgb(202, 202, 202);
}
.lightMode {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}
</style>
