<template>
  <div class="archives">
    <div class="archive-title">
      <p class="archive-desc">那些年，那些人，那些事</p>
      <p class="archive-tips">
        这里共有<span>{{ archive.total }}</span>条线索
      </p>
    </div>
    <div class="time-list-wrap clearfix"
         v-if="archive.total > 0">
      <div class="art-list">
        <div v-for="(item, index) in archive.data"
             :key="index">
          <a-divider orientation="left">
            YEAR-{{ item._id }} <span class="count"> ({{ item.count }})</span>
          </a-divider>
          <ul class="art-list-detail">
            <li class="art-detail-item"
                v-for="(list, listIndex) in item.yearList"
                :key="listIndex">
              <span class="date">{{ list.created }}</span>
              <nuxt-link :to="`/article/${list.id}`"
                         :title="list.title">{{
                list.title
              }}</nuxt-link><span class="views">
                <span>
                  <svg t="1610858103596"
                       class="icon"
                       viewBox="0 0 1024 1024"
                       version="1.1"
                       xmlns="http://www.w3.org/2000/svg"
                       p-id="2949"
                       width="16"
                       height="16">
                    <path d="M512 209.403241c-201.731514 0-374.009206 125.476783-443.808922 302.596759 69.798692 177.119977 242.077408 302.596759 443.808922 302.596759 201.933105 0 374.010229-125.476783 443.808922-302.596759C886.009206 334.880023 713.933105 209.403241 512 209.403241zM512 713.731514c-111.355157 0-201.731514-90.375334-201.731514-201.731514s90.375334-201.731514 201.731514-201.731514 201.731514 90.375334 201.731514 201.731514S623.355157 713.731514 512 713.731514zM512 390.961296c-66.772776 0-121.038704 54.265928-121.038704 121.038704s54.265928 121.038704 121.038704 121.038704 121.038704-54.265928 121.038704-121.038704S578.772776 390.961296 512 390.961296z"
                          p-id="2950"
                          fill="#bfbfbf"></path>
                  </svg></span>
                <span class="reads">{{ list.reads }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else
         class="no-data">咦，这里的线索不见了～</div>
  </div>
</template>

<script>
import { getArchive } from '@/api/archive'
export default {
  name: 'archives',
  data () {
    return {}
  },
  async asyncData ({ params, error }) {
    const archiveData = await getArchive()
    return {
      archive: archiveData,
    }
  },

  mounted () { },
  head () {
    return {
      title: '归档-个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '归档-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '归档-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.archives {
  background-color: #fff;
  .no-data {
    text-align: center;
    font-size: 13px;
    line-height: 60px;
  }
  .archive-title {
    text-align: center;
    padding: 15px 0;

    .archive-desc {
    }

    .archive-tips {
      padding-top: 8px;
      font-size: 16px;
      color: #999;

      span {
        padding: 0 8px;
        color: orange;
        font-weight: bold;
        font-style: italic;
      }
    }
  }

  .time-list-wrap {
    .art-list {
      padding: 0 15px;
      font-size: 13px;
      .times {
        display: block;
        padding: 10px 0;
        .el-divider__text {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .count {
        padding: 0 8px;
        color: orange;
      }
      .art-list-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .art-detail-item {
          line-height: 30px;
          list-style: none;
          display: flex;
          align-items: center;
          .date {
            padding-right: 10px;
            display: inline-block;
            width: 88px;
          }
          a {
            color: #666;
          }
          .views {
            margin-left: auto;
            .reads {
              width: 20px;
              display: inline-block;
            }
          }

          a {
            flex: 1;
            text-decoration: underline;
            transition: all 0.5s;
            &:hover {
              color: #409eff;
              font-weight: bold;
              padding-left: 5px;
            }
          }
        }
      }

      a:target {
        padding-top: 70px;
        margin-top: -60px;
      }
    }

    @media screen and (min-width: 769px) {
      .art-list {
        margin: 0 auto;
        a {
          max-width: 500px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .art-list-detail {
        a {
          display: inline-block;
          width: calc(100% - 96px);
        }
      }
    }
  }
}
</style>
