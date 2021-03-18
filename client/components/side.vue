<template>
  <aside class="sidebar">
    <!-- 关于个人 -->
    <about />
    <!--热门文章-->
    <hotarticle />
    <!--分类-->
    <category />
    <!--标签-->
    <tag />
  </aside>
</template>

<script>
import about from '@/components/SideBar/About'
import hotarticle from '@/components/SideBar/HotArticle'
import category from '@/components/SideBar/Category'
import tag from '@/components/SideBar/Tag'
export default {
  name: 'sidebar',
  components: {
    about,
    hotarticle,
    category,
    tag
  },
  data () {
    return {
      categoryList: [{ categoryname: 1, total: 1 }],
      hotArticleList: [{ artTitle: 122112 }],
      tagList: [{ tagname: 1, total: 1 }],
    }
  },
  computed: {},
  methods: {},
  mounted () { },
}
</script>

<style lang="scss">
.sidebar {
}
</style>
