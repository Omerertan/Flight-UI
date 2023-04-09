import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("main", {
  state: () => {
    return { 
      airports: [],
      flights: null, 
      fromCode: null,
      toCode: null,
      infoVisible: false
    };
  },
  actions: {
    async getAirPorts() {
      await axios.get("https://localhost:52204/airports").then((res) => {
        this.airports = res.data;
      });
    },
    async getSearchFlights() {
      if (!!this.fromCode && !!this.toCode) {
        await axios
          .post("https://localhost:52204/searchflights", {
            fromCode: this.fromCode,
            toCode: this.toCode,
          })
          .then((res) => { 
            this.flights = res && res.data ? res.data : [];
            localStorage.setItem("flights",  JSON.stringify(this.flights) );
          });
      }
    },
  },
});
