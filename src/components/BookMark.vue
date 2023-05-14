<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error

interface Props {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[]
}
defineProps<Props>()
</script>

<template>
  <div v-for="(bookmark) in bookmarks" :key="bookmark.id" class="mb-2">
    <template v-if="bookmark.title && bookmark.url">
      <a target="_blank" rel="noopener noreferrer" :href="bookmark.url" class="flex gap-1 btn btn-outline btn-primary">
        <img class="object-cover w-4 h-4" width="16" height="16" :src="`https://www.google.com/s2/favicons?sz=64&domain_url=${bookmark.url}`" alt="ファビコン" loading="lazy">
        <span>{{ bookmark.title.slice(0, 20) }}</span>
      </a>
    </template>
    <BookMark v-if="bookmark.children && bookmark.children.length" :bookmarks="bookmark.children" />
  </div>
</template>
