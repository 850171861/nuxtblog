<template>
  <div class="index">
    <list></list>
  </div>
</template>

<script>
import list from '@/components/ArticleList.vue'
export default {
  name: 'index',
  components: {
    list: list,
  },
  head () {
    return {
      title: '个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scope>
</style>
