<template>
  <div> 
    <div class="flex justify-center p-3 bg-indigo-100 rounded-md h-28">
      <div class="flex flex-col w-full mx-1">
        <search-input
          :obj="{ title: 'Kalkış Noktası', key: 'fromCode' }"
        ></search-input>
      </div>
      <div class="w-full mx-1">
        <search-input
          :obj="{ title: 'Varış Noktası', key: 'toCode' }"
        ></search-input>
      </div>
      <div class="mx-1 ">
        <search-button ></search-button>
      </div>
    </div>       
    <div v-if="flightsComputed && flightsComputed.length > 0" class="table w-full mt-2">
      <div
        v-for="(flight, index) in flightsComputed"
        class="flex items-center justify-between px-4 py-2 mb-1 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
        @click="goToDetail(index)" 
      > 
        <div class="w-full ">
          <div>{{ flight.from }}</div>
          <div>{{ flight.to }}</div>
        </div>
        <div class="items-center justify-center flex-none w-28">
          <div class="flex justify-center mb-1">{{ flightDateComputed(flight.start) }}</div>
          <div class="flex flex-row justify-center mb-1">         
            <span class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span>{{ flightTimeComputed(flight.start) }}</span>
          </div>
          <div class="flex justify-center">{{ flight.duration + 'at' }} </div>
        </div>
        <div class="flex justify-center w-full">
          <div>
            <div>Ekonomi: {{ flight.economy.toLocaleString() }} &#x20BA</div>
            <div>Business: {{ flight.business.toLocaleString() }} &#x20BA</div>
          </div>
        </div>
        <div class="flex-none">
          <button class="px-4 py-2 text-gray-100 bg-indigo-500 rounded-md hover:bg-indigo-600">Detay</button>
        </div>
      </div>
    </div>
    <div v-else-if="flightsComputed && flightsComputed.length < 1 && store.fromCode && store.toCode && store.infoVisible" class="flex items-center justify-between my-1 rounded-md" > 
      <div class="flex w-full p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"  role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Info</span>
        <div>
          Aradığınız kriterlere uygun uçak bileti bulunmamaktadır.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "../store/index";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    store.getAirPorts();

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

    const flightsComputed = computed(() => {
      return store.flights;
    });

    const goToDetail = (index) => { 
      router.push({ name: 'detail', params: { id: index }})
    } 
 
    return {
      flightsComputed,
      flightDateComputed,
      flightTimeComputed,
      goToDetail,
      store
    };
  },
});
</script>
<style scoped>
.table {
  height: calc(100vh - 200px);
}
</style>
