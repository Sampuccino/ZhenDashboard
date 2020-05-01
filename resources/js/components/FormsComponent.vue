<template>
  <div class="bg-white p-4">
    <table class="table">
      <thead>
      <tr>
        <th>Form Type</th>
        <th>Period</th>
        <th>File 1</th>
        <th>File 2</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(form, index) in this.returnActiveCompanyResearchAndDevelopmentData">
        <td scope="row">{{ form.return_type }}</td>
        <td>{{ form.period }}</td>
        <td>
          <a href="#">Form-url</a>
          <br>
          <el-collapse>
            <el-collapse-item title="File Upload" name="1">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </td>
        <td v-if="form.return_type === '941'">
          <a href="#">Form-url</a>
          <br>
          <el-collapse>
            <el-collapse-item title="File Upload" name="1">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </td>
        <td v-else class="bg-black"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "FormsComponent",
    computed: {
      ...mapGetters(['returnActiveCompanyResearchAndDevelopmentData']),
    },

    methods: {
      handlePreview() {
      },
      handleRemove() {
      }
    }
  }
</script>

<style scoped>
.bg-black {
  background: black;
}
</style>
