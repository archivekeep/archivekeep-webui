<template>
  <div class="breadcrumbs-container page-content-container">
    <q-breadcrumbs class="text-grey">
      <q-breadcrumbs-el
        to="/"
        label="Home"
      />
      <q-breadcrumbs-el
        v-for="item in items"
        :key="item.To"
        v-bind:to="item.To"
        v-bind:label="item.Label"
      />
    </q-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export type BreadcrumbItem = {
  To: string,
  Label: string
}

export default defineComponent({
  name: 'BreadCrumbs',
  props: {
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      required: true
    }
  }
})
</script>

<style scoped>
.breadcrumbs-container {
  padding-top: 1.5rem;
  padding-bottom: 1rem;
}
</style>
