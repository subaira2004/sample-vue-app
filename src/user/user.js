import Vue from 'vue'
import Axios from 'axios'

var dataBind = { message: 'Hello Vue!'};

var user = new Vue({
    el:"#userApp",
    data:dataBind  ,
    created: function () {
      dataBind.message = "requesting";
      Axios.get('/users/json')
      .then(function (response) {
        // handle success
        dataBind.message =response.data;
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        dataBind.message =error;
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }  
})