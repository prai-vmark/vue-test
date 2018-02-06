<template>
  <div class="coin-form" v-if="hasData">
    <div class="field is-horizontal">
      <input type="text"
        name="quantity"
        class="input is-small"
        placeholder="Quantity"
        v-model="quantity">
    </div>
      <button class="button is-info" @click="callAddToFolio">
          Add
      </button>
  </div>
</template>

<script>
function getNowDate() {
  const dt = new Date();
  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt
    .getFullYear()
    .toString()
    .substr(2)}`;
}

export default {
  name: "CoinForm",
  props: ["addToFolio", "hasData"],
  data: function() {
    return {
      quantity: ""
    };
  },
  methods: {
    callAddToFolio: function() {
      const qty = this.quantity;
      if (qty === "" || isNaN(qty)) return;
      this.addToFolio(qty, getNowDate());
      this.quantity = "";
    }
  }
};
</script>
