<template>
  <div class="flex justify-center w-full mx-auto"> 
    <a
      href="#"
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="../assets/plane.jpg"
        alt=""
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 font-bold tracking-tight text-gray-900 text-md dark:text-white"
        >
          {{ flightComputed.from }}
        </h5>
        <h5
          class="mb-2 font-bold tracking-tight text-gray-900 text-md dark:text-white"
        >
          {{ flightComputed.to }}
        </h5>
        <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
         {{ flightDateComputed(flightComputed.start)}}
        </p>
        <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
         {{ flightTimeComputed(flightComputed.start)}}
        </p>
        <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
         {{ flightComputed.duration + 'at'}}
        </p>
        <div class="flex text-gray-200 ">
          <div class="px-2 py-1 mr-1 bg-indigo-500 rounded-md hover:bg-indigo-600 ">Ekonomi: {{ flightComputed.economy.toLocaleString() }} &#x20BA</div>
          <div class="px-2 py-1 bg-indigo-500 rounded-md hover:bg-indigo-600">Business: {{ flightComputed.business.toLocaleString() }} &#x20BA</div> 
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue"; 
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute(); 
    const id = route.params.id;

    const flightComputed = computed(() => {
      let flights = localStorage.getItem("flights");
      return JSON.parse(flights)[id];
    });

    const flightDateComputed = computed(() => {
      return (value) => {
        return value ? new Date(value).toLocaleString("tr-TR",{ dateStyle : "long"}) : ''
      }
    })

    const flightTimeComputed = computed(() => {
      return (value) => {
        return value ? new Date(value).toLocaleString("tr-TR",{ timeStyle : "short"}) : ''
      }
    })

    return {
      id,
      flightComputed,
      flightDateComputed,
      flightTimeComputed
    };
  },
});
</script>
