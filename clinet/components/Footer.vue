<template>
  <footer class="footer">
    <p>Powered By <a href="https://zh.nuxtjs.org/"
         rel="nofollow"
         target="_blank">Nuxt.js</a>，Designed By blog</p>
    <p class="copyright">Copyright© 2020 <a href="https://github.com/CQBoyBrand"
         target="_blank">
        wdm</a></p>

    <p><a href="http://beian.miit.gov.cn"
         rel="nofollow"
         target="_blank">粤ICP备2021017353号</a></p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer {
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  padding: 10px 0;
  min-width: 320px;
  color: #939393;
  margin-top: 15px;
  a {
    color: #939393;
  }
  .copyright {
    a {
      font-style: italic;
    }
  }
}
</style>
