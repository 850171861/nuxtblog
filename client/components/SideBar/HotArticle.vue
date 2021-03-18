<template>
  <section class="m-top">
    <a-card title="热门文章"
            :bordered="false"
            :hoverable="true">
      <i class="icon"><img src="@/assets/images/remen.png"
             alt="热门文章" /></i>
      <div class="hot">
        <p v-for="(item, index) in hotArticle"
           :key="index">
          <span>{{ index + 1 }}</span>
          <nuxt-link :to="'/article/' + item._id"
                     tag="a">{{
            item.title
          }}</nuxt-link>
        </p>
      </div>
    </a-card>
  </section>
</template>

<script>
export default {
  name: 'hotArticle',
  computed: {
    hotArticle () {
      return this.$store.state.article.hotArticle
    },
  },
}
</script>

<style lang="scss" scpoe>
.m-top {
  margin-top: 15px;
  width: 100%;
  position: relative;
  .ant-card {
    .ant-card-head-title {
      margin-left: 12px;
      font-weight: 500;
      color: #6c6c6c;
    }
    .ant-card-body {
      padding: 12px;
    }
    // 热门文章
    .hot {
      p {
        height: 32px;
        transition: all 0.5s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 4px;
        span {
          display: inline-block;
          font-size: 18px;
          width: 26px;
          height: 26px;
          line-height: 26px;
          background: #6c6c6c;
          text-align: center;
          color: #fff;
          margin-right: 10px;
        }
        a {
          width: 100%;
          color: #666;
          font-size: 18px;
        }
      }
      p:hover {
        a {
          color: #000;
          font-weight: 500;
        }
        padding-left: 8px;
      }
    }

    .icon {
      position: absolute;
      left: 8px;
      top: 15px;
    }
  }
}
</style>