<template>
  <div class="row bg-white p-4 mb-3">

    <div class="col-5">
      <el-dropdown>
        <el-button type="primary">
          Clients List<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="col-3 my-auto">
      <i class="el-icon-phone"></i> (111) 111-1111
    </div>
    <div class="col-4 my-auto">
      <i class="el-icon-message"></i> example@example.com
    </div>

  </div>
</template>

<script>
  export default {
    name: "ClientDetailsHeaderComponent"
  }
</script>

<style scoped>

</style>
