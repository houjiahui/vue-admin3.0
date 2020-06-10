<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu" /></div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.png" alt="">
        {{username}}
      </div>
      <div class="header-icon pull-right" @click="exit()"><svg-icon iconClass="exit" className="exit" /></div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
  name: 'layoutHeader',
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username ? root.$store.state.app.username :'测测测');
    const navMenuState = () => root.$store.commit('app/SET_COLLAPSE');
    const exit = () => {
      root.$store.dispatch('app/exit').then(() => {
        root.$router.push({
          name:'login '
        })
      })
    }
    return{
      navMenuState,
      username,
      exit
    }
  }
}
</script>

<style lang="scss" scoped>
    #header-wrap{
        position: fixed;
        top:0;
        right: 0;
        height:75px;
        background: #fff;
        line-height: 75px;
        @include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,0.1));
        @include webkit(transition,all .3s ease 0s);
    }
    .header-icon{
      padding:0 32px;
      svg{
        margin-bottom:-8px;
        font-size:25px;
        color:rgb(126, 118, 118);
        cursor: pointer;
      }
    }
    .user-info{
      height:100%;
      padding:0 32px;
      border-right:1px solid rgb(143, 136, 136);
      + .header-icon {
        padding: 0 28px;
      }
      img {
        width:30px;
        height:30px;
        display: inline-block;
        margin-bottom: -12px;
        margin-right: 18px;
        border-radius: 50px;
      }
    }
    .open{
      #header-wrap{
        left:$navMenu;
        }
    }
    .close{
      #header-wrap{
        left:$navMenuMix;
        }
    }
</style>