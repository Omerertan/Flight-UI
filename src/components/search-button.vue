<template>
  <button
    @click="getFlights"
    class="flex items-center justify-center w-12 h-12 text-gray-100 bg-indigo-500 rounded-md mt-7 hover:bg-indigo-600"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  </button>
</template>

<script>
import { defineComponent } from "vue"; 
import { useStore } from "../store/index";

export default defineComponent({
  name: "search-button-component", 
  setup() { 
    const store = useStore();

    const getFlights = () => { 
      store.getSearchFlights(); 
      store.infoVisible = true;
    };

    return {
      getFlights,
    };
  },
});
</script>
