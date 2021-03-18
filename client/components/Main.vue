<template>
  <main class="main">
    <nuxt class="main-article" />
    <side class="main-aside"></side>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner">UP</div>
      </a-back-top>
      <strong style="color: #1088e9"> </strong>
    </div>
  </main>
</template>

<script>
import side from '@/components/side'
export default {
  name: 'Main',
  components: { side },
  data () {
    return {}
  },
  methods: {},
  mounted () { },
}
</script>

<style lang="scss">
.main {
  margin: 60px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  .main-article {
    width: 855px;
    margin-top: 15px;
    background: #fff;
    padding: 15px;
    border-radius: 6px;
  }
  .main-aside {
    width: 320px;
  }
  @media screen and (max-width: 1200px) {
    .main-article {
      width: 100%;
    }
    .main-aside {
      width: 100%;
    }
  }
  // 回到顶部
  #components-back-top-demo-custom .ant-back-top {
    bottom: 100px;
  }
  #components-back-top-demo-custom .ant-back-top-inner {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
}
</style>
