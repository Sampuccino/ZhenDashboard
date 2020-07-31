<template>
  <div class="container-fluid">
    <div class="row bg-white p-4">
      <div class="col-12">
        <h5>Financial Data</h5>
        <h6 v-if="this.returnAnalyzerYearEnds.length === 0">
          Please select at least one year under
          <b>Qualifying Questions</b>
        </h6>
      </div>

      <div class="col-12" v-if="this.returnAnalyzerYearEnds.length > 0">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane
            v-for="(item, index) in this.returnAnalyzerYearEnds"
            :key="index"
            :label="item.year"
            :name="index.toString()"
          >
            <section>
              <article>
                <h5 class="text-primary">Employees</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Job Title</th>
                      <th>2018 W-2 Box 1 Wage</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(d, dindx) in d1">
                      <td scope="row">{{ d }}</td>
                      <td></td>
                      <td></td>
                      <td>edit / delete</td>
                    </tr>
                  </tbody>
                </table>
              </article>

              <article>
                <h5 class="text-primary">Supplies</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row"></td>
                      <td></td>
                      <td></td>
                      <td>edit / delete</td>
                    </tr>
                  </tbody>
                </table>
              </article>

              <article>
                <h5 class="text-primary">Contractors</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row"></td>
                      <td></td>
                      <td></td>
                      <td>edit / delete</td>
                    </tr>
                  </tbody>
                </table>
              </article>
            </section>

            <hr />

            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <b>{{ newEntrySelected || 'Select new entry' }}</b>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="employee">New Employee entry</el-dropdown-item>
                <el-dropdown-item command="supplies">New Supplies entry</el-dropdown-item>
                <el-dropdown-item command="contractors">New Contractors entry</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <hr />

            <section v-show="newEntrySelected === 'employee'">
              <h5 class="text-primary">Add New Employees</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Job Title</th>
                    <th>2018 W-2 Box 1 Wage</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">
                      <el-input type="text" v-model="name.value" />
                    </td>
                    <td>
                      <el-input type="text" v-model="title.value" />
                    </td>
                    <td>
                      <el-input type="text" v-model="amount.value" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section v-show="newEntrySelected === 'supplies'">
              <h6 class="text-primary">Add New Supplies</h6>
              <table class="table">
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">
                      <el-input type="text" v-model="name.value" />
                    </td>
                    <td>
                      <el-input type="text" v-model="amount.value" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section v-show="newEntrySelected === 'contractors'">
              <h5 class="text-primary">Add New Contractors</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">
                      <el-input type="text" v-model="name.value" />
                    </td>
                    <td>
                      <el-input type="text" v-model="amount.value" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <el-button type="primary" @click="onHandleNewEntry(item)">Save</el-button>
          </el-tab-pane>
        </el-tabs>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeName: "first",
      newEntrySelected: "",
      name: {
        value: "",
        error: "",
      },
      title: {
        value: "",
        error: "",
      },
      amount: {
        value: "",
        error: "",
      },
      d1: [1,2,3],
      d2: [6,5,4],
      source: []
    };
  },
  computed: {
    ...mapGetters(["returnAnalyzerYearEnds"]),
  },
  methods: {
    handleClick(tab, event) {
      this.source = this.d1;
      console.log(event.explicitOriginalTarget.innerText);
    },
    handleCommand(command) {
      this.newEntrySelected = command;
    },
    onHandleNewEntry(_item) {
      // Send to state based on the selection type

      switch (this.newEntrySelected) {
        case "employee":
          this.d1.push(100)
          break;
        case "supplies":
          break;
        case "contractors":
          break;
        default:
          break;
      }

      console.warn(
        _item.id,
        " ",
        _item.year,
        " ",
        this.newEntrySelected,
        "   ",
        this.name.value,
        " ",
        this.title.value,
        " ",
        this.amount.value
      );
    },
  },
};
</script>

<style scoped>
</style>
