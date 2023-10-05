<template>
  <div class="three-container">
    <canvas id="renderer-canvas"></canvas>
  </div>
</template>

<script setup>
import runFundamentals from '../manual/Fundamentals';
import runResponsive from '../manual/Responsive';
import { watch } from 'vue';
import { useCurItemStore } from '../stores/states';

const curItemStore = useCurItemStore();

watch(() => curItemStore.getCurItem, (curItem, preItem) => {
  if (curItem != null) {
    run(curItem);
  } else {
    // TODO: clear canvas
    const canvas = document.querySelector('#renderer-canvas');
  }
});

const run = (curItem) => {
  switch (curItem.id) {
    case 0:
      runFundamentals();
      break;
    case 1:
      runResponsive();
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