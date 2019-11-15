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
              <input
                type="text"
                class="form-control"
                v-model="userData.name"
                id="txtName"
                :disabled="mode!='New'"
              />
            </div>
            <div class="form-group">
              <label for="txtAge" class="col-form-label">Age</label>
              <input type="text" class="form-control" v-model="userData.age" id="txtAge" />
            </div>
            <div class="form-group">
              <label for="txtDepartment" class="col-form-label">Department</label>
              <input
                type="text"
                class="form-control"
                v-model="userData.department"
                id="txtDepartment"
              />
            </div>
            <div class="form-group">
              <label for="txtDesignation" class="col-form-label">Designation</label>
              <input
                type="text"
                class="form-control"
                v-model="userData.designation"
                id="txtDesignation"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" @click="saveUser">
            <span class="oi oi-check"></span>
            {{modalActionTitle}}
          </button>
          <button type="button" class="btn btn-outline-danger" @click="close">
            <span class="oi oi-x"></span> Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

var newUserData = {
  _id: "",
  name: "",
  age: 0,
  department: "",
  designation: ""
};

export default {
  props: {
    id: String
  },
  data: function() {
    return {
      userData: newUserData,
      mode: "New",
      title: "Add New User",
      modalClass: "modal fade",
      modalActionTitle: "Save"
    };
  },
  created: function() {
    this.$emit("on-load", this);
  },
  methods: {
    show: function() {
      $("#" + this.id).modal("show");
    },
    close: function() {
      $("#" + this.id).modal("hide");
    },
    saveUser: function() {
      this.$emit("on-save", this);
    }
  }
};
</script>