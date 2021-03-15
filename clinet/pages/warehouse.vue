<template>
  <div class="warehouse">
    <a-card hoverable
            v-for="(item, index) in warehouseList"
            :key="index">
      <template slot="actions"
                class="ant-card-actions">
        <a target="_blank"
           :href="'http://' + item.url + '.com'">访问</a>
      </template>
      <a-card-meta :title="item.title"
                   :description="item.content">
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
import { getWarehouse } from '@/api/warehouse'
export default {
  name: 'warehouse',
  async asyncData ({ params, error }) {
    const { data } = await getWarehouse()
    return {
      warehouseList: data,
    }
  },
  head () {
    return {
      title: '仓库-个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '仓库-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '仓库-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scope>
.warehouse {
  .ant-card {
    margin-bottom: 8px;
    margin-right: 5px;
    float: left;
    .ant-card-meta-description {
      width: 357px;
      height: 79px;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
  }
  @media screen and (max-width: 590px) {
    .ant-card {
      width: 100%;
    }
  }
}
</style>