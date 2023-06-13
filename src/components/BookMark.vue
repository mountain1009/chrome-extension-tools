<script lang="ts" setup>
interface Props {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[]
}
defineProps<Props>()

// const toggle = ref(false)
</script>

<template>
  <ul v-for="(bookmark) in bookmarks" :key="bookmark.id">
    <li class="mb-2">
      <template v-if="bookmark.title && bookmark.url">
        <a target="_blank" rel="noopener noreferrer" :href="bookmark.url" class="flex gap-1 btn btn-outline btn-primary">
          <img class="object-cover w-4 h-4" width="16" height="16" :src="`https://www.google.com/s2/favicons?sz=64&domain_url=${bookmark.url}`" alt="ファビコン" loading="lazy">
          <span>{{ bookmark.title.slice(0, 20) }}</span>
        </a>
      </template>
      <template v-else-if="bookmark.children && !bookmark.url">
        <!-- <button @click="toggle = !toggle">
          {{ bookmark.title }}
        </button> -->
      </template>
      <BookMark v-if="bookmark.children && bookmark.children.length" :bookmarks="bookmark.children" />
    </li>
  </ul>
</template>
