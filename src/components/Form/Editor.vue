<template>
  <v-editor v-model="data"
            useCustomImageHandler
            @image-added="(f, e, c, r) => $emit('image-added', f, e, c, r)"></v-editor>
</template>

<script>
  export default {
    props: ['value'],
    components: {
      vEditor: require('vue2-editor').VueEditor,
    },
    data: () => ({
      data: '',
    }),
    watch: {
      value()
      {
        this.data = this.value
      },
      data()
      {
        this.$emit('input', this.data)
      },
    },
    methods: {
      insertURL(Editor, cursorLocation, resetUploader, url)
      {
        Editor.insertEmbed(cursorLocation, 'image', url)
        resetUploader()
      },
    },
    mounted()
    {
      this.data = this.value
    },
  }
</script>
