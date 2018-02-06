<template>
  <div class="coin-card">
    <img :src="imageUrl" />
    <div class="coin-label">
      <span class="coin-name">
        {{coinName}}
      </span>
    </div>
  </div>
</template>

<script>
import constants from "@/components/constants";

export default {
  name: "CoinCard",
  props: ["selectedCoin"],

  data: function() {
    return {
      imageUrl: "http://via.placeholder.com/158x158"
    };
  },
  computed: {
    coinName: function() {
      return this.selectedCoin.Name ? this.selectedCoin.Name : "---";
    }
  },
  watch: {
    selectedCoin: function(newVal, oldVal) {
      this.imageUrl = newVal.ImageUrl
        ? `${constants.baseUrl}${newVal.ImageUrl}`
        : "http://via.placeholder.com/158x158";
    }
  }
};
</script>
