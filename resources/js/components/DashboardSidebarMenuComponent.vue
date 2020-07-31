<template>
  <div>
    <el-menu
      :default-active="(this.returnActiveUser.status === 'Admin') ? '2.1' : '2'"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect">

      <el-menu-item index="1" v-if="this.returnActiveUser.status === 'Admin'">
        <i class="el-icon-key"></i>
        <span>Users</span>
      </el-menu-item>

      <el-menu-item index="2">
        <template slot="title">
          <i class="el-icon-odometer"></i>
          <span>Dashboard</span>
        </template>
      </el-menu-item>

      <el-menu-item index="3">
        <i class="el-icon-paperclip"></i>
        <span>R&D Credits</span>
      </el-menu-item>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>Forms</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4.1">R&D</el-menu-item>
          <el-menu-item index="4.2">PoA & SoW Attachments</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="5">
        <i class="el-icon-document"></i>
        <span>IRS Forms</span>
      </el-menu-item>

      <el-menu-item index="6">
        <i class="el-icon-user-solid"></i>
        <span>Profile</span>
      </el-menu-item>

      <el-menu-item index="7" v-if="this.returnActiveUser.status === 'Admin'">
        <i class="el-icon-s-tools"></i>
        <span>Setup</span>
      </el-menu-item>

      <el-menu-item index="8">
        <i class="el-icon-s-tools"></i>
        <span>Settings</span>
      </el-menu-item>

      <el-submenu index="9">
        <template slot="title">
          <i class="el-icon-s-opportunity"></i>
          <span>Analyzer</span>
        </template>
        <el-menu-item-group title="Getting Started">
          <el-menu-item index="9.1">Qualifying Questions</el-menu-item>
          <el-menu-item index="9.2">Financial Data</el-menu-item>
          <el-menu-item index="9.3">Qualifying Percentages</el-menu-item>
          <el-menu-item index="9.3">Project Documentation</el-menu-item>
          <el-menu-item index="9.3">Reports</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
    name: "DashboardSidebarMenuComponent",
    computed:{
      ...mapGetters(['returnActiveUser'])
    },
    methods: {
      ...mapActions(['setSelectedMenu']),
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose() {
      },
      handleSelect(menuIndex) {
        this.setSelectedMenu(menuIndex);
        console.log('handleSelect ', typeof menuIndex, '  ', menuIndex)
      }
    }
  }
</script>

