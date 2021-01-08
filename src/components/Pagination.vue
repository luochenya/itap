<template>
  <div class="Pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      hide-on-single-page
      :pager-count="5"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: Number,
    pageSize: Number,
    currentPage: Number,
    handleCurrentChange: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.Pagination {
  display: flex;
  justify-content: center;
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #F2F2F2;
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    width: 32px;
    height: 32px;
    background: #1F2022;
    border-radius: 4px;
    border: 1px solid #252525;
    font-size: 15px;
    font-weight: 500;
    color: #666666;
    line-height: 32px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    width: 32px;
    height: 32px;
    background: #00AD69;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 500;
    color: #F2F2F2;
    line-height: 32px;
  }
}
</style>
