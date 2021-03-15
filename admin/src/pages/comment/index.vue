<template>
  <a-table :columns="columns"
           :data-source="data"
           @expand="expand"
           :expandedRowKeys="expandedRowKeys"
           :rowKey="
      (record, index) => {
        return record._id;
      }
    ">
    <a slot="operation"
       slot-scope="record"
       @click="handleDelete(record)">删除</a>
    <a-table slot="expandedRowRender"
             :columns="childrenColumns"
             :data-source="childrenData"
             :rowKey="
        (record, index) => {
          return record.id;
        }
      ">
      <span slot="operation1"
            slot-scope="record"
            class="table-operation">
        <a @click="handleDelete(record)">删除</a>
      </span>
    </a-table>
  </a-table>
</template>
<script>
const columns = [
  { title: "昵称", dataIndex: "name", key: "name", width: "10%" },
  { title: "邮箱", dataIndex: "email", key: "email", width: "10%" },
  { title: "内容", dataIndex: "content", key: "content", width: "40%" },
  { title: "网址", dataIndex: "url", key: "url", width: "15%" },
  { title: "时间", dataIndex: "created", key: "created", width: "15%" },
  {
    title: "操作",
    key: "operation",
    scopedSlots: { customRender: "operation" },
    width: "10%",
  },
];
const childrenColumns = [
  { title: "昵称", dataIndex: "name", key: "name", width: "10%" },
  { title: "邮箱", dataIndex: "email", key: "email", width: "10%" },
  { title: "内容", dataIndex: "content", key: "content", width: "40%" },
  { title: "网址", dataIndex: "url", key: "url", width: "15%" },
  { title: "时间", dataIndex: "created", key: "created", width: "15%" },
  {
    title: "操作",
    key: "operation",
    scopedSlots: { customRender: "operation1" },
    width: "10%",
  },
];

import { comment, deleteComment } from "@/services/comment";
import moment from "dayjs";
export default {
  data () {
    return {
      data: [],
      childrenData: [],
      columns,
      childrenColumns,
      expandedRowKeys: [],
    };
  },
  mounted () {
    this.getCommentList();
  },
  methods: {
    expand (expanded, record) {
      this.expandedRowKeys = []; // 收起全部节点，只展开当前点击的那个（无法做到同时几个内层表格数据直接缓存在childrenData）
      if (expanded) {
        this.childrenData = []; // 清空二级数据
        let data = this.data.filter((item) => {
          // 寻找当前展开的二级数据
          return item._id == record._id;
        });
        this.childrenData = data[0].childrenData; // 给this.childrenData 重新赋值
        this.expandedRowKeys = [record._id]; // 展开当前点击
      }
    },
    handleDelete (record) {
      let id = { _id: record._id, id: record.id };
      deleteComment(id).then((res) => {
        if (res.data.code === 200) {
          if (record._id) {
            const data = [...this.data];
            this.data = data.filter((item) => item._id !== record._id);
            this.$message.success("删除成功"); // 提示是否成功
          } else {
            const data = [...this.childrenData];
            this.childrenData = data.filter((item) => item.id !== record.id);
            this.$message.success("删除成功"); // 提示是否成功
          }
        }
      });
    },
    getCommentList () {
      comment().then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((element) => {
            element.created = moment(res.data.data.created).format(
              "YYYY-MM-DD HH:mm:ss"
            ); //转换时间
          });
          this.data = res.data.data;
        }
      });
    },
  },
};
</script>