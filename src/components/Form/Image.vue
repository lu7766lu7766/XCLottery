<template>
  <div class="upload-box">
    <div class="custom-file" id="imgupload-box">
      <div>
        <label :for="id" class="custom-file-upload">
          {{ title }}
        </label>
        <input class="imgupload" type="file" :id="id" @change="myValidate" />
      </div>
      <div class="img-show" v-if="mySrc">
        <i class="fas fa-times" v-if="mySrc && showDelete" @click="onDelete"></i>
        <img alt="" class="OpenImgUpload" :src="mySrc">
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
        default: () => ({ valid: true }),
      },
      src: {
        type: String,
        default: '',
      },
      s3: {
        type: Boolean,
        default: true,
      },
      showDelete: {
        type: Boolean,
        default: true,
      },
    },
    data: () => ({
      id: '',
      mySrc: '',
    }),
    watch: {
      src()
      {
        this.mySrc = this.src
          ? this.s3
            ? this.$s3Host + this.src
            : this.src
          : ''
      },
    },
    methods: {
      async myValidate(e)
      {
        const res = await this.validate(e)
        return res.valid && this.onFileChange(e)
      },
      async onFileChange(e)
      {
        const file = e.target.files[0]
        this.mySrc = await this.$jaclib.readImage(file)
        this.$emit('upload', file)
      },
      onDelete()
      {
        this.mySrc = ''
        this.$emit('delete')
      },
    },
    mounted()
    {
      this.id = this.$jaclib.createID('imageUpload-')
    },
  }
</script>

<style lang="stylus" scoped>
  .close
    position relative
    left 5px
    top 5px
</style>
