<template>
  <div class="handle-eeror-page">
    <h2 v-if="error.statusCode == 401">
      <div><img src="../assets/images/404.PNG" alt="" /></div>
      404 - 页面不存在
      <nuxt-link to="/">
        <a-button type="primary"> 回到首页 </a-button></nuxt-link
      >
    </h2>
    <h2 v-else>
      <div><img src="../assets/images/404.PNG" alt="" /></div>
      500 - 服务器错误
      <nuxt-link to="/">
        <a-button type="primary"> 回到首页 </a-button></nuxt-link
      >
    </h2>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style lang="scss" scope>
.handle-eeror-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>