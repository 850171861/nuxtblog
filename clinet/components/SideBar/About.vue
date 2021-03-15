<template>
  <!-- 关于个人 -->
  <section class="m-top">
    <a-card title="关于"
            :bordered="false"
            :hoverable="true">
      <i class="icon"><img src="@/assets/images/my.png"
             alt="标签" /></i>

      <div class="author">
        <p><a href="https://github.com/850171861/nuxtblog.git">博客</a>技术栈
        </p>
        <p>前端：Nuxt.js+Ant Design Vue
        </p>
        <p>后端：Vue.js+Ant Design Vue
        </p>
        <p>服务端：node.js
        </p>
        <p>数据库：Mongodb
        </p>
      </div>
    </a-card>
  </section>
</template>

<script>
export default {
  name: 'about',
}
</script>

<style lang="scss" scpoe>
.m-top {
  margin-top: 15px;
  width: 100%;
  position: relative;
  .author {
    a {
      margin-right: 5px;
    }
  }
}
</style>