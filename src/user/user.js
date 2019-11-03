import Vue from 'vue'
import Axios from 'axios'
import girdComponent from '../grid/grid.vue'

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
  components:{'grid':girdComponent},
  data: dataBind,
  created: function () {
    dataBind.message = "requesting";
  }
})