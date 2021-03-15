<template>
  <section class="m-top">
    <a-card title="分类"
            :bordered="false"
            :hoverable="true">
      <i class="icon"><img src="@/assets/images/type.png"
             alt="分类" /></i>
      <div class="type">
        <ul>
          <nuxt-link :to="'/category/' + item.name"
                     tag="li"
                     v-for="(item, index) in category"
                     :key="index">
            <span>{{ item.name }}</span>
            <span>共{{ item.articleCount }}篇文章</span>
          </nuxt-link>
        </ul>
      </div>
    </a-card>
  </section>
</template>

<script>
export default {
  name: 'category',
  computed: {
    category () {
      return this.$store.state.category.categoryList
    },
  },
}
</script>

<style lang="scss" scope>
.m-top {
  margin-top: 15px;
  width: 100%;
  position: relative;
  // 分类
  .type {
    ul {
      padding: 0;
      list-style: none;
      li {
        width: 100%;
        height: 32px;
        line-height: 32px;
        color: #666;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
      }
      li:hover {
        background: #d2d2d2;
      }
    }
  }
}
</style>