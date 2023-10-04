<template>
  <div class="three-container">
    <canvas id="renderer-canvas"></canvas>
  </div>
</template>

<script setup>
import runFundamentals from '../manual/Fundamentals';
import { onMounted, watch } from 'vue';
import { useCurItemStore } from '../stores/states';

const curItemStore = useCurItemStore();

watch(() => curItemStore.getCurItem, (curItem, preItem) => {
  if (curItem != null) {
    run(curItem);
  }
});

const run = (curItem) => {
  switch (curItem.id) {
    case 0:
      runFundamentals();
      break;
    case 1:
      
      break;
    default:
      break;
  }
};

</script>

<style scoped lang="less">
.three-container {
  text-align: center;
  border: 1px solid red;
}
</style>