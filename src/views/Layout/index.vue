<template>
  <div>
    <layoutHeader />
    <layoutMain />
    <layoutNav />
  </div>
</template>

<script>
import layoutHeader from './Components/Header'
import layoutMain from './Components/Main'
import layoutNav from './Components/Nav'
export default {
    name: 'layout',
    components: {
        layoutHeader,layoutMain,layoutNav
    },
    setup(props) {}
}
</script>

<style lang="scss" scoped>

</style>