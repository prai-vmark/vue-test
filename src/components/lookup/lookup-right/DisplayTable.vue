<template>
<div>
  <table class="table is-hoverable is-narrow">
    <thead>
      <tr>
        <th>Rank</th>
        <th>One</th>
        <th>Two</th>
      </tr>
    </thead>
  </table>
  <div class="scroll-table">
    <table id="coin-table" class="table is-hoverable is-narrow">
      <tbody>
        <tr v-for="{value} in coinList" :key="value.Id"
          v-bind:class={selected:isSelected(value.Id)} v-on:click="selectCoin(value)">
          <td>+</td>
          <td>{{value.Symbol}}</td>
          <td>{{value.CoinName}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</div>
</template>

<script>
export default {
  name: "Display-Table",
  props: ["coinList", "selectCoin", "selectedCoin"],
  methods: {
    isSelected: function(id) {
      return id === this.selectedCoin.Id;
    }
  }
};
</script>
