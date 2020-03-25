<template>
  <div id="page-container" class="fade page-sidebar-fixed page-header-fixed show"
       :class="{'page-sidebar-minified': !isShowMenu}">
    <!-- begin #header -->
    <div id="header" class="header navbar-default">
      <!-- begin navbar-header -->
      <div class="navbar-header">
        <router-link :to="{
  							name: 'welcome'
  						}" class="navbar-brand">
          <span class="navbar-logo"></span> <b>GIN</b>
        </router-link>
        <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- end navbar-header -->

      <!-- begin header-nav -->
      <ul class="navbar-nav navbar-right">
        <li class="dropdown navbar-user">
          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">

            <img v-if="account.cover" :src="account.cover.path" />
            <img v-else src="/resource/assets/img/user/user-13.jpg" alt="" />

            <span class="d-none d-md-inline" v-if="account">{{ account.display_name }}</span>
            <b class="caret"></b>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <router-link class="dropdown-item" :to="{
                    name: 'edit-profile'
                }">个人资料
            </router-link>
            <div class="dropdown-divider"></div>
            <a href="javascript:;" class="dropdown-item" @click="doLogout()">登出</a>
          </div>
        </li>
      </ul>
      <!-- end header navigation right -->
    </div>
    <!-- end #header -->

    <!-- begin #sidebar -->
    <div id="sidebar" class="sidebar">
      <!-- begin sidebar scrollbar -->
      <div data-scrollbar="true" data-height="100%">
        <!-- begin sidebar user -->
        <ul class="nav">
          <li class="nav-profile">
            <a href="javascript:;" data-toggle="nav-profile">
              <div class="cover with-shadow"></div>
              <div class="image">

                <img v-if="account.cover" :src="account.cover.path" />
                <img v-else src="/resource/assets/img/user/user-13.jpg" alt="" />

              </div>
              <div class="info" v-if="account">
                {{ account.display_name }}
              </div>
            </a>
          </li>
        </ul>
        <!-- end sidebar user -->
        <!-- begin sidebar nav -->
        <ul class="nav">
          <li class="has-sub" v-if="hasMenu(Menu.ROLE_MG, Menu.ACCOUNT_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-cog"></i>
              <span>系统设置</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ROLE_MG)">
                <router-link :to="{name: 'role-manage'}">角色管理</router-link>
              </li>
              <li v-if="hasMenu(Menu.ACCOUNT_MG)">
                <router-link :to="{name: 'account-manage'}">帐号管理</router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub" v-if="hasMenu(Menu.COMPANY_ACCOUNT, Menu.MANAGER_ACCOUNT, Menu.EMPLOYEE_ACCOUNT)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-folder"></i>
              <span>职级管理</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.COMPANY_ACCOUNT)">
                <router-link :to="{name: 'compnay-setting'}">公司帐号</router-link>
              </li>
              <li v-if="hasMenu(Menu.MANAGER_ACCOUNT)">
                <router-link :to="{name: 'manager-account'}">主管帐号</router-link>
              </li>
              <li v-if="hasMenu(Menu.COMPANY_SETTING)">
                <router-link :to="{name: 'company-setting'}">职员帐号</router-link>
              </li>
            </ul>
          </li>
          <li class="has-sub" v-if="hasMenu(Menu.COMPANY_SETTING)">
            <router-link :to="{name: 'company-setting'}">
              <!-- <b class="caret"></b> -->
              <i class="fas fa-columns"></i>
              <span>公司设定</span>
            </router-link>
          </li>
          <li class="has-sub" v-if="hasMenu(Menu.CURRENCY_SETTING)">
            <router-link :to="{name: 'currency-setting'}">
              <!-- <b class="caret"></b> -->
              <i class="fas fa-sync"></i>
              <span>币别设定</span>
            </router-link>
          </li>
          <li class="has-sub" v-if="hasMenu(Menu.EXCHANGE_SETTING, Menu.EXCHANGE_RATE_SETTING)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-table"></i>
              <span>汇率管理</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.EXCHANGE_SETTING)">
                <router-link :to="{name: 'exchange-setting'}">兑换设定</router-link>
              </li>
              <li v-if="hasMenu(Menu.EXCHANGE_RATE_SETTING)">
                <router-link :to="{name: 'exchange-rate-setting'}">汇率设定</router-link>
              </li>
            </ul>
          </li>
          <li class="has-sub " v-if="hasMenu(Menu.ACCOUNT_SETTING)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-database"></i>
              <span>银行管理</span>
            </a>
            <ul class="sub-menu">
              <li class="" v-if="hasMenu(Menu.ACCOUNT_SETTING)">
                <router-link :to="{name: 'account-setting'}">帐户设定</router-link>
              </li>
            </ul>
          </li>
          <li class="has-sub" v-if="hasMenu(Menu.ORDER_APPLY, Menu.ORDER_VERIFY)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-copy"></i>
              <span>订单管理</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ORDER_APPLY)">
                <router-link :to="{name: 'order-apply'}">订单申请</router-link>
              </li>
              <li v-if="hasMenu(Menu.ORDER_VERIFY)">
                <router-link :to="{name: 'order-verify'}">订单审核</router-link>
              </li>
            </ul>
          </li>
          <li class="has-sub" v-if="hasMenu(Menu.ACCOUNT_LOGIN_HISTORY)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-history"></i>
              <span>历程记录</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ACCOUNT_LOGIN_HISTORY)">
                <router-link :to="{name: 'account-login-history'}">帐号登入历程</router-link>
              </li>
            </ul>
          </li>
          <!-- begin sidebar minify button -->
          <li>
            <a class="sidebar-minify-btn"
               @click="isShowMenu = !isShowMenu"><i class="fa fa-angle-double-left"></i></a>
          </li>
          <!-- end sidebar minify button -->
        </ul>
        <!-- end sidebar nav -->
      </div>
      <!-- end sidebar scrollbar -->
    </div>
    <div class="sidebar-bg"></div>
    <!-- end #sidebar -->

    <!-- begin #content -->
    <router-view></router-view>
    <!-- end #content -->

    <!-- begin scroll to top btn -->
    <a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top">
      <i class="fa fa-angle-up"></i>
    </a>
    <!-- end scroll to top btn -->
  </div>
</template>

<script>
  import CheckLoginMixins from 'mixins/CheckLogin'
  import IndexMixins from 'mixins/Index'
  import { LoginType } from 'module/login'
  import Menu from 'constants/Menu'

  export default {
    mixins: [CheckLoginMixins, IndexMixins],
    data: () => ({
      isShowMenu: true,
      Menu,
    }),
    methods: {
      doLogout()
      {
        this.$store.commit(LoginType.clearAccessToken)
        this.$router.push({
          name: 'login',
        })
      },
      dataInit()
      {
        axios.all([this.getNodes(), this.getAccount()]).then(() =>
        {
          this.$nextTick(() =>
          {
            App.init()
          })
        })
      },
      hasMenu(...codes)
      {
        for (let code of codes)
        {
          if (_.some(this.menus, {code}))
          {
            return true
          }
        }
        return false
      },
    },
    mounted()
    {
      this.dataInit()
    },
  }
</script>
