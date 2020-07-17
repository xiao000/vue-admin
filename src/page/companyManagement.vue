
<template>
  <div class="companyManagement">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline textL">
        <el-form-item label="公司名称：" prop="company">
          <el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contacts">
          <el-input v-model="form.contacts" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="onSubmit">查询</el-button>
          <el-button size="medium" plain @click="onReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createDate" label="申请时间"></el-table-column>
        <el-table-column prop="company" label="公司名称"></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="method" label="联系方式"></el-table-column>
        <el-table-column prop="remarks" label="合作事宜"></el-table-column>
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
        company: "",
        contacts: ""
      },
      tableData: [
      ],
      pageSizes: [10, 20, 30, 40], //可选当前条数
      pageSize: 10, //当前显示条数size
      total: 0, //总 total
      currentPage: 1 //显示当前页current
    };
  },
  mounted() {
    this.getAPI("", "", this.currentPage, this.pageSize);
  },
  methods: {
    getAPI(companyVal, contactsVal, currentVal, pageSizeVal) {
      var that = this;
      this.$axios
        .post("/admin/contact/page", {
          company: companyVal,
          contacts: contactsVal,
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
     // 重置
    onReset(formName) {
      this.$nextTick(()=>{
        this.$refs[formName].resetFields();
      })
      this.getAPI("", "",this.currentPage, this.pageSize);
    },
    // 查询
    onSubmit() {
      this.getAPI(
        this.form.company,
        this.form.contacts,
        this.currentPage,
        this.pageSize
      );
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.getAPI(this.form.company, this.form.contacts, this.currentPage, val);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getAPI(this.form.company, this.form.contacts, val, this.pageSize);
    }
  }
};
</script>
