
<template>
  <div class="detail">
    <el-form :inline="true" :model="form" ref="form" class="demo-form-inline textL">
      <el-form-item label="转账方：" prop="fromUsername">
        <el-input v-model="form.fromUsername" placeholder="请输入转账方"></el-input>
      </el-form-item>
      <el-form-item label="收款方：" prop="toUsername">
        <el-input v-model="form.toUsername" placeholder="请输入收款方"></el-input>
      </el-form-item>
      <el-form-item label="时间段：" prop="date">
        <!-- <el-input v-model="form.user" placeholder="请选择时间段"></el-input> -->
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="币种：" prop="coinType">
        <el-select v-model="form.coinType" placeholder="请选择币种">
          <el-option label="AMY" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="onSubmit">查询</el-button>
        <el-button size="medium" plain @click="onReset('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createDate" label="交易时间"></el-table-column>
      <el-table-column prop="fromUsername" label="转账方"></el-table-column>
      <el-table-column prop="toUsername" label="收款方"></el-table-column>
      <el-table-column prop="coinType" label="币种"></el-table-column>
      <el-table-column prop="amount" label="数量"></el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="bottom">
            <div slot="content">{{ scope.row.remark}}</div>
            <i style="width:50px;">{{ scope.row.remark.slice(0,10)+"..."}}</i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="textR pagination"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        toUsername: "",
        fromUsername: "",
        coinType: "",
        date: ""
      },
      tableData: [
      ],
      pageSizes: [10, 20, 30, 40], //可选当前条数
      pageSize: 10, //当前显示条数size
      total: 0, //总 数 total
      currentPage: 1 //显示当前页current
    };
  },
  mounted() {
    this.getAPI(
      this.form.toUsername,
      this.form.fromUsername,
      this.form.coinType,
      this.form.date[0],
      this.form.date[1],
      this.currentPage,
      this.pageSize
    );
  },
  methods: {
    getAPI(
      toUsernameVal,
      fromUsernameVal,
      coinTypeVal,
      beginVal,
      endVal,
      currentVal,
      pageSizeVal
    ) {
      var that = this;
      this.$axios
        .post("/admin/tradeLog/page", {
          toUsername: toUsernameVal,
          fromUsername: fromUsernameVal,
          coinType: coinTypeVal,
          begin: beginVal,
          end: endVal,
          current: currentVal,
          pageSize: pageSizeVal
        })
        .then(function(response) {
          if (response.success == true) {
            that.tableData = response.data.records; //表格数据
            that.total = response.data.total; //总数据量
            that.currentPage = response.data.current; //第几页
            that.pageSize = response.data.size; //一页几条数据
          }
        })
        .catch(function(error) {
          that.$message({
            type: "error",
            message: "接口请求失败"
          });
        });
    },
    // 查询
    onSubmit() {
      console.log(this.form.date);
      this.getAPI(
        this.form.toUsername,
        this.form.fromUsername,
        this.form.coinType,
        this.form.date[0],
        this.form.date[1],
        "",
        ""
      );
    },
    // 重置
    onReset(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
      this.getAPI("", "", "", "", "", this.currentPage, this.pageSize);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getAPI(
        this.form.toUsername,
        this.form.fromUsername,
        this.form.coinType,
        this.form.date[0],
        this.form.date[1],
        this.currentPage,
        val
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getAPI(
        this.form.toUsername,
        this.form.fromUsername,
        this.form.coinType,
        this.form.date[0],
        this.form.date[1],
        val,
        this.pageSize
      );
    }
  }
};
</script>
