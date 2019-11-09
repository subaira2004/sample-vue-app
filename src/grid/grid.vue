
<template>
  <div class="row pt-1">
    <div class="col-sm-12">
      <pager
        :pager-classes="pagerProps.pagerClasses"
        :total-records="pagerProps.totalRecords"
        :page-size="pagerProps.pageSize"
        @goto-page="onPaging"
      />
    </div>
    <div class="col-sm-12 col-md-12 col-lg-12">
      <table :class="gridClass">
        <thead>
          <tr>
            <th v-for="col in gridCols">{{ col.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowData in gridData">
            <td v-for="col in gridCols">
              <span v-if="col.colType=='string'">{{ rowData[col.dataColumn]}}</span>
              <div v-if="col.colType=='template'" v-html="rowData[col.dataColumn]"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import pagerComponent from "../pager/pager.vue";

export default {
  props: {
    gridClass: Array,
    gridCols: Array,
    pagerProps: Object
  },
  components: {
    pager: pagerComponent
  },
  data: function() {
    return {
      gridData: [{}],
      pagerInstance: null
    };
  },
  created: function() {
    this.onLoad();
  },
  methods: {
    onLoad: function() {
      this.$emit("on-load", this);
    },
    onPaging: function(pageComp) {
      this.pagerInstance = pageComp;
      this.$emit("on-paging", this);
    }
  }
};
</script>
