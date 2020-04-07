<template>
  <div class="upload-box">
    <div class="custom-file" id="imgupload-box">
      <div>
        <label :for="id" class="custom-file-upload">
          {{ title }}
        </label>
        <input class="imgupload" type="file" :id="id" @change="onFileChange" />
      </div>
      <div class="img-show" v-if="mySrc">
        <i class="fas fa-times" v-if="!required" @click="onDelete"></i>
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
      required: {
        type: Boolean,
        default: false,
      },
      s3: {
        type: Boolean,
        default: true,
      },
      imageRequired: {
        type: String,
      },
      value: {
        type: Object,
      },
    },
    data: () => ({
      id: '',
      mySrc: '',
    }),
    watch: {
      src()
      {
        this.updateSrc()
      },
    },
    methods: {
      async onFileChange(e)
      {
        const file = e.target.files[0]
        this.mySrc = await this.$jaclib.readImage(file)
        this.$emit('upload', file)
        this.validate(this.value)
      },
      onDelete()
      {
        this.mySrc = ''
        this.$emit('delete')
        this.validate(this.value)
      },
      updateSrc()
      {
        this.mySrc = this.src
          ? this.s3
            ? this.$s3Host + this.src
            : this.src
          : ''
      },
    },
    mounted()
    {
      this.updateSrc()
      this.id = this.$jaclib.createID('imageUpload-')
    },
  }
</script>

<style lang="stylus" scoped>
  .close
    position relative
    left 5px
    top 5px

  .upload-box .img-show::before
    content ''
    width 0
    height 0
    background-color transparent

  .img-show
    width max-content

  .slider-upload-box .img-show
    width auto
</style>
