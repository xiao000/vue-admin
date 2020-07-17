<template>
  <div class="airdrop">
    <el-form :inline="true" :model="form" ref="form" class="demo-form-inline textL">
      <el-form-item label="手机号：" prop="username">
        <el-input v-model="form.username" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="来源：" prop="origin">
        <el-input v-model="form.origin" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="正常" value="shanghai"></el-option>
          <el-option label="锁定" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="onSubmit">查询</el-button>
        <el-button size="medium" plain @click="onReset('form')">重置</el-button>
        <el-button size="medium" type="primary">导出excel</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="createDate" sortable label="注册时间" width="180"></el-table-column>
      <el-table-column prop="username" label="手机号"></el-table-column>
      <el-table-column prop="asset" sortable label="AMY总量"></el-table-column>
      <el-table-column prop="l1Reward" sortable label="一级推荐奖励"></el-table-column>
      <el-table-column prop="l2Reward" sortable label="二级推荐奖励"></el-table-column>
      <el-table-column prop="origin" label="来源"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
        :filters="[{ text: '正常', value: 1 }, { text: '锁定', value: 0 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.status == '1' ? 'success' : 'danger'"
            disable-transitions
          >
            <i v-if="scope.row.status==1">正常</i>
            <i v-else-if="scope.row.status==0">锁定</i>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary" plain
            @click="handle(scope.$index, scope.row)"
            v-if="scope.row.status=='0'"
          >解锁</el-button>
          <el-button
            size="mini"
            type="primary" plain
            @click="handle(scope.$index, scope.row)"
            v-else-if="scope.row.status=='1'"
          >锁定</el-button>
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
      loading: true,
      form: {
        username: "",
        origin: "",
        status: ""
      },
      tableData: [
      ],
      pageSizes: [10, 20, 30, 40], //可选当前条数
      pageSize: 10, //当前显示条数size
      total: 0, //总  数 total
      currentPage: 1 //显示当前页current
    };
  },
  mounted() {
    this.getAPI(
      this.form.username,
      this.form.origin,
      this.form.status,
      this.currentPage,
      this.pageSize
    );
  },
  methods: {
    // 表格标签
    filterTag(value, row) {
      return row.tag === value;
    },
    // 查询
    onSubmit() {
      this.getAPI(
        this.form.username,
        this.form.origin,
        this.form.status,
        "",
        ""
      );
    },
    // 重置
    onReset(formName) {
      this.$nextTick(()=>{
        this.$refs[formName].resetFields();
      })
      this.getAPI("", "", "", this.currentPage, this.pageSize);
    },
    getAPI(usernameVal, originVal, statusval, currentVal, pageSizeVal) {
      var that = this;
      this.$axios
        .post("/admin/user/page", {
          username: usernameVal,
          origin: originVal,
          status: statusval,
          current: currentVal,
          pageSize: pageSizeVal
        })
        .then(function(response) {
          if (response.success == true) {
            that.loading = false;
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
    }, //
    // 导出excel
    // getExcel() {
    //   var that = this;
    //   that
    //     .$axios({
    //       method: "post",
    //       responseType: "blob"
    //     })
    //     .then(res => {
    //       const link = document.createElement("a");
    //       let blob = new Blob([res]);
    //       link.style.display = "none";
    //       link.href = URL.createObjectURL(blob);
    //       link.setAttribute("download", "空投用户管理.xlsx");
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     })
    //     .catch(error => {});
    // },
    // 锁定/解锁
    handle(index, row) {
      var that = this,
        rowStatus;
      if (row.status == 0) {
        rowStatus = 1;
      } else {
        rowStatus = 0;
      }
      this.$axios
        .post(that.$baseURL + "/admin/user/status", {
          username: row.username,
          status: rowStatus
        })
        .then(function(response) {
          if (response.success == true) {
            that.getAPI(
              that.form.username,
              that.form.origin,
              that.form.status,
              that.currentPage,
              that.pageSize
            );
          }
        })
        .catch(function(error) {
          that.$message({
            type: "error",
            message: "接口请求失败"
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAPI(
        this.form.username,
        this.form.origin,
        this.form.status,
        this.currentPage,
        val
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAPI(
        this.form.username,
        this.form.origin,
        this.form.status,
        val,
        this.pageSize
      );
    }
  }
};
</script>
