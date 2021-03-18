<template>
  <div class="search">
    <section class="artList-by-type">
      <p class="type-title">
        搜索<span>{{ $route.query.search }}</span>相关的文章
      </p>
      <p class="type-total">
        共找到<span>{{ this.$store.state.article.articleList.total }}</span>篇
      </p>
    </section>
    <list></list>
  </div>
</template>

<script>
import list from '@/components/ArticleList.vue'
export default {
  name: 'search',
  components: {
    list: list,
  },
  head () {
    return {
      title: this.$route.query.search + '-个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.$route.query.search +
            '-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            this.$route.query.search +
            '关于-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scope>
.search {
  display: flex;
  flex-direction: column;
  .artList-by-type {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 16px;
    border-bottom: 10px solid #f6f6f6;
    .type-title {
      padding-bottom: 10px;
      span {
        color: orange;
        font-weight: bold;
        border-radius: 4px;
        padding: 5px;
        margin: 0 5px;
      }
    }
    .type-total {
      span {
        margin: 0 5px;
        color: orange;
        font-weight: bold;
      }
    }
  }
}
</style>
