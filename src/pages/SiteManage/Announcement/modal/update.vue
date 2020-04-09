<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题</label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control" v-model="data.title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">封面 </label>
      <div class="col-md-10">
        <validate rules="img|img_width:cover,263|img_height:cover,300"
                  v-slot="{ validate }">
          <j-image alert="上传图片限制尺寸为263 × 300"
                   :validate="validate"
                   :src="data.cover_path"
                   :value="data"
                   @upload="file => {data.cover = file}"
                   @delete="() => {data.remove_cover = 1; data.cover = null}"></j-image>
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">内容</label>
      <div class="col-md-10 switcher-box">
        <validate rules="required">
          <j-editor v-model="data.contents"
                    @image-added="(f, e, c, r) => doUploadPic(f, e, c, r, 'editor_image_ids')" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">跑马灯</label>
      <div class="col-md-10 switcher-box">
        <switcher v-model="data.is_marquee" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">置顶</label>
      <div class="col-md-10 switcher-box">
        <switcher v-model="data.is_top" />
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
  import EditorMixins from 'mixins/Editor'

  export default {
    mixins: [DetailMixins, EditorMixins],
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doUpdate(data, { formData: true })
        this.updateSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('update.show', data =>
      {
        this.data = {
          ...data,
          cover_path: data.cover,
          editor_image_ids: _.map(data.editor_files, 'id'),
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
