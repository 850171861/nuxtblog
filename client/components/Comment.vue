<template>
  <div class="comment">

    <div class="comment_tips">
      <p style="font-size: 16px; color: #000; font-weight: bold">提示：</p>
      <p>昵称选填，用于展示在评论中</p>
      <p>邮箱选填，不会公开展示，方便及时收到回复</p>
      <p>
        网址选填，方便看到的人去访问,请完整填写,例如(http://www.wudongming.com)
      </p>
    </div>

    <!-- 评论表单 -->
    <div class="wrap">
      <div class="wrap-input">
        <input type="text"
               placeholder="昵称"
               v-model="name" />
        <input type="email"
               placeholder="邮箱"
               v-model="email" />
        <input type="text"
               placeholder="网址(http://)"
               v-model="url" />
      </div>

      <a-textarea placeholder="说点什么吧~~"
                  :auto-size="{ minRows: 5, maxRows: 12 }"
                  class="comment-textarea"
                  id="comment-textarea"
                  v-model="content" />
      <div class="wrap-bottom">
        <p v-show="reviewers.name">正在回复：@{{ reviewers.name }}</p>
        <a-button @click="submit">提交</a-button>
      </div>
    </div>
    <div class="comment-list"
         v-if="commentList.length !== 0">
      <a-comment v-for="(item, index) in commentList"
                 :key="index">
        <span slot="actions"
              key="comment-nested-reply-to"
              @click="reply(item)">回复</span>
        <a slot="author">{{ item.name }}</a>
        <a-avatar slot="avatar"
                  :src="item.pic"
                  alt="Han Solo" />

        <p slot="datetime">({{ item.created | moment }})</p>
        <p slot="content">
          {{ item.content }}
        </p>
        <a-comment v-for="(list, index) in item.childrenData"
                   :key="index">
          <span slot="actions"
                @click="reply(item, list)">回复</span>
          <a slot="author">{{ list.name }}
            <span style="color: #ccc">({{ list.created | moment }})</span></a>
          <a-avatar slot="avatar"
                    :src="list.pic"
                    alt="Han Solo" />
          <p slot="content">
            {{ list.content }} //@{{ list.beReplyName }}:{{
              list.beReplyContent
            }}
          </p>
        </a-comment>
      </a-comment>
      <div class="loading-more">
        <a-spin v-if="loadingMore" />
        <a-button v-else
                  @click="onLoadMore">
          {{ this.$store.state.comment.more }}
        </a-button>
      </div>
    </div>
    <div class="comment-null"
         v-else>
      <a-empty description="暂无评论，快来抢个沙发吧" />
    </div>
  </div>
</template>


<script>
import { scrollToElem } from '../utils/common'
import filters from '@/directive/relativeTime'
import { addComment } from '@/api/comment'

export default {
  name: 'comment',
  computed: {
    commentList () {
      return this.$store.state.comment.commentList
    },
  },
  filters: filters,
  data () {
    return {
      page: 1,
      limit: 10,
      name: '',
      email: '',
      url: '',
      content: '',
      reviewers: '', // 评论者
      loading: true,
      loadingMore: false,
      articleId: this.$route.params.id,
    }
  },
  watch: {
    content (newv, oldv) {
      if (newv === '') {
        this.reviewers = ''
      }
    },
  },
  mounted () {
    this.$store.dispatch('comment/setCommentList', {
      id: this.articleId,
      page: this.page,
      limit: this.limit,
    })
  },
  methods: {
    onLoadMore () {
      this.loadingMore = true
      setTimeout(() => {
        this.$store.dispatch('comment/setCommentList', {
          id: this.articleId,
          page: this.page,
          limit: this.limit,
        })
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      }, 500)
      this.page += 1
    },
    reply (item, list) {
      // 如果是二级评论拿二级当前数据
      // 否则拿一级评论数据拿一级当前数据
      if (list) {
        this.reviewers = list
        this.reviewers._id = item._id
      } else {
        this.reviewers = item
      }
      // 评论内容不为空切换回复人，不清空
      if (this.content !== '') {
        this.content = this.content
      } else {
        this.content = ' '
      }
      // 动态滚动到输入框的位置，并且进行focus
      scrollToElem('.comment-textarea', 500, -240)
      // focus 输入框
      document.getElementById('comment-textarea').focus()
    },
    submit () {
      if (this.content === '' || this.content === ' ') {
        this.$message.error('提交失败，内容不能为空')
        return
      }
      let picArr = [
        '/picImg/pic1.png',
        '/picImg/pic2.png',
        '/picImg/pic3.png',
        '/picImg/pic4.png',
        '/picImg/pic5.png',
        '/picImg/pic6.png',
        '/picImg/pic7.png',
        '/picImg/pic8.png',
      ]
      let pic = picArr[Math.floor(Math.random() * picArr.length)]
      let tid = this.$route.params.id
      let name = this.name || 'anonymity'
      let email = this.email || ''
      let url = this.url || ''
      let content = this.content
      let id = this.reviewers._id || ''
      let beReplyContent = this.reviewers.content || ''
      let beReplyName = this.reviewers.name || ''

      let data = {
        pic: pic,
        tid: tid,
        name: name,
        email: email,
        url: url,
        content: content,
        beReplyContent: beReplyContent,
        beReplyName: beReplyName,
        id: id,
      }

      // 发起axios请求
      addComment(data).then((res) => {
        if (res.code === 200) {
          // 提交成功之后清空表单数据
          this.reviewers = ''
          this.content = ''
          // commit数据更新视图
          if (res.data) {
            data._id = res.data._id
          }
          this.$store.commit('comment/updateCommentList', data)
          // 提示评论成功
          this.$message.success('评论成功')
        }
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.comment {
  .comment_tips {
    font-size: 12px;
    line-height: 24px;
    padding-top: 15px;
    color: #999;
    margin-bottom: 20px;
    p {
      margin-bottom: 0;
    }
  }

  .loading-more {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    .ant-btn {
      height: 24.5px;
    }
  }
  .wrap {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    padding: 10px;
    .wrap-input {
      display: flex;
      flex-wrap: wrap;
      input {
        width: 33.33%;
        background: transparent;
        border: none;
        resize: none;
        outline: none;
        padding: 10px 5px;
        font-size: 14px;
        border-bottom: 1px dashed #dedede;
      }
      input:focus {
        border-bottom: 1px dashed #f5bc29;
      }
      @media screen and (max-width: 420px) {
        input {
          width: 100%;
        }
      }
    }
    .ant-input {
      background: transparent;
    }
    textarea {
      width: 100%;
      font-size: 14px;
      background: transparent;
      padding: 10px 5px;
      border: none;
    }
    textarea:focus {
      box-shadow: none;
    }
    .wrap-bottom {
      height: 32px;
      line-height: 32px;
      margin-top: 20px;
      padding: 0 4px;
      p {
        color: #3479fa;
        float: left;
      }
      .ant-btn {
        float: right;
      }
    }
  }
}
</style>