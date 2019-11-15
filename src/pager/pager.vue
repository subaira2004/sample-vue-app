
<template>
  <nav v-if="totalRecords>0">
    <ul :class="pagerClasses.pagination">
      <li :class="firstPrevClass">
        <a :class="pagerClasses.pageLink" href="javascript:void(0);" @click="gotoPage(1)">First</a>
      </li>
      <li :class="firstPrevClass">
        <a
          :class="pagerClasses.pageLink"
          href="javascript:void(0);"
          @click="gotoPage(prevPage)"
        >Previous</a>
      </li>
      <li
        v-for="page in pages"
        v-bind:key="page.pageNumber"
        :class="page.className"
        @click="gotoPage(page.pageNumber)"
      >
        <a :class="pagerClasses.pageLink" href="javascript:void(0);">{{page.pageNumber}}</a>
      </li>
      <li :class="lastNextClass">
        <a
          :class="pagerClasses.pageLink"
          href="javascript:void(0);"
          @click="gotoPage(nextPage)"
        >Next</a>
      </li>
      <li :class="lastNextClass">
        <a
          :class="pagerClasses.pageLink"
          href="javascript:void(0);"
          @click="gotoPage(lastPage)"
        >Last</a>
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
  created: function() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    gotoPage: function(pageNum) {
      if (this.currentPage != pageNum) {
        this.gotoPageNum = pageNum;
        this.$emit("goto-page", this);
      }
    },
    handleResize: function(e) {
      var winWidth = window.innerWidth;
      if (winWidth <= 600) {
        this.dispNoOfPages = 5;
      } else {
        this.dispNoOfPages = 10;
      }
    }
  },
  computed: {
    // a computed getter
    lastPage: function() {
      var _lastPage =
        parseInt(this.totalRecords / this.pageSize) +
        (parseInt(this.totalRecords % this.pageSize) > 0 ? 1 : 0);
      return _lastPage;
    },
    nextPage: function() {
      return this.currentPage + 1 <= this.lastPage
        ? this.currentPage + 1
        : this.currentPage;
    },
    prevPage: function() {
      return this.currentPage - 1 >= 1
        ? this.currentPage - 1
        : this.currentPage;
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
      return this.currentPage === 1 || this.lastPage <= 1;
    },
    isDisableLastNext: function() {
      return (this.currentPage === this.lastPage || this.lastPage <= 1);
    },

    pages: function() {
      var _pages = [];
      if (this.lastPage > 0 && this.currentPage > this.lastPage ) {
        this.gotoPage(this.lastPage);
        return;
      }

      var firstPageFinder =
        parseInt(this.dispNoOfPages / 2) +
        (parseInt(this.dispNoOfPages % 2) > 0 ? 1 : 0);

      var maxPage =
        this.dispNoOfPages >= this.lastPage
          ? this.lastPage
          : this.currentPage < firstPageFinder
          ? this.dispNoOfPages
          : this.currentPage + firstPageFinder;
      maxPage = maxPage > this.lastPage ? this.lastPage : maxPage;
      var minPage = maxPage - this.dispNoOfPages + 1;
      minPage = minPage < 1 ? 1 : minPage;
      for (var i = minPage; i <= maxPage; i++) {
        var tmpCalssNames =
          this.pagerClasses.pageItem +
          " " +
          (i == this.currentPage ? this.pagerClasses.active : "");
        _pages.push({
          pageNumber: i,
          className: tmpCalssNames
        });
      }

      return _pages;
    }
  }
};
</script>
