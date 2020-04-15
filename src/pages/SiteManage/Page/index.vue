<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">首页</router-link>
      </li>
      <li class="breadcrumb-item"><a href="javascript:;">网站管理</a></li>
      <li class="breadcrumb-item active">页面管理</li>
    </ol>
    <!-- end breadcrumb -->

    <!-- begin row -->
    <div class="">
      <!-- begin panel -->
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">页面管理</h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-2">
              <j-button type="add" @click="$bus.emit('create.show')"></j-button>
            </div>
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <div class="form-group width-100 m-r-10">
                <j-select :datas="options.enable"
                          title="状态"
                          v-model="search.enable"></j-select>
              </div>
              <div class="form-group m-r-10">
                <input type="text" class="form-control" placeholder="请输入名称" v-model="search.title">
              </div>
              <j-button type="search" @click="doSearch"></j-button>
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="table-responsive">
            <table class="table  table-striped table-box text-center">
              <thead>
              <tr>
                <th class="width-30">#</th>
                <th class="width-150">代码</th>
                <th>名称</th>
                <th class="width-100">状态</th>
                <th class="width-150">建立时间</th>
                <th class="width-70">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data, index) in datas" :key="index">
                <td>{{ startIndex + index }}</td>
                <td class="text-left">{{ data.code }}</td>
                <td class="text-left">{{ data.title }}</td>
                <td>
                  <i class="fas fa-lg fa-check-circle text-green" v-if="data.enable == Const.Y"></i>
                  <i class="fas fa-lg fa-times-circle text-danger" v-else></i>
                </td>
                <td>{{ data.created_at }}</td>
                <td class="text-center">
                  <j-button type="edit" :action="true" @click="$bus.emit('update.show', data)"></j-button>
                  <j-button type="delete" :action="true" @click="doDelete(data.id)"></j-button>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
          <!-- pagination -->
          <paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />
          <!-- end pagination -->
        </div>
      </div>
    </div>
    <create />
    <update />
  </div>
</template>

<script>
  import ListMixins from 'mixins/List'
  import EnableConstant from 'constants/Enable'

  export default {
    mixins: [ListMixins],
    components: {
      create: require('./modal/create').default,
      update: require('./modal/update').default,
    },
    data: () => ({
      search: {
        title: '',
        enable: '',
      },
      options: {
        enable: EnableConstant,
      },
    }),
    api: 'site.page',
    mounted()
    {
      this.doSearch()
    },
  }
</script>
