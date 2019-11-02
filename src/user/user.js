import Vue from 'vue'
import Axios from 'axios'


Vue.component('grid', {
  props: {
    gridClass: Array,
    gridCols: Array
  },
  data: function () {
    return {
      gridData: [{ id: "234" }]
    }
  },
  created: function () {
    this.onLoad();
  },
  methods: {
    onLoad: function () {
      this.$emit('on-load', this)
    }
  },
  template: `
            <table :class="gridClass">
              <thead>
                <tr>
                  <th v-for="col in gridCols">
                    {{col.title}}
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="rowData in gridData">
                <td v-for="col in gridCols">
                  {{rowData[col.dataColumn]}}
                </td>
              </tr>
              </tbody>
            </table>
  
  `
})



var dataBind = {
  message: 'Hello Vue!',
  gridClass: ["table", "table-striped", "table-dark"],
  gridCols: [
    { dataColumn: "name", title: "Name" },
    { dataColumn: "age", title: "Age" },
    { dataColumn: "designation", title: "Designation" },
    { dataColumn: "department", title: "Department" }
  ],
  gridData: [],
  gridLoad: function (comp) {
    Axios.get('/users/json')
      .then(function (response) {
        // handle success
        comp.gridData = response.data.users;
        dataBind.message = "data received!";
      })
      .catch(function (error) {
        // handle error
        dataBind.message = error;
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
}

var user = new Vue({
  el: "#userApp",
  data: dataBind,
  created: function () {
    dataBind.message = "requesting";
  }
})