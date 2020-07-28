<template>
    <div class="container-fluid bg-white p-4">
        <div class="row justify-content-center">

            <table v-show="!isFillingOut" class="table col-12">
                <thead>
                <tr>
                    <th width="90%">Form</th>
                </tr>
                </thead>
                <tbody v-for="(form, index) in forms">
                <tr :class="{'bg-light': (index%2 ===0) }">
                    <td>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card-header bg-dark text-white font-weight-bold">{{ form.title }}</div>
                                </div>
                                <div class="col-3 mt-2">
                                    <img :src="form.imageSource" class="img-fluid" alt="">
                                </div>
                                <div class="col-9 my-auto">
                                    <h4><span class="text-primary">{{ form.title }}:</span> {{ form.name }}</h4>
                                    <button class="btn btn-primary mt-3" v-on:click="setActiveForm(form.code)">Select {{ form.title }}</button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

        <!--<div v-if="isFillingOut">

            <div class="row">
                <div class="col-3">
                    <ul class="list-group">
                        <li class="list-group-item"
                            :class="{'active': showPersonal}"
                            @click="setActiveForm('Personal')">Common Details</li>
                        <li class="list-group-item"
                            :class="{'active': setActive.t8974}"
                            v-show="checkedForms.includes('8974')"
                            v-on:click="setActiveForm('t8974')">Form 8974
                          <span v-show="errors.form8974" class="ml-2 alert-danger p-2">Has Error(s)</span>
                        </li>
                        <li class="list-group-item"
                            :class="{'active': setActive.t941}"
                            v-show="checkedForms.includes('941')"
                            v-on:click="setActiveForm('t941')">Form 941
                          <span v-show="errors.form941" class="ml-2 alert-danger p-2">Has Error(s)</span>
                        </li>
                      <li class="list-group-item"
                            :class="{'active': setActive.t941X}"
                            v-show="checkedForms.includes('941X')"
                            v-on:click="setActiveForm('t941X')">Form 941-X
                          <span v-show="errors.form941X" class="ml-2 alert-danger p-2">Has Error(s)</span>
                        </li>
                        <li class="list-group-item"
                            :class="{'active': setActive.t941SB}"
                            v-show="checkedForms.includes('941SB')"
                            v-on:click="setActiveForm('t941SB')">Form Schedule B
                          <span v-show="errors.form941SB" class="ml-2 alert-danger p-2">Has Error(s)</span>
                        </li>
                      <li class="list-group-item"
                            :class="{'active': setActive.t6765}"
                            v-show="checkedForms.includes('6765')"
                            v-on:click="setActiveForm('t6765')">Form 6765
                          <span v-show="errors.form6765" class="ml-2 alert-danger p-2">Has Error(s)</span>
                        </li>
                    </ul>
                </div>
                <div class="col-9">
                    <p>Use the left menu to alternate between forms or use the download button to download all
                        working forms.</p>
                    <button class="btn btn-warning" @click="returnToStart">Back</button>
                    <button class="btn btn-primary" @click="sendDownloadEvent">Download</button>
                </div>
                <div class="col-12">
                    <personal-details v-show="showPersonal"/>
                </div>
                <div class="col-12">
                    <form_8974 ref="form8974" v-show="setActive.t8974" disableDownload="Y"/>
                </div>
                <div class="col-12">
                    <form_941 ref="form941"  v-show="setActive.t941" disableDownload="Y" :formUrl="type_941_url"/>
                </div>
              <div class="col-12">
                    <form_941-x ref="form941X"  v-show="setActive.t941X" disableDownload="Y" :formUrl="type_941x_url"/>
                </div>
                <div class="col-12">
                    <form_941-s ref="form941SB" v-show="setActive.t941SB" disableDownload="Y" :formUrl="type_941s_url"/>
                </div>
              <div class="col-12">
                  <form_6765 ref="form6765" v-show="setActive.t6765" disableDownload="Y" :formUrl="type_6765_url"/>
              </div>
              <div class="col-12">
                  <form_3523 ref="form3523" v-show="setActive.t3523" disableDownload="Y" :formUrl="type_3523_url"/>
              </div>
            </div>

        </div>-->

        <div class="col-12" id="formScrollToPlaceholder"></div>

        <form_8974 v-show="activeForm_8974 && !isFillingOut" :disableDownload="'N'"/>
        <form_941  v-show="activeForm_941 && !isFillingOut" :formUrl="type_941_url" :disableDownload="'N'"/>
        <form_941-s v-show="activeForm_941_Schedule_B && !isFillingOut" :formUrl="type_941s_url" :disableDownload="'N'"/>
        <form_941-x v-show="activeForm_941X && !isFillingOut" :formUrl="type_941x_url"  :disableDownload="'N'"/>
        <form_6765 v-show="activeForm_6765 && !isFillingOut" :formUrl="type_6765_url" :disableDownload="'N'"/>
        <form_3523 v-show="activeForm_3523 && !isFillingOut" :formUrl="type_3523_url" :disableDownload="'N'"/>
        <form_8821 v-show="activeForm_8821 && !isFillingOut" :formUrl="type_8821_url" :disableDownload="'N'"/>
        <form_941_2020_-component v-show="activeForm_941_2020 && !isFillingOut" :formUrl="type_941_2020_url" :disableDownload="'N'"/>

    </div>
