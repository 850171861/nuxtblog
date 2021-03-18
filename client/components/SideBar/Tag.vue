<template>
  <section class="m-top">
    <a-card title="标签"
            :bordered="false"
            :hoverable="true">
      <i class="icon"><img src="@/assets/images/label.png"
             alt="标签" /></i>
      <div class="box">
        <nuxt-link :to="'/tags/' + item.name"
                   tag="a-card-grid"
                   v-for="(item, index) in tagList"
                   :key="index"># {{ item.name }} [{{ item.articleCount }}]
        </nuxt-link>
      </div>
    </a-card>
  </section>
</template>

<script>
export default {
  name: 'tag',
  computed: {
    tagList () {
      return this.$store.state.tag.tagList
    },
  },
}
</script>

<style lang="scss" scope>
.m-top {
  margin-top: 15px;
  width: 100%;
  position: relative;
  .box {
    display: flex;
    flex-wrap: wrap;
    .ant-card-grid {
      margin: 8px 0 0 8px;
      padding: 6px 8px;
      font-size: 14px;
      border-radius: 4px;
      width: auto;
    }
  }
}
</style>