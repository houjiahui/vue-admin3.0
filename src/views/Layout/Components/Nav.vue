<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
     <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="transparent" text-color="#fff" active-text-color="#fff" router>
      <template v-for="(item,index) in routerTab">
          <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
            <template slot="title">
                <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                <span>{{item.meta.name}}</span>
            </template>
            <template v-for="subItem in item.children">
                <el-menu-item :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
            </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api';
export default {
    name: 'navMenu',
    setup(props, { root }) {
        const isCollapse = computed(() => root.$store.state.isCollapse);
        const routerTab = reactive(root.$router.options.routes);
      return{
          isCollapse,
          routerTab,
      }
    }
}
</script>

<style lang="scss" scoped>
    .logo {
        text-align: center;
        img { 
            margin: 28px auto 25px;
            width: 92px;
            // @include webkit(transition, all .3s ease 0s);
        }
    }
    #nav-wrap{
        position: fixed;
        top:0;
        left:0;
        height:100vh;
        background:$navBgc;
        @include webkit(transition,all .3s ease 0s);
        svg {
            font-size: 20px;
            margin-right: 10px;
        }
    }
    .open{
        #nav-wrap{
            width:$navMenu;
        }
    }
    .close{
        #nav-wrap{
            width:$navMenuMix;
        }
    }
</style>