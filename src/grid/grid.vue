
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
            <th v-for="col in gridCols" v-bind:key="col.dataColumn">{{ col.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="gridData.length==0">
            <td class="text-center" :colspan="gridCols.length">No data found!</td>
          </tr>
          <tr v-for="rowData in gridData" v-bind:key="rowData.col">
            <td v-for="col in gridCols" v-bind:key="col.dataColumn">
              <span v-if="col.colType=='string'">{{ rowData[col.dataColumn]}}</span>
              <div v-if="col.colType=='template'" v-html="rowData[col.dataColumn]"></div>
              <template v-if="col.colType=='action'">
                <grid-action
                  v-for="action in rowData.gridActions"
                  @action-click="gridActionClick"
                  :action-class="action.actionClass"
                  :action-href="action.actionHref"
                  :action-html="action.actionHtml"
                  :action-data="action.actionData"
                  v-bind:key="action.actionClass"
                />
              </template>
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
import gridActionComponent from "../grid/gridAction.vue";

export default {
  props: {
    gridClass: Array,
    gridCols: Array,
    pagerProps: Object
  },
  components: {
    pager: pagerComponent,
    "grid-action": gridActionComponent
  },
  data: function() {
    return {
      gridData: [
        {
          gridActions: [
            {
              actionClass: "",
              actionHref: "",
              actionHtml: "",
              actionData: {}
            }
          ]
        }
      ],
      pagerInstance: null,
      currentAction: null
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
    },
    gridActionClick: function(gridActionComp) {
      this.currentAction = gridActionComp;
      this.$emit("on-grid-action-click", this);
    }
  }
};
</script>
