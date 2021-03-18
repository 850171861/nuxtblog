<template>
  <div class="card-list">
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
      :dataSource="warehouseData"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item.add">
          <a-button class="new-btn" type="dashed" @click="handleCreate">
            <a-icon type="plus" />添加
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta>
              <div style="margin-bottom: 3px" slot="title">
                {{ item.title }}
              </div>

              <div class="meta-content" slot="description">
                {{ item.content }}
              </div>
            </a-card-meta>
            <a slot="actions" @click="handleUpdate(item)">编辑</a>
            <a slot="actions" @click="handleDelelte(item._id)">删除</a>
          </a-card>
        </template>
      </a-list-item>
    </a-list>

    <!-- 抽屉 增加数据或者修改数据  页面 -->
    <a-drawer
      title="Create a new account"
      :width="440"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form-item label="项目名称">
        <a-input placeholder="请输入项目名称" v-model="obj.title" />
      </a-form-item>

      <a-form-item label="项目地址">
        <a-input
          style="width: 100%"
          addon-before="http://"
          addon-after=".com"
          placeholder="请输入项目地址"
          v-model="obj.url"
        />
      </a-form-item>

      <a-form-item label="项目描述">
        <a-textarea
          :rows="10"
          placeholder="请输入项目描述"
          v-model="obj.content"
        />
      </a-form-item>

      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import {
  warehouse,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "@/services/warehouse";
export default {
  name: "CardList",
  data() {
    return {
      warehouseData: [],
      obj: {
        title: "",
        url: "",
        content: "",
      },
      visible: false,
      dialogStatus: "",
    };
  },
  mounted() {
    this.getWarehouse();
  },
  methods: {
    onClose() {
      // 关闭对话框
      this.visible = false;
    },
    //处理创建
    handleCreate() {
      this.dialogStatus = "create"; //等于create调用createData()
      this.visible = true; //弹出
    },
    // 创建数据
    createData() {
      addWarehouse(this.obj).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data;
          this.warehouseData.splice(1, 0, data); //更新视图
          this.$message.success("添加数据成功"); // 提示是否成功
        } else {
          this.$message.success("添加数据失败"); // 提示是否成功
        }
        this.obj.title = "";
        this.obj.url = "";
        this.obj.content = "";
      });
      this.visible = false; //关闭对话框
    },
    // 处理修改
    handleUpdate(item) {
      this.obj = Object.assign({}, item);
      this.dialogStatus = "update"; //等于create调用createData()
      this.visible = true; //弹出
    },
    // 修改数据
    updateData() {
      // 修改数据
      updateWarehouse(this.obj).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改数据成功"); // 提示是否成功
          this.warehouseData.forEach((element) => {
            if (element._id === this.obj._id) {
              element.title = this.obj.title;
              element.content = this.obj.content;
              element.url = this.obj.url;
            }
          });
        } else {
          this.$message.success("修改数据失败"); // 提示是否成功
        }
        this.visible = false; //关闭对话框
      });
    },

    // 获取仓库列表数据
    getWarehouse() {
      warehouse().then((res) => {
        if (res.data.code === 200) {
          res.data.data.unshift({ add: true });
          this.warehouseData = res.data.data;
        }
      });
    },
    // 删除数据
    handleDelelte(_id) {
      deleteWarehouse({ _id: _id }).then((res) => {
        if (res.data.code === 200) {
          const warehouseData = [...this.warehouseData];
          this.warehouseData = warehouseData.filter((item) => item._id !== _id);
          this.$message.success(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.new-btn {
  border-radius: 2px;
  width: 100%;
  height: 187px;
}
.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 64px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
