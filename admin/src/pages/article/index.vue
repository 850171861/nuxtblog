<template>
  <div>
    <a-button type="primary"
              style="margin: 5px 0"
              @click="handleCreate()">
      <a-icon type="plus" /> 添加文章
    </a-button>

    <a-table :columns="columns"
             :data-source="data"
             :pagination="paginationProps"
             :scroll="{ x: 1500, y: 450 }"
             :rowKey="
        (record, index) => {
          return record._id;
        }
      ">
      <template slot="tag"
                slot-scope="text, record">
        <span v-if="data.length">
          <a-tag v-for="(tag, i) in record.tag"
                 :key="i">{{ tag }}</a-tag>
        </span>
      </template>
      <template slot="status"
                slot-scope="text, record">
        <span v-if="data.length">
          <a href="javascript:;"
             v-if="record.status == 1">
            <a-button type="dashed"
                      style="
                background-color: #e6f9f4;
                border-color: #ccf3e9;
                color: #00c292;
              ">
              启用中
            </a-button>
          </a>

          <a href="javascript:;"
             v-else>
            <a-button type="dashed"
                      style="
                background-color: #feeef0;
                border-color: #fddce2;
                color: #f4516c;
              ">
              禁用中
            </a-button>
          </a>
        </span>
      </template>
      <a slot="action"
         slot-scope="text, record">
        <a-button type="primary"
                  style="margin-right: 20px"
                  @click="handleUpdate(record)">
          编辑
        </a-button>
        <a-popconfirm v-if="data.length"
                      title="确定要删除吗？"
                      @confirm="() => onDelete(record._id)">
          <a-button type="danger"> 删除 </a-button>
        </a-popconfirm>
      </a>
    </a-table>

    <a-drawer title="Create a new account"
              :width="980"
              :visible="visible"
              :body-style="{ paddingBottom: '80px' }"
              @close="onClose">
      <a-form layout="vertical"
              hide-required-mark>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="文章标题">
              <a-input placeholder="请输入文章标题"
                       v-model="obj.title" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="5">
            <a-form-item label="封面图片">
              <a-upload name="file"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        :headers="headers"
                        action="http://www.wudongming.com:3001/admin/uploadImg"
                        :before-upload="beforeUpload"
                        @change="handleChange">
                <img v-if="obj.img"
                     :src="obj.img"
                     alt="文章封面" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="19">
            <a-form-item label="文章描述">
              <a-textarea :rows="6"
                          v-model="obj.description"
                          placeholder="请输入文章描述" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="文章分类">
              <a-select v-model="obj.category">
                <a-select-option disabled
                                 value="">请选择分类</a-select-option>
                <a-select-option v-for="item in categoryData"
                                 :key="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="文章标签">
              <a-select mode="multiple"
                        style="width: 100%"
                        placeholder="请选择标签(支持多选)"
                        @change="handleTagChange">
                <a-select-option v-for="item in tagData"
                                 :key="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div id="main">
              <mavon-editor v-model="obj.content"
                            ref="md"
                            @imgAdd="handleEditorImgAdd" />
            </div>
          </a-col>
        </a-row>
      </a-form>
      <div :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }">
        <a-switch defaultChecked
                  checkedChildren="发布"
                  unCheckedChildren="草稿"
                  v-model="checked"
                  @change="onChange" />

        <a-button :style="{ marginRight: '8px' }"
                  @click="onClose">
          取消
        </a-button>
        <a-button type="primary"
                  @click="dialogStatus === 'create' ? createData() : updateData()">
          确认
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
const columns = [
  {
    title: "标题",
    width: 250,
    dataIndex: "title",
    fixed: "left",
    class: "title",
  },
  { title: "类型", dataIndex: "category", width: 150 },
  { title: "创建时间", dataIndex: "created", width: 200 },
  { title: "阅读量", dataIndex: "reads", width: 150 },
  { title: "评论量", dataIndex: "answer", width: 150 },
  {
    title: "标签",
    dataIndex: "tag",
    scopedSlots: { customRender: "tag" },
    width: 200,
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
    width: 150,
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];

import {
  article,
  deleteArticle,
  addArticle,
  updateArticle,
  uploadImg,
} from "@/services/article";
import { category } from "@/services/category";
import { tag } from "@/services/tag";
import Cookie from "js-cookie";

export default {
  data () {
    return {
      paginationProps: {
        showSizeChanger: false,//设置每页显示数据条数
        pageSize: 10,
        showQuickJumper: false,
        total: 0,  //数据的总的条数
        onChange: (current) => this.changePage(current), //点击当前页码
      },
      headers: {
        Authorization: "",
      },
      // 上传
      loading: false,
      // 当前状态
      // 状态是否选择
      checked: true,
      data: [],
      categoryData: [],
      tagData: [],
      obj: {
        title: "",
        img: "",
        description: "",
        category: "",
        tag: "",
        status: 1,
        content: "",
      },
      columns,
      visible: false,
      dialogStatus: ""
    };
  },
  mounted () {
    this.headers.Authorization = Cookie.get("Authorization");
    this.getPageData();

  },
  methods: {
    changePage (current) {
      this.data = []
      this.getPage({ page: current, limit: this.paginationProps.pageSize });
    },
    handleEditorImgAdd (pos, file) {
      let formdata = new FormData();
      formdata.append("file", file);
      uploadImg(formdata).then((res) => {
        if (res.data.code === 200) {
          let url = "http://www.wudongming.com:3001" + res.data.data;
          this.$refs.md.$img2Url(pos, url);
        }
      });
    },
    // switch按钮
    onChange () {
      this.checked == true ? (this.obj.status = 1) : (this.obj.status = 0);
    },
    showDrawer () {
      this.visible = true;
    },
    // 添加或者编辑页是否取消
    onClose () {
      this.visible = false;
    },
    handleCreate () {
      this.dialogStatus = "create"; //dialogStatus为create调用createData()
      this.visible = true; //弹出
    },
    createData () {
      addArticle(this.obj).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data;
          this.data.unshift(data); //更新视图
          this.$message.success("添加数据成功"); // 提示是否成功
        } else {
          this.$message.success("添加数据失败"); // 提示是否成功
        }
        for (let key in this.obj) {
          // 添加完成  初始化obj
          this.obj[key] = "";
        }
        this.obj.status = 1; // 默认为1
      });
      this.visible = false; //关闭对话框
    },

    handleUpdate (row) {
      //处理修改
      this.obj = Object.assign({}, row); //复制当前编辑对象
      this.obj.status == 1 ? (this.checked = true) : (this.checked = false); //如果当前状态是启用中则开关-开启
      this.dialogStatus = "update"; //dialogStatus为create调用updateData()
      this.visible = true; //弹出
    },
    // 发送修改数据
    updateData () {
      updateArticle(this.obj).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改数据成功"); // 提示是否成功
          this.data.forEach((element) => {
            if (element._id === this.obj._id) {
              element.img = this.obj.img;
              element.tag = this.obj.tag;
              element.title = this.obj.title;
              element.status = this.obj.status;
              element.content = this.obj.content;
              element.category = this.obj.category;
              element.description = this.obj.description;
            }
          });
        } else {
          this.$message.success("修改数据失败"); // 提示是否成功
        }
        this.visible = false; //关闭对话框
      });
    },
    // 处理标签多选
    handleTagChange (value) {
      this.obj.tag = value;
    },
    // 分页文章
    getPage (data) {
      article(data).then((res) => {
        if (res.data.code === 200) {
          this.data = res.data.data;
          this.paginationProps.total = res.data.total
        }
      })
    },
    // 获取页面的中数据
    getPageData () {
      // 获取文章数量
      article({ page: 1, limit: this.paginationProps.pageSize }).then((res) => {
        if (res.data.code === 200) {
          this.data = res.data.data;
          this.paginationProps.total = res.data.total
        }
      });
      // 获取分类数据
      category().then((res) => {
        if (res.data.code === 200) {
          const data = res.data.data.filter((item) => item.status === 1);
          this.categoryData = data;
        }
      });
      // 获取标签数据
      tag().then((res) => {
        if (res.data.code === 200) {
          const data = res.data.data.filter((item) => item.status === 1);
          this.tagData = data;
        }
      });
    },
    // 删除文章数据
    onDelete (_id) {
      deleteArticle({ _id: _id }).then((res) => {
        if (res.data.code === 200) {
          const data = [...this.data];
          this.data = data.filter((item) => item._id !== _id);
          this.$message.success(res.data.msg);
        }
      });
    },
    // 判断上传类型是不是图片，并且上传图片不能大于2MB，
    beforeUpload (file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("您只能上传JPG文件!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图像必须小于2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    // 上传 未完成时进行懒加载
    handleChange (info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      // 上传完毕图片路径赋值，取消懒加载
      if (info.file.status === "done") {
        this.obj.img = "http://www.wudongming.com:3001" + info.file.response.data;
        console.log(this.obj.img)

        this.loading = false;
      }
    },
  },
};
</script>

<style scpoe>
.title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
/* 图片框 */
.ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 135px;
}
.ant-upload.ant-upload-select-picture-card .ant-upload img {
  max-width: 100%;
}

/* 开关 */
.ant-switch,
.ant-switch-checked {
  margin-right: 20px;
}
</style>