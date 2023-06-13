<script setup lang="ts">
import { ref } from 'vue'
import BookMarks from './components/BookMarks.vue'
import Tabs from './components/Tabs.vue'

const tabs = ref([
  { id: 1, name: 'Bookmark', component: BookMarks },
  { id: 2, name: 'Tab', component: Tabs },
])

const currentTab = ref<number>(1)
</script>

<template>
  <div>
    <div class="tabs justify-center tabs-boxed">
      <a v-for="(tab, i) in tabs" :key="i" class="tab" :class="{ 'tab-active': currentTab === tab.id }" @click="currentTab = tab.id">{{ tab.name }}</a>
    </div>
    <div class="border-2">
      <template v-for="(tab, i) in tabs">
        <component :is="tab.component" v-if="currentTab === tab.id " :key="i" />
      </template>
    </div>
  </div>
</template>
