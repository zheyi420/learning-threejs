import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCurItemStore = defineStore('CurItem', () => {
  const curItem = ref(null);

  const getCurItem = computed(() => {
    return curItem.value === null ? curItem.value : ({ ...curItem.value });
  });

  const setCurItem = (item) => {
    curItem.value = item;
  };

  return {
    getCurItem,
    setCurItem,
  };
});
