<template>
  <div class="article_id clearfix">
    <div class="left-content"
         v-if="articleDetail.artTitle">
      <h2 class="article-title">{{ data.title }}</h2>
      <p class="article-info">
        <span>发布于：{{ data.created | moment }}</span><span>{{ data.reads }}次浏览</span><span>{{ data.answer }} 条评论</span>
      </p>
      <div class="article-content"
           id="r-md-preview">
        <div class="md"
             id="md"
             v-html="data.content"></div>
      </div>

      <!-- 相关文章 -->
      <div class="related-articles">
        <div class="related">相关文章</div>
        <ul class="ul-related"
            v-if="related.length !== 0">
          <li v-for="(item, index) in related"
              :key="index">
            <nuxt-link tag="a"
                       :to="item._id">{{ item.title }}</nuxt-link>
          </li>
        </ul>
        <ul v-else>
          <li>暂无相关文章</li>
        </ul>
        <ul class="ul-copyright">
          <li><span>本文作者：</span> var author='wdm'</li>
          <li><span>本文链接：</span> http://www.wudongming.com{{ $nuxt.$route.path }}</li>
          <li>
            <span>版权声明：</span> 本博客所有文章除特别声明外，均采用 BY-NC-SA
            许可协议。转载请注明出处！
          </li>
        </ul>
      </div>
      <comment />
    </div>
    <div v-else>
      <a-empty description="咦，你要找的东西好像不见了" />
    </div>
  </div>
</template>

<script>
import comment from '../../components/Comment'
import { getArticleInfo } from '@/api/article'
import filters from '@/directive/relativeTime'

//引入marked解析模块 与 代码高亮插件 以及对应的样式文件
import marked from 'marked'
// highlight.js  代码高亮指令
import hljs from 'highlight.js'
// 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件
import 'highlight.js/styles/tomorrow-night.css'

export default {
  watchQuery: true,
  name: 'Article',
  components: { comment },
  filters: filters,
  data () {
    return {
      articleDetail: { artTitle: true },
    }
  },
  created () {
    this.$store.commit('comment/empty')

  },
  mounted () {
    //基本配置与代码高亮配置
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
    })
    var pre = document.getElementById('md').getElementsByTagName('pre')
    for (let i = 0; i < pre.length; i++) {
      let div = document.createElement('div')
      div.className = 'three-point'
      let first = pre[i].firstElementChild
      pre[i].insertBefore(div, first)
    }
  },
  async asyncData ({ params, error }) {
    const { code, data, related } = await getArticleInfo(params)
    if (code === 200) {
      data.content = marked(data.content)
      return {
        data: data,
        related: related,
      }
    }
  },
  head () {
    return {
      title: this.data.title + '-个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.data.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            this.data.title +
            '关于-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.related-articles {
  .related {
    height: 30px;
    border-bottom: 1px solid #eee;
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 60px;
  }
  .ul-related {
    li {
      a {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        color: #666;
        text-decoration: underline;
      }
      a:hover {
        color: #000;
        padding-left: 10px;
        transition: all 0.5s;
      }
    }
  }
  .ul-copyright {
    background: #f5f5f5;
    border-left: 3px solid #ff2a2a;
    list-style: none;
    margin: 12px 0 0;
    padding: 0.5em 1em;
  }
}
.el-message {
  top: 65px !important;
}

.article_id {
  background-color: #fff;
  padding: 15px;
  .article-title {
    text-align: center;
    font-size: 20px;
    color: #666;
    margin: 16px 0;
  }

  .article-info {
    text-align: center;
    font-size: 12px;
    color: #999;
    padding-bottom: 15px;

    span {
      padding: 0 6px;
    }
  }

  .article-content {
    img {
      border-radius: 8px;
    }
  }
  #r-md-preview {
    @media screen and (max-width: 920px) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .article-type {
    /*border-top: 2px solid #ccc;*/
    border-left: 2px solid #ccc;
    background-color: #f6f8fa;
    margin-top: 30px;
    margin-bottom: 15px;
    padding: 15px 0 15px 15px;
    font-size: 14px;

    p {
      padding-bottom: 5px;
    }

    a {
      color: #409eff;
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .art_tag {
    a {
      padding: 0 6px;
    }
  }

  .not-found {
    text-align: center;
  }
}

pre {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 55%);
  .three-point {
    display: block;
    // background: url(http://localhost:3000/images/20210128/1.png) no-repeat
    //   rgb(39, 40, 34);
    background: url("../../static/picImg/codeIcon.png") no-repeat
      rgb(39, 40, 34);
    height: 30px;
    width: 100%;
    margin-bottom: -7px;
    border-radius: 5px;
  }
  code {
    overflow-x: auto;
    padding: 16px;
    color: #ddd;
    display: -webkit-box;
    font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
    font-size: 12px;
    -webkit-overflow-scrolling: touch;
    padding-top: 15px;
    background: #272822;
    border-radius: 5px;
  }
}
</style>
