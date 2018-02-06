<template>
  <div class="left-content">
    <div class="info-container">
      <CoinCard :selectedCoin="selectedCoin" />
      <div class="coin-stuff">
        <CoinInfo
          :currentPrice="currentPrice"
          :flag="flag"
          :hasData="hasData"
        />
        <CoinForm
          :hasData="hasData"
          :addToFolio="addToFolio"
          />
      </div>
    </div>
    <div class="selectedCrypto">
      <table class="table is-striped is-narrow">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in selectedCryptos" :key="crypto.Id">
            <td>{{crypto.Name}}</td>
            <td>{{crypto.CoinName}}</td>
            <td>{{crypto.Quantity}}</td>
            <td>{{crypto.Price}}</td>
            <td>{{crypto.AddDate}}</td>
            <td class="red" @click="removeCrypto(crypto.Id)">
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>
            <div class="lookup-control">
          <button class="button is-primary is-outlined" disabled={!this.state.selectedCryptos.length} onClick={this.submitCallback}>
            Add to Portfolio
          </button>
          <button :disabled="!selectedCryptos.length" class="button is-danger cancel-btn is-outlined" @click="cancelLookup">
            Cancel
          </button>
        </div>
  </div>
</template>

<script>
import CoinCard from "./CoinCard";
import CoinInfo from "./CoinInfo";
import CoinForm from "./CoinForm";
import constants from "@/components/constants";
import axios from "axios";
import io from "socket.io-client";

export default {
  name: "Left-Content",
  props: ["selectedCoin"],
  data: function() {
    return {
      currentPrice: "---",
      flag: "",
      hasData: false,
      selectedCryptos: [],
      // non-templateBound
      socket: null,
      new: null,
      currentSubs: []
    };
  },
  mounted: function() {
    this.socket = io(constants.streamUrl);
    this.socket.on("m", currentData => {
      console.log(currentData);
      const curData = currentData.split("~");
      const flag = curData[4];
      let currentPrice = curData[5];

      if (flag === "3") return;
      if (currentPrice !== undefined) {
        if (this.new === true) {
          this.new = false;
          this.currentPrice = currentPrice;
          this.flag = flag;
        } else if (flag !== "4") {
          this.currentPrice = currentPrice;
          this.flag = flag;
        }
      }
    });
  },
  watch: {
    selectedCoin: function(newVal, oldVal) {
      if (!newVal.Name) {
        this.resetState();
        this.socket.emit("SubRemove", { subs: [this.currentSubs] });
        return;
      }
      this.socket.emit("SubRemove", { subs: [this.currentSubs] });
      const dataUrl = `${constants.dataUrl}fsym=${newVal.Name}&tsyms=USD`;
      axios.get(dataUrl).then(({ data }) => {
        const hasData = data["USD"]["CURRENT"];
        if (hasData.length) {
          this.hasData = true;
          this.currentSubs = data["USD"]["CURRENTAGG"];
          this.new = true;
          this.socket.emit("SubAdd", { subs: [this.currentSubs] });
        } else {
          this.hasData = false;
        }
      });
    }
  },
  methods: {
    resetState: function() {
      this.currentPrice = "---";
      this.flag = "";
      this.hasData = false;
    },
    addToFolio: function(qty, addDate) {
      if (!this.selectedCoin.Name) return;
      // if already contains same crypto, replace
      this.selectedCryptos = this.selectedCryptos.filter(
        item => item.Id !== this.selectedCoin.Id
      );
      const newCoin = {
        ...this.selectedCoin,
        Quantity: qty,
        AddDate: addDate,
        Price: this.currentPrice
      };
      this.selectedCryptos.push(newCoin);
    },
    removeCrypto: function(id) {
      this.selectedCryptos = this.selectedCryptos.filter(
        item => item.Id !== id
      );
    },
    cancelLookup: function() {
      this.selectedCryptos = [];
    }
  },
  components: {
    CoinCard,
    CoinInfo,
    CoinForm
  }
};
</script>
