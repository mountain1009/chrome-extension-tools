<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const tabs = ref <(Partial<chrome.tabGroups.TabGroup> & { tabs: chrome.tabs.Tab[] })[]> (import.meta.env.DEV ? [{ active: false, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'https://archived.catnose.me/favicon-32x32.png?v=2b23119a5c5c0cdc8dcf482721752389', groupId: -1, height: 909, highlighted: false, id: 229895802, incognito: false, index: 1, mutedInfo: { muted: false }, pinned: false, selected: false, status: 'complete', title: 'お世話になってるデザインの情報収集源 | Cat Knows', url: 'https://archived.catnose.me/example-design/', width: 1792, windowId: 229895801 }, { active: false, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'https://www.amazon.co.jp/favicon.ico', groupId: -1, height: 1041, highlighted: false, id: 229896024, incognito: false, index: 2, mutedInfo: { muted: false }, pinned: false, selected: false, status: 'complete', title: 'Amazon.co.jp 売れ筋ランキング: Amazon で最も人気のある商品です。', url: 'https://www.amazon.co.jp/ranking?type=top-sellers&ref_=nav_cs_bestsellers', width: 2048, windowId: 229895801 }, { active: false, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'https://www.eposcard.co.jp/favicon.ico', groupId: -1, height: 1041, highlighted: false, id: 229896027, incognito: false, index: 3, mutedInfo: { muted: false }, pinned: false, selected: false, status: 'complete', title: 'お支払予定額照会｜エポスカード会員サイト EPOS Net', url: 'https://www.eposcard.co.jp/memberservice/pc/paymentamountreference/payment_reference_preload.do', width: 2048, windowId: 229895801 }, { active: true, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'http://localhost:3000/vite.svg', groupId: -1, height: 1041, highlighted: true, id: 229896030, incognito: false, index: 4, mutedInfo: { muted: false }, pinned: false, selected: true, status: 'complete', title: 'Vite + Vue + TS', url: 'http://localhost:3000/', width: 2048, windowId: 229895801 }, { active: false, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'https://card.yahoo.co.jp/favicon.ico', groupId: -1, height: 1041, highlighted: false, id: 229896033, incognito: false, index: 5, mutedInfo: { muted: false }, openerTabId: 229896030, pinned: false, selected: false, status: 'complete', title: 'PayPayカード（旧ヤフーカード）サイト サービス終了に伴うご案内 - PayPayカード（旧Yahoo!カード）', url: 'https://card.yahoo.co.jp/index.html', width: 2048, windowId: 229895801 }, { active: false, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico', groupId: 1779372142, height: 1041, highlighted: false, id: 1779372142, incognito: false, index: 0, mutedInfo: { muted: false }, pinned: false, selected: false, status: 'complete', title: '毎日', url: 'https://mail.google.com/mail/u/0/#inbox', width: 2048, windowId: 229895801, collapsed: false, color: 'grey' }] : [])

onMounted(() => {
  chrome.tabs.query({}, (_tabs) => {
    if (!import.meta.env.DEV)
      return

    _tabs.forEach((tab) => {
      if (tab.groupId === -1) {
        tabs.value.push({ tabs: [tab] })
      }
      else {
        chrome.tabGroups.get(tab.groupId, (tabGroups) => {
          tabs.value.push({ ...tabGroups, tabs: [tab] })
        })
      }
    })
    // tabs.value = _tabs
    console.log(tabs)
  })
})
</script>

<template>
  <div>
    {{ tabs }}
  </div>
</template>
