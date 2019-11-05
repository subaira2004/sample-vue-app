
<template>
  <table :class="gridClass">
    <thead>
      <tr>
        <th v-for="col in gridCols">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rowData in gridData">
        <td v-for="col in gridCols">{{ rowData[col.dataColumn]}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="{{gridCols.length}}">
          <pager
            :pager-classes="pagerProps.pagerClasses"
            :page-size="pagerProps.pageSize"
            :total-records="pagerProps.totalRecords"
            @goto-page="onPaging"
          />
        </td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
import Vue from "vue";
import pagerComponent from "../pager/pager.vue";

export default {
  props: {
    gridClass: Array,
    gridCols: Array,
    pagerProps: Object,
    pagerInstance: Object
  },
  components: {
    pager: pagerComponent
  },
  data: function() {
    return {
      gridData: [{ id: "234" }]
    };
  },
  created: function() {
    this.onLoad();
  },
  methods: {
    onLoad: function() {
      this.$emit("on-load", this);
    },
    onPaging: function() {
      this.$emit("on-paging", this);
    }
  }
};
</script>
