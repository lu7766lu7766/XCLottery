<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select :datas="options.type" valueKey="id" v-model="data.type_id" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题</label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control" v-model="data.title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">图示 </label>
      <div class="col-md-10">
        <validate rules="image|img_width:image,1170|img_height:image,325|image_required:image_path,image"
                  v-slot="{ validate }">
          <j-image alert="上传图片限制尺寸为1170 × 325"
                   :validate="validate"
                   :src="data.image_path"
                   required
                   :value="data"
                   @upload="file => {data.image = file}"></j-image>
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">另开视窗</label>
      <div class="col-md-10 switcher-box">
        <switcher v-model="data.is_blank" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">链接</label>
      <div class="col-md-10">
        <input type="text" class="form-control" v-model="data.url">
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>
  </detail>
</template>

<script>
  import DetailMixins from 'mixins/Detail'

  export default {
    mixins: [DetailMixins],
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
          status: this.Const.Y,
        }
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>
