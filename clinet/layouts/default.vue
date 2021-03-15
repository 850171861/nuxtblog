<template>
  <div class="layout_container">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Main from '@/components/Main.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    AppHeader: Header,
    AppMain: Main,
    AppFooter: Footer,
  },
}
</script>

<style>
/* 覆盖ant-aesign默认样式 */
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li {
  margin-top: 0;
  margin-bottom: 0;
}
.layout_container {
  background-color: #f6f6f6;
}
</style>



