<template>
  <div>

    <div class="form-group">
      <label for="title">Title</label>
      <el-input
        id="title"
        type="text"
        placeholder="Please input"
        v-model="title.input"
        maxlength="75"
        show-word-limit
      />
    </div>

    <div class="form-group">
      <label for="detail">Detail</label>
      <el-input
        id="detail"
        type="textarea"
        placeholder="Please input"
        v-model="body.input"
        maxlength="255"
        show-word-limit
      />
    </div>

    <el-button type="primary" class="d-block" @click="handleNewCompanyEvent">
      Post New Event
    </el-button>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import axios from 'axios';

  export default {
    name: "NewEventComponent",
    data() {
      return {
        title: {
          input: '',
          error: false
        },
        body: {
          input: '',
          error: false
        }
      }
    },
    computed: {
      ...mapGetters(['returnCompanyNameAndEID', 'returnCurrentActiveCompany'])
    },
    methods: {
      ...mapActions(['storeNewSingleCompanyAlert']),
      async handleNewCompanyEvent() {

        if (this.returnCompanyNameAndEID.length !== 0) {
          console.log('Async handleNewCompanyEvent');
          await axios.post('/api/company/events', {
            company_name: this.returnCompanyNameAndEID[0],
            company_ein: this.returnCompanyNameAndEID[1],
            company_id: this.returnCurrentActiveCompany.id,
            title: this.title.input,
            body: this.body.input
          }).then(res => {

            if (res.data.status === 200) {
              console.log('Post Success ', res);

              // Push new event to store
              this.storeNewSingleCompanyAlert(res.data.data);

              // Reset inputs
              this.title.input = this.body.input = '';

              this.$notify({
                title: 'Success',
                message: 'Event was stored successfully.',
                type: 'success'
              });
            } else {
              this.$notify({
                title: 'Error',
                message: 'Could not store new event. Try again later.',
                type: 'error'
              });
            }

          });

        } else {
          this.$notify({
            title: 'Error',
            message: 'Select a Company before adding new events',
            type: 'error'
          });
        }
        return Promise.resolve();
      }
    }
  }
</script>

<style scoped>

</style>
