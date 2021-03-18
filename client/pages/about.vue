<template>
  <div class="about">
    <div class="about-me">
      <p>关于我</p>
    </div>
    <div class="clearfix about-me-detail">
      <div class="about-me-left">
        <img src="../assets/images/pic.jpg"
             alt="" />
        <h5></h5>
      </div>
      <ul class="about-me-right">
        <li>前端开发：2020年专科科毕业～今日</li>
        <li>90后瘦宅，篮球、羽毛球等球类</li>
        <li>工作主要使用的是Vue.js、Node.js</li>
        <li>未完待续</li>
      </ul>
    </div>
    <div class="about-site">
      <p>关于本站</p>
    </div>
    <div class="site-box">
      <div class="site-descript">
        本站建立，是自己用来记录学习，工作和一切自己想记录的东西的地方。欢迎访问
        <a href="http://www.wudongming.com">我的博客</a>。
        <div>
          博客界面有些丑，但是暂时不打算改了，如果你有一些简约看着又不错的博客界面，可以给我留言或者邮件，我参考参考。
        </div>
        <div style="text-align: center">
          <img src="../assets/images/dongtu.gif"
               alt="hi-brand" />
        </div>
      </div>
      <div class="site-tech">
        <div>
          <a target="_blank"
             href="https://github.com/850171861"><img src="../assets/images/github.png" />https://github.com/850171861</a>
        </div>
        <div>
          <a target="_blank"
             href="mailto:850171861@qq.com"><img src="../assets/images/email.png" />850171861@qq.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  head () {
    return {
      title: '关于',
    }
  },
  computed: {
    linkList () {
      return this.$store.state.link.list
    },
  },
  data () {
    return {}
  },
  methods: {},
  mounted () { },
  head () {
    return {
      title: '关于-个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '关于-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '关于-个人博客,前端开发,vue.js,node.js,nuxt.js,Mongodb',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.about {
  background-color: #fff;
  padding: 15px 0;
  box-sizing: border-box;
  .about-me,
  .contact-me,
  .about-site {
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    color: #333;
  }
  .about-me-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 15px;
    .about-me-left {
      padding-bottom: 10px;
      img {
        display: block;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 50%;
      }
      h5 {
        padding: 8px 0 0;
      }
    }
    .about-me-right {
      font-size: 13px;
      li {
        list-style: none;
        line-height: 20px;
      }
    }
  }
  .friends-list-wrap {
    max-width: 800px;
    margin: 0 auto;
    padding: 15px;
    li {
      float: left;
      background-color: #eee;
      list-style: none;
      border-radius: 4px;
      margin-bottom: 7px;
      margin-right: 7px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 38px;
        padding: 0px 10px;
      }
    }
  }
  .site-box {
    padding: 15px;
    font-size: 13px;
    line-height: 24px;
    box-sizing: border-box;
    a {
      color: #409eff;
    }
    .site-descript {
      text-indent: 2em;
      padding-bottom: 15px;
    }
    .site-tech {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      a {
        color: #000;
        font-size: 20px;
        line-height: 50px;
        img {
          margin-right: 10px;
        }
      }
    }
  }
  @media screen and (min-width: 769px) {
    .about-me-left,
    .about-me-right {
      float: left;
    }
    .about-me-left {
      width: 100px;
      margin: 0 auto;
      text-align: center;
    }
    .about-me-right {
      max-width: 600px;
      margin-left: 20px;
      li {
        padding-bottom: 15px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .about-me-left {
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
    .about-me-right {
      padding-bottom: 15px;
    }
  }
}
</style>
