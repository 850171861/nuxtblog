<template>
  <div>
    <a-button type="primary" @click="handleCreate">
      <a-icon type="plus" /> 添加
    </a-button>
    <a-table
      bordered
      :rowKey="
        (record, index) => {
          return index;
        }
      "
      :data-source="dataSource"
      :columns="columns"
    >
      <template slot="status" slot-scope="text, record">
        <span v-if="dataSource.length">
          <a href="javascript:;" v-if="record.status == 1">
            <a-button
              type="dashed"
              style="
                background-color: #e6f9f4;
                border-color: #ccf3e9;
                color: #00c292;
              "
            >
              启用中
            </a-button>
          </a>

          <a href="javascript:;" v-else>
            <a-button
              type="dashed"
              style="
                background-color: #feeef0;
                border-color: #fddce2;
                color: #f4516c;
              "
            >
              禁用中
            </a-button>
          </a>
        </span>
      </template>

      <template slot="operation" slot-scope="text, record">
        <a-button
          type="primary"
          style="margin-right: 20px"
          @click="handleUpdate(record)"
        >
          编辑
        </a-button>
        <a-popconfirm
          v-if="dataSource.length"
          title="确定要删除吗？"
          @confirm="() => onDelete(record._id)"
        >
          <a-button type="danger"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <!-- 抽屉 增加数据或者修改数据  页面 -->
    <a-drawer
      title="Create a new account"
      :width="440"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form-item label="分类名称">
        <a-input placeholder="请输入分类名称" v-model="obj.name" />
      </a-form-item>
      <a-form-item label="状态">
        <a-switch
          defaultChecked
          checkedChildren="启动中"
          unCheckedChildren="禁用中"
          v-model="checked"
          @change="onChange"
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
import { tag, deleteTag, addTag, updateTag } from "@/services/tag";
// import moment from "dayjs";

export default {
  data() {
    return {
      obj: {
        name: "",
        status: 1,
      },
      checked: true,
      dialogStatus: "",
      visible: false,
      dataSource: [],
      columns: [
        {
          title: "标签名称",
          dataIndex: "name",
          width: "20%",
        },
        {
          title: "文章数量",
          dataIndex: "articleCount",
          width: "20%",
        },
        {
          title: "创建时间",
          dataIndex: "created",
          width: "25%",
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "12%",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: "20%",
        },
      ],
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    onChange() {
      this.checked == true ? (this.obj.status = 1) : (this.obj.status = 0);
    },
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
      addTag(this.obj).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data;
          this.dataSource.unshift(data); //更新视图
          this.$message.success("添加数据成功"); // 提示是否成功
        } else {
          this.$message.success("添加数据失败"); // 提示是否成功
        }
        this.obj.name = "";
        this.obj.status = 1; // 初始化obj
      });
      this.visible = false; //关闭对话框
    },
    handleUpdate(row) {
      //处理修改
      this.obj = Object.assign({}, row); //复制当前编辑对象
      this.obj.status == 1 ? (this.checked = true) : (this.checked = false); //如果当前状态是启用中则开关-开启
      this.dialogStatus = "update"; //修改值当点击确认调用updateData（）
      this.visible = true; //弹出
    },
    updateData() {
      // 修改数据
      updateTag(this.obj).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改数据成功"); // 提示是否成功
          this.dataSource.forEach((element) => {
            if (element._id === this.obj._id) {
              element.name = this.obj.name;
              element.status = this.obj.status;
            }
          });
        } else {
          this.$message.success("修改数据失败"); // 提示是否成功
        }
        this.visible = false; //关闭对话框
      });
    },
    // 获取分类列表数据
    getCategoryList() {
      tag().then((res) => {
        this.dataSource = res.data.data;
      });
    },
    // 删除数据
    onDelete(id) {
      deleteTag({ id: id }).then((res) => {
        if (res.data.code === 200) {
          const dataSource = [...this.dataSource];
          this.dataSource = dataSource.filter((item) => item._id !== id);
          this.$message.success(res.data.msg);
        }
      });
    },
  },
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>