<template>
<div class="card addwidget">
  <header class="card-header">Lookup Utility</header>
  <div class="card-content">
    <div class="content">
      <LookupLeft
        :selectedCoin="selectedCoin"
      />
      <LookupRight
        :coinList="coinList"
        :selectCoin="selectCoin"
        :selectedCoin="selectedCoin"
      />
    </div>
  </div>
</div>

</template>

<script>
import LookupRight from "@/components/lookup/lookup-right";
import LookupLeft from "@/components/lookup/lookup-left";

const data = require("../../data.json").Data;
const coinList = Object.entries(data).map(([key, val]) => ({
  key,
  value: val
}));

export default {
  name: "Lookup-Utility",
  data: function() {
    return {
      coinList,
      selectedCoin: {}
    };
  },
  methods: {
    selectCoin: function(coin) {
      let newCoin = coin;
      if (this.selectedCoin.Name && this.selectedCoin.Name === newCoin.Name) {
        newCoin = {};
      }
      this.selectedCoin = newCoin;
    }
  },
  components: {
    LookupRight,
    LookupLeft
  }
};
</script>
