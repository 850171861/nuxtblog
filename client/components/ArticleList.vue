<template>
  <div class="articleList">
    <a-list item-layout="vertical"
            size="large"
            :data-source="articleList.data">
      <a-list-item slot="renderItem"
                   key="item.title"
                   slot-scope="item, index">
        <template slot="actions">
          <span>{{item.created | moment }}</span>
        </template>
        <template slot="actions">
          <span>
            <a-icon type="eye"
                    style="margin-right: 8px" /> {{item.reads}}
          </span>
        </template>
        <template slot="actions">
          <span>
            <a-icon type="message"
                    style="margin-right: 8px" /> {{item.answer}}
          </span>
        </template>
        <template slot="actions">
          <span v-if="item.category_associated.length !== 0">
            <a-icon type="bars"
                    style="margin-right: 8px" /> {{item.category_associated[0].name}}
          </span>
          <span v-else>
            <a-icon type="bars"
                    style="margin-right: 8px" /> 暂无类别
          </span>
        </template>
        <img slot="extra"
             v-if="item.img !== ''"
             width="200"
             alt="logo"
             :src="item.img" />
        <a-list-item-meta :description="item.description">
          <nuxt-link :to="'/article/'+ item._id"
                     slot="title"
                     :href="item.href">{{ item.title }}</nuxt-link :to="'/article/'+ item._id">
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-pagination :default-current="page"
                  :total="articleList.total"
                  @change="onChange" />
  </div>

</template>
<script>
import filters from '@/directive/relativeTime'
export default {
  name: 'articleList',
  data() {
    return {
      page: 1,
      limit: 10,
    }
  },
  computed: {
    articleList() {
      return this.$store.state.article.articleList
    },
  },
  filters: filters,
  mounted() {
    this.onChange()
  },
  methods: {
    onChange(e) {
      let page = e || this.page
      let obj = { status: 1, page: page, limit: this.limit }
      let route = this.$route
      if (route.name === 'search-id') {
        obj['search'] = route.query.search
      }
      if (route.name === 'category-id') {
        obj['category'] = route.params.id
      }
      if (route.name === 'tags-id') {
        obj['tag'] = route.params.id
      }
      this.$store.dispatch('article/setArticleList', obj)
    },
    getList() {
      let obj = { status: 1, page: this.page, limit: this.limit }
      let route = this.$route
      if (route.name === 'search-id') {
        obj['search'] = route.query.search
      }
      if (route.name === 'category-id') {
        obj['category'] = route.params.id
      }
      if (route.name === 'tags-id') {
        obj['tag'] = route.params.id
      }
      this.$store.dispatch('article/setArticleList', obj)
    },
  },
}
</script>
<style lang="scss" scope>
.ant-list-item {
  position: relative;
  flex-direction: row-reverse;
  border-bottom: 2px dotted #e8e8e8 !important;
  @media screen and (min-width: 420px) {
    .ant-list-item-extra {
      margin-right: 20px;
      margin-left: 0px;
    }
  }

  .ant-list-item-meta {
    margin-bottom: 32px;
    a {
      font-size: 18px;
    }
  }
  .ant-list-item-action {
    position: absolute;
    bottom: 10px;
  }
}

// 分页
.ant-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>