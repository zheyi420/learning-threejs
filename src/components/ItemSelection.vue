<template>
  <div class="panel-item-selection">
    <button
      v-for="(item, index) in items"
      :key="index"
      :class="{ active: item.active }"
      @click="selectItem(index)"
    >{{ item.name }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCurItemStore } from '../stores/states';

const curItemStore = useCurItemStore();

const items = ref([
  {
    name: 'fundamentals',
    id: 0,
    active: false,
  },
  {
    name: 'responsive',
    id: 1,
    active: false,
  },
]);

let preItemIndexSeleted = null;

const selectItem = (index) => {
  if (index === preItemIndexSeleted) {
    items.value[index].active = false;

    preItemIndexSeleted = null;
    curItemStore.setCurItem(null);
  } else {
    items.value[index].active = true;
    if (preItemIndexSeleted !== null) {
      items.value[preItemIndexSeleted].active = false;
    }
    preItemIndexSeleted = index;
    curItemStore.setCurItem(({...items.value[index]}));
  }

};


</script>

<style scoped lang="less">
.panel-item-selection {
  font-size: 18px;
  position: fixed;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 10%;
  height: auto;
  /* min-height: 150px; */
  background: rgb(255, 255, 255);
  transition: right 0.24s ease-in-out;
  border-radius: 5px;
  border: 3px solid steelblue;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  button {
    margin: 10px 0px 10px 0px;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    padding: 6px 12px;
    margin: 10px;
    color: #000000;
    border: 1px solid steelblue;
    transition: all 0.1s ease-in-out;

    &:disabled {
      cursor: not-allowed;
      background: transparent;
      color: gray;

      &:hover {
        background: inherit;
      }
    }

    &:hover {
      background: rgb(53, 185, 242);
    }

    &.active {
      background: #26e669;
    }
  }
}</style>