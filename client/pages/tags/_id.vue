<template>
  <div class="tags">
    <section class="tags-header">
      <p class="title">
        与<span>{{ $route.params.id }}</span>相关的文章
      </p>
      <p class="total">
        共有<span>{{ this.$store.state.article.articleList.total }}</span>篇
      </p>
    </section>
    <list></list>
  </div>
</template>

<script>
import list from '@/components/ArticleList.vue'
export default {
  name: 'tags',
  components: {
    list: list,
  },
  data () {
    return {}
  },
  head () {
    return {
      title: this.$route.params.id + '-个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.$route.params.id +
            '-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            this.$route.params.id +
            '关于-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scope>
.tags {
  display: flex;
  flex-direction: column;
  .tags-header {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 16px;
    border-bottom: 10px solid #f6f6f6;
    .title {
      padding-bottom: 10px;
      span {
        color: orange;
        font-weight: bold;
        border-radius: 4px;
        padding: 5px;
        margin: 0 5px;
      }
    }
    .total {
      span {
        margin: 0 5px;
        color: orange;
        font-weight: bold;
      }
    }
  }
}
</style>
