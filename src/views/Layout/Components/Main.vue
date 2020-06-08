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
}
</script>

<style lang="scss" scoped>
  #main-wrap {
    height: 100vh;
    position: fixed;
    left: $navMenu;
    width:100%;
    // top: 75px;
    // right: 0;
    // bottom: 0;
    // border: 30px solid #f7f7f7;
    // border-bottom: none;
    -webkit-box-sizing: border-box;
  }
  .main-content {
      width: 100%;
      height: 100%;
      padding-top: $layoutHeader + 30;
      padding-right: 30px;
      box-sizing: border-box;
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    background-color: #fff;
    box-sizing: border-box;
}
</style>