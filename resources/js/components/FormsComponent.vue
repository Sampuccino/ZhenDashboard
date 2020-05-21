<template>
  <div class="bg-white p-4">
    <table class="table">
      <thead>
      <tr>
        <th>Form Type</th>
        <th>Quarter</th>
        <th>Year</th>
        <th>Period</th>
        <th>File 1</th>
        <th>File 2</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(form, index) in this.returnCompanyForms" :key="index">
        <td scope="row">
          {{ form.form_type }}</td>
        <td>{{ form.quarter }}</td>
        <td>{{ form.year }}</td>
        <td>{{ form.period }}</td>
        <td>
          <section v-if="form.file_one_url !== null">
          <a :href="form.file_one_url" target="_blank">
            {{ clipFileName(form.file_one_url) }}
          </a>
            <el-button type="text"
                       icon="el-icon-delete"
                       class="ml-5 text-danger"
                       @click="onDeleteF1(form)"/>
          </section>

          <i v-else>No file found</i>
          <br>
          <el-collapse>
            <el-collapse-item title="File Upload" name="1">
              <el-upload
                class="upload-demo"
                drag
                :action="'api/company/form-upload/' + form.id"
                name="file_upload_one"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleChange(form.id)"
                :on-success="handleSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </td>
        <td v-if="form.form_type === '941' || form.form_type === '941X' || form.form_type === '1120'">
          <section v-if="form.file_two_url !== null">
            <a :href="form.file_two_url" target="_blank">
              {{ clipFileName(form.file_two_url) }}
            </a>
            <el-button type="text"
                       icon="el-icon-delete"
                       class="ml-5 text-danger"
                       @click="onDeleteF2(form)"/>
          </section>
          <i v-else>No file found</i>
          <br>
          <el-collapse>
            <el-collapse-item title="File Upload" name="2">
              <el-upload
                class="upload-demo"
                drag
                :action="'api/company/form-upload/' + form.id"
                name="file_upload_two"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleChange(form.id)"
                :on-success="handleSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </td>
        <td v-else></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "FormsComponent",
    computed: {
      ...mapGetters(['returnCompanyForms'])
    },
    methods: {
      ...mapActions(['updateCompanyFormsWithUpdatedCompany', 'onDeleteCompanyForm']),
      handlePreview() {
      },
      handleRemove() {
        console.log('handleRemove')
      },
      handleChange(file) {
        console.log('handleChange', file);
      },
      handleSuccess(response) {
      console.log('handleSuccess Response ', response);

      // 201
      // Update store with Object
      // Show success modal
      this.updateCompanyFormsWithUpdatedCompany(response);

      this.$notify({
        title: 'Success',
        message: 'Form was stored successfully.',
        type: 'success'
      });

      },
      clipFileName(file) {
        return file.substring(76);
      },
      onDeleteF1(form) {
        console.warn('onDeleteF1');
        this.onDeleteCompanyForm({id: form.id, file_one_url: form.file_one_url.substr(66), selected: 1});
      },
      onDeleteF2(form) {
        console.warn('onDeleteF2');
        this.onDeleteCompanyForm({id: form.id, file_two_url: form.file_two_url.substr(66), selected: 2});
      }
    }
  }
</script>

<style scoped>
.bg-black {
  background: black;
}
</style>
