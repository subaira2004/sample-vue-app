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
  gridPagerProps: {
    pageSize: 5,
    totalRecords: 0,
    pagerClasses: {
      pagination: "pagination",
      pageLink: "page-link",
      pageItem: "page-item",
      active: "active",
      disabled: "disabled"
    },
  },
  gridLoad: function (comp) {
    var gotoPage = (comp && comp.pagerInstance) ? comp.pagerInstance.gotoPageNum : 1;
    Axios.get('/users/json?currentPage=' + gotoPage + '&pageSize=' + dataBind.gridPagerProps.pageSize)
      .then(function (response) {
        // handle success
        comp.gridData = response.data.users;
        dataBind.gridPagerProps.totalRecords = parseInt(response.data.records)
        if (comp.pagerInstance) {
          comp.pagerInstance.currentPage = parseInt(response.data.currentPage);
        }
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
  components: { 'grid': girdComponent },
  data: dataBind,
  created: function () {
    dataBind.message = "requesting";
  }
})