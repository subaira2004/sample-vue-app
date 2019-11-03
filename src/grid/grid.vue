
<template>
  <table :class="gridClass">
    <thead>
        <tr>
          <th v-for="col in gridCols">
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rowData in gridData">
          <td v-for="col in gridCols">
            {{ rowData[col.dataColumn]}}
          </td>
        </tr>
      </tbody>
    </table>
</template>
<script>
import Vue from 'vue'

 export default  {
    props: {
      gridClass: Array,
      gridCols: Array
    },
    data: function () {
      return {
        gridData: [{ id: "234" }]
      }
    },
    created: function () {
      this.onLoad();
    },
    methods: {
      onLoad: function () {
        this.$emit('on-load', this)
      }
    }
  }
</script>
