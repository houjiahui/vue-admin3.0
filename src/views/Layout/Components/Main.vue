<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutMain',
  setup(props, { root }) {
  }
}
</script>

<style lang="scss" scoped>
  #main-wrap {
    height: 100vh;
    background: #f7f7f7;
    // position: fixed;
    // left: $navMenu;
    // width:100%;
    // top: 75px;
    // right: 0;
    // bottom: 0;
    // border: 30px solid #f7f7f7;
    // border-bottom: none;
  }
  .main-content {
      padding-left:$navMenu + 30;
      height: 100%;
      padding-top: $layoutHeader + 30;
      padding-right: 30px;
      box-sizing: border-box;
  }
  .open{
    .main-content{
      padding-left:$navMenu + 30;
    }
  }
  .close{
    .main-content{
      padding-left:$navMenuMix + 30;
    }
  }
  .content {
    // width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    background-color: #fff;
    box-sizing: border-box;
}
</style>