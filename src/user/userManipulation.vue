<template>
  <div class="modal fade" :id="id" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="txtName" class="col-form-label">Name</label>
              <input type="text" class="form-control" :bind="userData.name" id="txtName" />
            </div>
            <div class="form-group">
              <label for="txtAge" class="col-form-label">Age</label>
              <input type="text" class="form-control" :bind="userData.age" id="txtAge" />
            </div>
            <div class="form-group">
              <label for="txtDepartment" class="col-form-label">Department</label>
              <input
                type="text"
                class="form-control"
                :bind="userData.department"
                id="txtDepartment"
              />
            </div>
            <div class="form-group">
              <label for="txtDesignation" class="col-form-label">Designation</label>
              <input
                type="text"
                class="form-control"
                :bind="userData.designation"
                id="txtDesignation"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="saveUser"
          >{{modalActionTitle}}</button>
          <button type="button" class="btn btn-outline-danger" @click="close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

var newUserData = {
  id: "",
  name: "",
  age: 0,
  department: "",
  designation: ""
};

export default {
  props: {
    mode: String,
    id: String
  },
  data: function() {
    return {
      userData: newUserData,
      title: "Add New User",
      modalClass: "modal fade",
      modalActionTitle: "Save"
    };
  },
  created: function() {
    this.initUser();
  },
  methods: {
    initUser: function() {
      if (this.mode === "add") {
        this.userData = newUserData;
        this.title = "Add New User";
        this.modalClass = "modal fade show";
        this.modalActionTitle = "Save";
      } else{
        this.$emit("on-edit", this);
      }
    },
    close: function() {
      $("#"+this.id).modal('hide');
    },
    saveUser: function() {}
  }
};
</script>