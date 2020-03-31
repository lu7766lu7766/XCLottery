<template>
  <div class="upload-box">
    <div class="custom-file" id="imgupload-box">
      <div>
        <label :for="id" class="custom-file-upload">
          {{ title }}
        </label>
        <input class="imgupload" type="file" :id="id" @change="myValidate" />
      </div>
      <div class="img-show" v-if="src">
        <img alt="" class="OpenImgUpload" :src="src">
      </div>
    </div>
    <div class="text-red" v-if="alert">
      {{ alert }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '选择档案',
      },
      alert: {
        type: String,
        default: '',
      },
      validate: {
        type: Function,
        default: () => {},
      },
    },
    data: () => ({
      id: '',
      src: '',
    }),
    methods: {
      async myValidate(e)
      {
        return (await this.validate(e)).valid && this.onFileChange(e)
      },
      async onFileChange(e)
      {
        this.src = await this.$jaclib.readImage(e.target.files[0])
        this.$emit('input', e.target.files[0])
      },
    },
    mounted()
    {
      this.id = this.$jaclib.createID('imageUpload-')
    },
  }
</script>
