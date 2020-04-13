<template>
  <detail title="新增" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题</label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control" v-model="data.title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">图示 </label>
      <div class="col-md-10">
        <validate rules="img|img_width:image,370|img_height:image,165"
                  v-slot="{ validate }">
          <j-image alert="上传图片限制尺寸为370 × 165"
                   :validate="validate"
                   :value="data"
                   @upload="file => {data.image = file}"
                   @delete="() => {data.del_image = 1; data.image = null}"></j-image>
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">另开视窗</label>
      <div class="col-md-10">
        <switcher v-model="data.is_blank" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">链接</label>
      <div class="col-md-10">
        <validate rules="url">
          <input type="text" class="form-control" v-model="data.link" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.enable" />
      </div>
    </div>
  </detail>
</template>

<script>
  import DetailMixins from 'mixins/Detail'
  import EditorMixins from 'mixins/Editor'

  export default {
    mixins: [DetailMixins, EditorMixins],
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doCreate(data, { formData: true })
        this.createSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('create.show', data =>
      {
        this.data = {
          is_blank: this.Const.Y,
          enable: this.Const.Y,
        }
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('create.show')
    },
  }
</script>
