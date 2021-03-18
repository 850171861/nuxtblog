<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="errorData"
      :scroll="{ x: 1500, y: 450 }"
      :rowKey="
        (record, index) => {
          return record._id;
        }
      "
      >>

      <a slot="action" slot-scope="text, record">
        <a-popconfirm
          v-if="errorData.length"
          title="确定要删除吗？"
          @confirm="() => onDelete(record._id)"
        >
          <a-button type="danger"> 删除 </a-button>
        </a-popconfirm>
      </a>
    </a-table>
  </div>
</template>
<script>
import { errorLog, deleteErrorLog } from "@/services/errorLog";

export default {
  data() {
    return {
      errorData: [],
      columns: [
        {
          title: "错误信息",
          width: 250,
          dataIndex: "message",
          fixed: "left",
        },
        { title: "错误码", dataIndex: "code", width: 150 },
        { title: "请求类型", dataIndex: "method", width: 200 },
        { title: "请求路径", dataIndex: "path", width: 150 },
        { title: "请求参数", dataIndex: "param", width: 150 },
        { title: "用户", dataIndex: "username", width: 150 },
        { title: "报错日期", dataIndex: "created", width: 150 },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          width: 120,
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  mounted() {
    this.getErrorLog();
  },
  methods: {
    getErrorLog() {
      errorLog().then((res) => {
        if (res.data.code) {
          this.errorData = res.data.data;
        }
      });
    },
    onDelete(id) {
      deleteErrorLog({ _id: id }).then((res) => {
        if (res.data.code === 200) {
          const errorData = [...this.errorData];
          this.errorData = errorData.filter((item) => item._id !== id);
          this.$message.success("删除成功");
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