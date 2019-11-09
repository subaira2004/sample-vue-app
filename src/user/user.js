import Vue from 'vue'
import Axios from 'axios'
import girdComponent from '../grid/grid.vue'
import userManipulationComponent from '../user/userManipulation.vue'

var editDeleteActionHtml = `
<button type="button" class="btn btn-outline-secondary" @click="editUser('#id')"> Edit <span class="oi oi-pencil"></span></button>
<button type="button" class="btn btn-outline-danger" @click="deleteUser('#id')"> Delete <span class="oi oi-x"></span></button>
`

var dataBind = {
  message: 'Hello Vue!',
  gridClass: ["table", "table-striped", "table-bordered"],
  gridCols: [
    { dataColumn: "name", title: "Name", colType: "string" },
    { dataColumn: "age", title: "Age", colType: "string" },
    { dataColumn: "designation", title: "Designation", colType: "string" },
    { dataColumn: "department", title: "Department", colType: "string" },
    { dataColumn: "action", title: "Action", colType: "template" }
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
    }
  },
  userManipulationProps: {
    mode: "add",
    id: "userModal"
  }
}

var user = new Vue({
  el: "#userApp",
  components: {
    'grid': girdComponent,
    'usermanipulation': userManipulationComponent
  },
  data: dataBind,
  created: function () {
    dataBind.message = "requesting";
  },
  methods: {
    newUser: function () {
      dataBind.userManipulationProps.mode = "add";
      $('#' + dataBind.userManipulationProps.id).modal('show');
    },
    editUser: function () {
      alert("edit");
      dataBind.userManipulationProps.mode = "edit";
      $('#' + dataBind.userManipulationProps.id).modal('show');
    },
    editUserData: function (userComp) {
      alert(userComp.mode);
    },
    deleteUser: function () {
      dataBind.userManipulationProps.mode = "add";
      $('#' + dataBind.userManipulationProps.id).modal('show');
    },
    gridLoad: function (comp) {
      var gotoPage = (comp && comp.pagerInstance) ? comp.pagerInstance.gotoPageNum : 1;
      Axios.get('/users/json?currentPage=' + gotoPage + '&pageSize=' + dataBind.gridPagerProps.pageSize)
        .then(function (response) {
          // handle success
          var tmpGridDataArr = response.data.users;
          for (var i = 0; i < tmpGridDataArr.length; i++) {
            tmpGridDataArr[i].action = editDeleteActionHtml.replace(/#id/g, tmpGridDataArr[i]._id)
          }
          comp.gridData = tmpGridDataArr;
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
})