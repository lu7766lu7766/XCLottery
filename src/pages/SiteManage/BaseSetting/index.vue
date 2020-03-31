<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">首页</router-link>
      </li>
      <li class="breadcrumb-item"><a href="javascript:;">网站管理</a></li>
      <li class="breadcrumb-item active">基本设置</li>
    </ol>
    <!-- end breadcrumb -->

    <!-- begin row -->
    <div class="">
      <!-- begin panel -->
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">基本设置</h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <validation v-slot="{invalid}">
          <div class="panel-body">
            <alert />
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label required">网站名称</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="required|max:50">
                  <input type="text" class="form-control" v-model="data.title">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">网站 LOGO</label>
              <div class="col-md-6 col-lg-6 web-setting-uploadimg">
                <validate rules="image|img_width:260|img_height:260" v-slot="{ validate }">
                  <j-image alert="上传图片限制尺寸为 260X260"
                           :validate="validate"
                           :src.sync="data.logo_path"
                           v-model="data.logo"></j-image>
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label ">版权所有</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="max:50">
                  <input type="text" class="form-control" v-model="data.copyright">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">ICP备案编号</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="max:30">
                  <input type="text" class="form-control" v-model="data.icp">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">联系资讯</label>
              <div class="col-md-6 col-lg-6 contact-list" v-if="data.contact">
                <div class="contact-item">
                  <div class="title">线上客服</div>
                  <div class="input"><input type="text" class="form-control" v-model="data.contact.customer_service">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">QQ</div>
                  <div class="input"><input type="text" class="form-control" v-model="data.contact.qq">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">Wechat</div>
                  <div class="input"><input type="text" class="form-control" v-model="data.contact.we_chat">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">Telegram</div>
                  <div class="input"><input type="text" class="form-control" v-model="data.contact.telegram">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">Potato</div>
                  <div class="input"><input type="text" class="form-control" v-model="data.contact.potato">
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">QRCODE</label>
              <div class="col-md-6 col-lg-6 web-setting-uploadimg qrcode-box">
                <validate class="col-md-6" rules="image|img_width:150|img_height:150" v-slot="{ validate }">
                  <j-image alert="iOS 上传图片限制尺寸为 150X150"
                           :validate="validate"
                           v-model="data.ios_qr_code"
                           :src.sync="data.ios_qr_path"></j-image>
                </validate>
                <validate class="col-md-6" rules="image|img_width:150|img_height:150" v-slot="{ validate }">
                  <j-image alert="Android 上传图片限制尺寸为 150X150"
                           :validate="validate"
                           v-model="data.android_qr_code"
                           :src.sync="data.android_qr_path"></j-image>
                </validate>
              </div>
            </div>
            <div class="m-t-30">
              <button class="btn btn-primary width-70" :disabled="invalid" @click="doSubmit">储存</button>
            </div>
          </div>
        </validation>

      </div>
    </div>
  </div>
</template>

<script>
  import ApiMixins from 'mixins/ApiOption'

  export default {
    mixins: [ApiMixins],
    components: {
      JImage: require('@/Form/Image').default,
    },
    data: () => ({
      data: {},
    }),
    api: 'site.base',
    methods: {
      async getDetail()
      {
        const res = await this.$thisApi.getDetail()
        this.data = res.data
      },
      async doSubmit()
      {
        await this.$thisApi.doUpdate(this.data, { formData: true })
        this.$alert.success(`编辑成功`)
      },
    },
    created()
    {
      this.getDetail()
    },
  }
</script>

<style lang="stylus" scoped>
  .qrcode-box >>> .upload-box
    width 100%
</style>