</template>

<script>
    import {mapGetters} from "vuex"

    import Form_8974 from "./IRS Forms/Form_8974";
    import Form_941 from "./IRS Forms/Form_941";
    import Form_941S from "./IRS Forms/Form_941S";
    import Form_941X from "./IRS Forms/Form_941X";
    import PersonalDetails from "./IRS Forms/common/PersonalDetails";
    import Form_6765 from "./IRS Forms/Form_6765";
    import Form_3523 from "./IRS Forms/Form_3523";
    import Form_8821 from "./IRS Forms/Form_8821";
    import Form_941_2020_Component from "./IRS Forms/Form_941_2020_Component";

    export default {
    components: {
        Form_941_2020_Component,
        Form_8821, Form_3523, Form_6765, Form_941X, PersonalDetails, Form_941, Form_8974, Form_941S},
    props: {
      type_8974: String,
      type_941: String,
      type_941_url: String,
      type_941s_url: String,
      type_941s: String,
      type_941x_url: String,
      type_941x: String,
      type_6765: String,
      type_6765_url: String,
      type_3523: String,
      type_3523_url: String,
      type_8821: String,
      type_8821_url: String,
      type_941_2020: String,
      type_941_2020_url: String
    },
    data: function() {
      return {
        forms: [
          {
          title: 'Form 8974',
          imageSource: this.type_8974,
          name: 'Qualified Small Business Payroll Tax Credit for Increasing Research Activities',
          code: '8974'
         },
         {
          title: 'Form 941',
          imageSource: this.type_941,
          name: "Employer's Quarterly Federal Tax Return",
          code: '941'
         },
        {
          title: 'Form 941–X',
          imageSource: this.type_941x,
          name: "Adjusted Employers Quarterly Federal Tax Return or Claim for Refund",
          code: '941X'
         },
         {
          title: 'Schedule B',
          imageSource: this.type_941s,
          name: "Report of Tax Liability for Semiweekly Schedule Depositors",
          code: '941SB'
         },
        {
          title: 'Form 6765',
          imageSource: this.type_6765,
          name: "Credit for Increasing Research Activities",
          code: '6765'
        },
        {
          title: 'Form 3523',
          imageSource: this.type_3523,
          name: "Research Credit",
          code: '3523'
        },
        {
          title: 'Form 8821',
          imageSource: this.type_8821,
          name: "Tax Information Authorization",
          code: '8821'
        },
        {
          title: 'Form 941 2020',
          imageSource: this.type_941_2020,
          name: "Tax Information Authorization",
          code: '941_2020'
        }
        ],
        activeForm_8974: false,
        activeForm_941: false,
        activeForm_941X: false,
        activeForm_941_Schedule_B: false,
        activeForm_6765: false,
        activeForm_3523: false,
        activeForm_8821: false,
        activeForm_941_2020: false,
        checkedForms: [],
        isFillingOut: false,
        showPersonal: true,
        setActive: {
            t8974: false,
            t941: false,
            t941X: false,
            t941SB: false,
            t6765: false,
            t3523: false,
            t8821: false,
            t941_2020: false,
        },
        errors: {
          form8974: false,
          form941: false,
          form941X: false,
          form941SB: false,
          form6765: false,
          form3523: false,
        }
      }
    },
    methods: {
      ...mapGetters(['returnTitle']),
      setActiveForm(arg) {

        switch (arg) {
          case '8974':
            this.activeForm_8974 = !this.activeForm_8974;
            this.activeForm_941 = this.activeForm_941_Schedule_B = this.activeForm_941X = this.activeForm_8821 = this.activeForm_941_2020 = this.showPersonal = false;
            break;
          case 't8974':
            this.setActive.t8974 = !this.setActive.t8974;
            this.setActive.t941 = this.setActive.t941SB = this.setActive.t941X = this.setActive.t941_2020 = this.showPersonal = false;
            break;
          case '941':
            console.log('941');
            this.activeForm_941 = !this.activeForm_941;
            this.activeForm_8974 = this.activeForm_941_Schedule_B = this.activeForm_941X = this.activeForm_8821 = this.activeForm_941_2020 = this.showPersonal = false;
            break;
          case 't941':
            console.log('t941');
                this.setActive.t941 = !this.setActive.t941;
                this.setActive.t8974 = this.setActive.t941SB = this.setActive.t941X = this.setActive.t941_2020 = this.showPersonal = false;
            break;
          case '941X':
            console.log('941X');
            this.activeForm_941X = !this.activeForm_941X;
            this.activeForm_941 = this.activeForm_8974 = this.activeForm_941_Schedule_B = this.activeForm_8821 = this.activeForm_941_2020 = this.showPersonal = false;
            break;
          case 't941X':
            console.log('t941X');
            this.setActive.t941X = !this.setActive.t941X;
            this.activeForm_941 = this.setActive.t8974 = this.setActive.t941SB = this.setActive.t941_2020 = this.showPersonal = false;
            break;
          case '941SB':
            console.log('941SB');
            this.activeForm_941_Schedule_B = !this.activeForm_941_Schedule_B;
            this.activeForm_941 = this.activeForm_8974 = this.activeForm_941X = this.activeForm_8821 = this.activeForm_941_2020 = this.showPersonal = false;
            break;
          case 't941SB':
            console.log('t941SB');
              this.setActive.t941SB = !this.setActive.t941SB;
              this.setActive.t8974 = this.setActive.t941 = this.setActive.t941X = this.setActive.t941_2020 = this.showPersonal = false;
            break;
          case '6765': // code key from forms array object
              this.activeForm_6765 = !this.activeForm_6765;
              this.activeForm_941 = this.activeForm_8974 = this.activeForm_941X = this.activeForm_941_Schedule_B = this.activeForm_8821 = this.activeForm_941_2020 = this.showPersonal = false;
              break;
          case 't6765': // active state
            this.setActive.t6765 = !this.setActive.t6765;
            this.setActive.t8974 = this.setActive.t941 = this.setActive.t941X = this.setActive.t941_2020 = this.showPersonal = false;
            break;
          case '3523': // code key from forms array object
              this.activeForm_3523 = !this.activeForm_3523;
              this.activeForm_6765 = this.activeForm_941 = this.activeForm_8974 = this.activeForm_941X = this.activeForm_941_Schedule_B = this.activeForm_8821 = this.activeForm_941_2020 = this.showPersonal = false;
              break;
          case 't3523': // active state
            this.setActive.t3523 = !this.setActive.t3523;
            this.setActive.t6765 = this.setActive.t8974 = this.setActive.t941 = this.setActive.t941X = this.setActive.t941_2020 = this.showPersonal = false;
            break;
          case '8821': // code key from forms array object
            this.activeForm_8821 = !this.activeForm_8821;
            this.activeForm_941 = this.activeForm_8974 = this.activeForm_941X = this.activeForm_941_Schedule_B = this.activeForm_6765 = this.activeForm_3523 = this.activeForm_941_2020 = this.showPersonal = false;
            break;
          case 't8821': // active state
            this.setActive.t8821 = !this.setActive.t8821;
            this.setActive.t8974 = this.setActive.t941 = this.setActive.t941X = this.setActive.t941_2020 = this.showPersonal = false;
            break;

            /*
            * t941_2020
            * */

          case '941_2020': // code key from forms array object
            this.activeForm_941_2020 = !this.activeForm_941_2020;
            this.activeForm_941 = this.activeForm_8974 = this.activeForm_941X = this.activeForm_941_Schedule_B = this.activeForm_6765 = this.activeForm_3523 = this.activeForm_8821 = this.showPersonal = false;
            break;
          case 't941_2020': // active state
            this.setActive.t941_2020 = !this.setActive.t941_2020;
            this.setActive.t8974 = this.setActive.t941 = this.setActive.t941X = this.setActive.t8821 = this.showPersonal = false;
            break;

          case 'Personal':
            console.log('Personal');
            this.showPersonal = !this.showPersonal;
            this.setActive.t8974 = this.setActive.t941 = this.setActive.t941SB = this.setActive.t941X = false;
            break;
        }

        // Scroll to
        $('html, body').animate({
          scrollTop: $('#formScrollToPlaceholder').offset().top
        }, 800, function(){

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = $('#formScrollToPlaceholder');
        });

      },
        continueWithSelectedForms() {
          console.log(this.checkedForms);
          // console.warn('Add in form 8974 if 941 or 941X is present.');
            if(this.checkedForms.length > 1) this.isFillingOut = true;
        },
      returnToStart() {
        this.isFillingOut = !this.isFillingOut;
      },
      sendDownloadEvent() {
        /*
        * Check which forms are selected
        * Try to download form 8974.
        * */
        if (this.checkedForms.includes('8974')) {
          const _validated = this.$refs.form8974.validateFormFields();
          if (_validated) {
            this.$refs.form8974.exportToPDF();
            this.errors.form8974 = false;
          } else {
            /* Toggle Error on Tab*/
            this.errors.form8974 = true;
          }
        }

        if (this.checkedForms.includes('941')) {
          const _validated = this.$refs.form941.validateFormFields();
          if (_validated) {
            this.$refs.form941.exportToPDF();
            this.errors.form941 = false;
          } else {
            /* Toggle Error on Tab*/
            this.errors.form941 = true;
          }
        }

        if (this.checkedForms.includes('941X')) {
          const _validated = this.$refs.form941X.validation();
          console.warn('941X Validation with a value of ', _validated);
          if (_validated) {
            this.$refs.form941X.exportToPDF();
            this.errors.form941X = false;
          } else {
            /* Toggle Error on Tab*/
            this.errors.form941X = true;
          }
        }

        if (this.checkedForms.includes('941SB')) {
          const _validated = this.$refs.form941SB.validation();
          if (_validated) {
            this.$refs.form941SB.exportToPDF();
            this.errors.form94SB1 = false;
          } else {
            /* Toggle Error on Tab*/
            this.errors.form941SB = true;
          }
        }

        if (this.checkedForms.includes('6765')) {
          /* This form has 3 validations due to individual pieces */
          const _validated = (this.$refs.form6765.validationSectionA() && this.$refs.form6765.validationSectionCandD() || this.$refs.form6765.validationSectionB() && this.$refs.form6765.validationSectionCandD());
          if (_validated) {
            this.$refs.form6765.exportToPDF();
            this.errors.form6765 = false;
          } else {
            /* Toggle Error on Tab*/
            this.errors.form6765 = true;
          }
        }

      }
    }
  }
</script>

<style scoped>
    button {
        border-radius: 0;
    }
</style>
