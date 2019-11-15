<template>
  <a
    :action-href="actionHref"
    :class="actionClass"
    @click="actionClick"
    v-html="actionHtml"    
  ></a>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    actionHtml: String,
    actionHref: String,
    actionClass: String,
    actionData:Object
  },
  methods: {
    actionClick: function() {    
      this.$emit("action-click", this);
    }
  }
};
</script>