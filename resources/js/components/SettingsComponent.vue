<template>
  <div class="container-fluid">

    <div class="row">

      <div class="col-lg-6 col-12 ml-0 pl-0 mr-0 pr-0">
        <div class="bg-white p-4">
          <h6 class="text-primary font-weight-bolder">Update Password</h6>
          <div class="form-group">
            <label for="">Enter new password</label>
            <el-input type="password" v-model="password.updated" placeholder="Enter a password"/>
            <el-button type="primary" class="mt-3" @click="onSubmitNewPassword">Update Password</el-button>
            <small v-if="password.error">Please enter a valid password</small>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import axios from "axios";

    export default {
        name: "SettingsComponent",
        data(){
            return {
                password: {
                  updated: '',
                  error: false
                },
                failedResponse: ''
            }
        },
        computed: {
            ...mapGetters(['returnActiveUser'])
        },
        methods: {
            async onSubmitNewPassword() {

                if (this.password.updated.length !== 0) {

                    console.warn(this.password.updated);

                    const {data} = await axios.post(`api/company/user/${this.returnActiveUser.id}`,
                        {
                        password: this.password.updated,
                        }
                    );

                    this.failedResponse = data;

                    this.$notify({
                        title: 'Success',
                        message: 'Password was updated',
                        type: 'success'
                    });

                    this.password.updated = '';

                } else {

                    this.$notify({
                        title: 'Error',
                        message: 'Enter a valid password',
                        type: 'error'
                    });
                }


                console.warn(this.failedResponse);
            }
        }
    }
</script>

<style scoped>

</style>
