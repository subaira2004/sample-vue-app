
<template>
  <nav>
    <ul :class="pagerClasses.pagination">
      <li :class="firstPrevClass">
        <a :class="pagerClasses.pageLink" href="#">First</a>
      </li>
      <li :class="firstPrevClass">
        <a :class="pagerClasses.pageLink" href="#">Previous</a>
      </li>
      <li :class="pagerClasses.pageItem" v-for="page in pages" @click="gotoPage(page)">
        <a :class="pagerClasses.pageLink" href="#">page</a>
      </li>
      <li :class="lastNextClass">
        <a :class="pagerClasses.pageLink" href="#">Next</a>
      </li>
      <li ::class="lastNextClass">
        <a :class="pagerClasses.pageLink" href="#">Last</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import Vue from "vue";

export default {
  props: {
    pagerClasses: Object,
    pageSize: Number,
    totalRecords: Number
  },
  data: function() {
    return {
      currentPage: 1,
      gotoPageNum: 1,
      dispNoOfPages: 10
    };
  },
  ready: function() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    gotoPage: function(pageNum) {
      this.gotoPageNum = pageNum;
      this.$emit("goto-page", this);
    },
    handleResize: function(e) {
      var winWidth = window.innerWidth;
      if (winWidth <= 600) {
        this.dispNoOfPages = 5;
      } else {
        this.dispNoOfPages = 10;
      }
      if (this.dispNoOfPages > this.lastPage) {
        this.dispNoOfPages = this.lastPage;
      }
    }
  },
  computed: {
    // a computed getter
    pages: function() {
      var _pages = [];
      if (this.currentPage > this.lastPage) {
        this.currentPage = this.lastPage;
      }

      var firstPageFinder =
        parseInt(this.dispNoOfPages / 2) +
        (parseInt(this.dispNoOfPages % 2) > 0 ? 1 : 0);

      var maxPage = this.currentPage + firstPageFinder;
      maxPage = maxPage > this.lastPage ? this.lastPage : maxpage;
      var minPage = maxPage - this.dispNoOfPages;
      minPage = minPage < 1 ? 1 : minPage;
      for (var i = minPage; i <= maxpage; i++) {
        _pages.push(i);
      }

      return _pages;
    },
    lastPage: function() {
      var _lastPage =
        parseInt(this.totalRecords / this.pageSize) +
        (parseInt(this.totalRecords % this.pageSize) > 0 ? 1 : 0);
      return _lastPage;
    },
    firstPrevClass: function() {
      return (
        this.pagerClasses.pageItem +
        (this.isDisableFirstPrev ? " " + this.pagerClasses.disabled : "")
      );
    },
    lastNextClass: function() {
      return (
        this.pagerClasses.pageItem +
        (this.isDisableLastNext ? " " + this.pagerClasses.disabled : "")
      );
    },
    isDisableFirstPrev: function() {
      return this.currentPage === 1;
    },
    isDisableLastNext: function() {
      return this.currentPage === this.lastPage;
    }
  }
};
</script>
