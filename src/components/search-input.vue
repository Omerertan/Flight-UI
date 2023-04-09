<template>
  <label class="text-xl font-medium text-gray-700">
    {{ obj.title }}
  </label>
  <input
    class="w-full h-12 px-3 py-2 mb-2 text-lg font-medium text-gray-600 border border-gray-300 rounded-md bg-gray-50 sm:text-xs "
    type="text"
    placeholder="Şehir veya Havalimanı yazın"
    v-model="searchText"
    @focus="openDropdown" 
    @blur="closeDropdown"
  />
  <ul
    v-if="!!airportsComputed && airportsComputed.length > 0"
    class="relative p-2 bg-gray-100 rounded-md"
    :class="[selectVisible ? 'block' : 'hidden']"
  >
    <li
      v-for="airport in airportsComputed"
      :key="airport"
      class="p-1 cursor-pointer hover:bg-gray-50"
      @click="selectedCode(airport)"
    >
      {{ airport.name }}
    </li>
  </ul>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import { useStore } from "../store/index";

export default defineComponent({
  name: "search-input-component",
  props: ["obj"],
  setup(props) {
    const store = useStore();
    const selectVisible = ref(false);
    const searchText = ref("");

    const openDropdown = () => {
      selectVisible.value = true;
      searchText.value = "";
      store[props.obj.key] = "";
      store.infoVisible = false;
    };

    const closeDropdown = () => {
      setTimeout(() => (selectVisible.value = false), 500);
    };

    const airportsComputed = computed(() => {
      if (!!searchText.value) {
        return store.airports.filter((x) =>
          x.name
            .toLocaleLowerCase()
            .includes(searchText.value.toLocaleLowerCase())
        );
      }
      return store.airports;
    });

    const selectedCode = (airport) => {
      store[props.obj.key] = airport.code;
      searchText.value = airport.name;
      selectVisible.value = false;
    };

    return {
      selectVisible,
      searchText,
      openDropdown,
      closeDropdown,
      airportsComputed,
      selectedCode,
    };
  },
});
</script>
