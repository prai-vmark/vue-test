<template>
  <div class="coin-info">

      <div v-if="hasData" class="price-label">Price:</div>
      <span v-if="hasData" class="coin-price" v-bind:class="currentClass">
          {{formattedCurrentPrice}}
        </span>

      <div v-if="!hasData" className="price-label">Price:</div>
      <span v-if="!hasData">no data available</span>
  </div>
</template>

<script>
const numberWithCommas = x => {
  const parts = x.split(".");
  if (parts.length === 2) {
    const fPart = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${fPart}.${parts[1]}`;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default {
  name: "CoinInfo",
  props: ["hasData", "currentPrice", "flag"],
  mounted: function() {
    console.log("here");
  },
  data: function() {
    return {
      currentClass: "",
      classTimer: null
    };
  },
  computed: {
    formattedCurrentPrice: function() {
      return numberWithCommas(this.currentPrice);
    }
  },
  watch: {
    flag: function(oldVal, newVal) {
      let updatedClass = "";
      if (oldVal === "1") {
        updatedClass = "up";
      } else if (oldVal === "2") {
        updatedClass = "down";
      }
      this.currentClass = updatedClass;
      this.classTimer = setTimeout(() => {
        this.currentClass = "";
      }, 600);
    }
  }
};
</script>
