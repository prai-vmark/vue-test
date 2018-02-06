<template>
  <div class="right-content">
    <input
      type="text"
      class="input is-small coin-lookup"
      v-model="searchText"
      placeholder="Search">
    <DisplayTable
      :coinList="this.modCoinList"
      :selectedCoin="selectedCoin"
      :selectCoin="selectCoin"/>
  </div>
</template>

<script>
import DisplayTable from "./DisplayTable";
import { debounce } from "lodash";

export default {
  name: "Lookup-Right",
  props: ["coinList", "selectCoin", "selectedCoin"],
  mounted: function() {
    console.log(this.coinList[0].value);
  },
  data: function() {
    return {
      searchText: "",
      modCoinList: this.coinList
    };
  },
  watch: {
    searchText: function(newVal, oldVal) {
      this.updateTable(newVal);
    }
  },
  methods: {
    updateTable: debounce(function(newVal) {
      if (newVal === "") {
        this.modCoinList = this.coinList.slice(0);
      } else {
        const coinList = this.coinList.filter(
          coin => coin.key.indexOf(newVal.toUpperCase()) !== -1
        );
        this.modCoinList = coinList;
      }
    }, 200)
  },
  components: {
    DisplayTable
  }
};
</script>
