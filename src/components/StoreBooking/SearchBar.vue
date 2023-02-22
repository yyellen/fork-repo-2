<template>
  <div class="searchbar row d-flex gy-1 mx-0">
    <!-- TODO: Search -->
    <div class="col-md-6 search-block">
      <form class="d-flex">
        <input
          class="form-control border border-secondary"
          type="search"
          placeholder="請輸入關鍵字"
          aria-label="Search"
          v-model="infos.searchWords"
        />
        <button class="btn btn-secondary" type="button" @click="doSearch()">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
    <!-- TODO: District Select -->
    <div class="col-md-3 district-select-block">
      <div class="input-group">
        <button
          type="button"
          class="district-select-output btn btn-outline-secondary"
        >
          {{ infos.district }}
        </button>
        <button
          type="button"
          class="split-btn btn btn-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="district-dropdown-menu dropdown-menu dropdown-menu-end">
          <li
            class="dropdown-item"
            v-for="district in districts"
            :key="district"
            @click="getDistrict(district)"
          >
            {{ district }}
          </li>
        </ul>
      </div>
    </div>
    <!-- TODO: Category Select -->
    <div class="col-md-3">
      <div class="input-group category-select-block">
        <button
          type="button"
          class="category-select-output btn btn-outline-secondary"
        >
          {{ infos.category }}
        </button>
        <button
          type="button"
          class="split-btn btn btn-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="category-dropdown-menu dropdown-menu dropdown-menu-end">
          <li
            class="dropdown-item"
            v-for="category in categorys"
            :key="category"
            @click="getCategory(category)"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infos: {
        category: "全類別",
        district: "全地區",
        searchWords: "",
      },

      District: "全地區",
      districts: ["全地區", "大安區", "中正區", "萬華區"],
      Category: "全類別",
      categorys: ["全類別", "桌遊店家", "密室逃脫", "合租空間"],
    };
  },

  methods: {
    getDistrict: function (district) {
      this.infos.district = district;
    },
    getCategory: function (category) {
      this.infos.category = category;
    },
    doSearch: function () {
      this.$emit("searchStore", this.infos);
    },
  },
  watch: {
    infos: {
      handler: "doSearch",
      deep: true,
    },
  },
};
</script>

<style scoped>
.searchbar {
  background-color: #ffffff;
  padding: 25px;
  border: 1px #dddddd solid;
}

/* select-block */
.district-select-output,
.category-select-output {
  width: 140px;
  cursor: default;
}
.district-select-output:hover,
.category-select-output:hover {
  background-color: #fff;
  color: var(--input-gray);
  cursor: default;
}
.district-dropdown-menu,
.category-dropdown-menu {
  width: 170px;
  cursor: pointer;
  /* 下拉式選單卷軸 */
  max-height: 50vh;
  overflow-y: scroll;
}
</style>
