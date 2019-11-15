import vue from 'vue'
import axios from 'axios'
import girdComponent from '../grid/grid.vue'
import userManipulationComponent from '../user/userManipulation.vue'

var newUserData = function () {
  return {
    id: "",
    name: "",
    age: 0,
    department: "",
    designation: ""
  };
}

var dataBind = {
  message: 'Hello vue!',
  gridClass: ["table", "table-striped", "table-bordered"],
  gridCols: [
    { dataColumn: "name", title: "Name", colType: "string" },
    { dataColumn: "age", title: "Age", colType: "string" },
    { dataColumn: "designation", title: "Designation", colType: "string" },
    { dataColumn: "department", title: "Department", colType: "string" },
    { dataColumn: "action", title: "Action", colType: "action" }
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
    id: "userModal"
  },
  userManipulationComp: null,
  gridComp: null
}

var user = new vue({
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
    saveUserData: function (_userManipulationComp) {
      this.userManipulationComp = _userManipulationComp;
      var grdComp = this.gridComp;
      var usrComp = this.userManipulationComp;
      if (usrComp.mode === "New") { //save data
        axios.post('/users/new/ajax', usrComp.userData)
          .then(function (response) {
            console.log(response);
            usrComp.close();
            grdComp.onLoad();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {//update data
        axios.post('/users/edit/' + usrComp.userData.name + '/ajax', usrComp.userData)
          .then(function (response) {
            console.log(response);
            usrComp.close();
            grdComp.onLoad();
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    },
    onUserManipulationLoad: function (_userManipulationComp) {
      this.userManipulationComp = _userManipulationComp;
    },
    newUser: function () {
      var nwUsrData = newUserData();
      this.userManipulationComp.userData = nwUsrData;
      this.userManipulationComp.mode = "New";
      this.userManipulationComp.title = "Add New User";
      this.userManipulationComp.modalClass = "modal fade show";
      this.userManipulationComp.modalActionTitle = "Save";
      this.userManipulationComp.show();
    },
    onGridActionClick: function (gridComp) {
      var gridActionComp = gridComp.currentAction;
      if (gridActionComp.actionData.actionType === "edit") {
        this.editUser(gridActionComp.actionData.ref)
      }
      else if (gridActionComp.actionData.actionType === "delete") {
        this.deleteUser(gridActionComp.actionData.ref)
      }
    },
    editUser: function (name) {
      var tmpUsrComp = this.userManipulationComp;
      axios.get('/users/' + name + '/ajax')
        .then(function (response) {
          var editUsrData = response.data
          tmpUsrComp.userData = editUsrData;
          tmpUsrComp.mode = "edit";
          tmpUsrComp.title = "Edit User";
          tmpUsrComp.modalClass = "modal fade show";
          tmpUsrComp.modalActionTitle = "Update";
          tmpUsrComp.show();
        }).catch(function (error) {
          // handle error
          dataBind.message = error;
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    deleteUser: function (name) {
      var grdComp = this.gridComp;
      if (confirm("Would you like to delete : " + name + " ?")) {
        axios.get('/users/delete/' + name + '/ajax')
          .then(function (response) {
            console.log(response);
            grdComp.onLoad();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    gridLoad: function (comp) {
      this.gridComp = comp;
      var editUser = this.editUser;
      var deleteUser = this.deleteUser;
      var gotoPage = (comp && comp.pagerInstance) ? comp.pagerInstance.gotoPageNum : 1;
      axios.get('/users/json?currentPage=' + gotoPage + '&pageSize=' + dataBind.gridPagerProps.pageSize)
        .then(function (response) {
          console.log(editUser);
          // handle success
          var tmpGridDataArr = response.data.users;
          for (var i = 0; i < tmpGridDataArr.length; i++) {
            var tmpName = tmpGridDataArr[i].name

            tmpGridDataArr[i].gridActions = [
              {
                actionData: { actionType: "edit", ref: tmpName },
                actionHtml: "Edit <span class='oi oi-pencil'></span>",
                actionHref: "javascript:void(0)",
                actionClass: "btn btn-sm btn-outline-secondary mr-1"
              }, {
                actionData: { actionType: "delete", ref: tmpName },
                actionHtml: "Delete <span class='oi oi-delete'></span>",
                actionHref: "javascript:void(0)",
                actionClass: "btn btn-sm btn-outline-danger"
              }
            ]
          }
          comp.gridData = tmpGridDataArr;
          console.log(tmpGridDataArr);
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