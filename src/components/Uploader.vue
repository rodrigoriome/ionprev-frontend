<template>
  <div :class="{ uploader: true, 'has-file': file }">
    <form enctype="multipart/form-data" class="uploader-wrapper" @submit.prevent="sendFile">
      <input type="file" name="file" @change="setFile" />
      <div>
        <v-icon>mdi-upload</v-icon>
        <span>{{ filename }}</span>
      </div>
      <v-btn
        dark
        text
        type="submit"
        :class="{ 'uploader-button': true, indigo: file, 'd-none': !file }"
        :disabled="!file"
      >
        UPLOAD
      </v-btn>
    </form>
    <v-snackbar v-model="snackbar.visible" :timeout="2000" :right="true" :color="snackbar.error ? 'error' : 'success'">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "../services/api";

export default {
  data() {
    return {
      file: null,
      snackbar: {
        visible: false,
        message: null,
        error: false
      }
    };
  },
  computed: {
    ...mapState(["usage", "users"]),
    filename() {
      return this.file ? this.file.name : "Drag files here or click to browse";
    }
  },
  methods: {
    setFile(event) {
      this.file = event.target.files[0];
    },
    async sendFile() {
      if (this.file !== null) {
        const formData = new FormData();
        formData.append("file", this.file);
        this.$store.commit("SET_LOADING", true);

        // Timeout for simulation purposes only.
        await setTimeout(() => {
          api
            .post("/usage/upload", formData)
            .then(response => {
              this.$store.commit("SET_USAGE", response.data);
            })
            .then(() => {
              this.snackbar.error = false;
              this.snackbar.message = "Successfully uploaded data";
            })
            .catch(err => {
              this.snackbar.error = true;
              this.snackbar.message = err.response.data;
            })
            .finally(() => {
              this.$store.commit("SET_LOADING", false);
              this.snackbar.visible = true;
            });
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/main";

::-webkit-file-upload-button {
  cursor: pointer;
}

.uploader {
  &.has-file {
    .uploader-wrapper {
      border-color: #304ffe;
      background-color: #e8eaf6;
      color: #304ffe;
    }
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-width: 2px;
    border-style: dashed;
    border-color: #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    transition: border-color 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out;

    &:hover {
      border-color: #bdbdbd;
      background-color: #eeeeee;
    }
  }

  &-button {
    z-index: 10;
  }

  input[type="file"] {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
