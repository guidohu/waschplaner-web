<script setup>
// Draws the blocks of a help or legal page (see content/docs.de.js for the shapes).
import BaseCallout from './BaseCallout.vue'
import CodeBlock from './CodeBlock.vue'
import RichText from './RichText.vue'
import { slugify } from '../lib/format'

defineProps({ blocks: { type: Array, required: true } })
</script>

<template>
  <div class="doc">
    <template v-for="(block, i) in blocks" :key="i">
      <h2 v-if="block.h2" :id="slugify(block.h2)">{{ block.h2 }}</h2>
      <p v-else-if="block.p"><RichText :text="block.p" /></p>
      <ul v-else-if="block.list" class="doc-list">
        <li v-for="(item, j) in block.list" :key="j"><RichText :text="item" /></li>
      </ul>
      <ol v-else-if="block.steps" class="doc-steps">
        <li v-for="(step, j) in block.steps" :key="j">
          <span class="doc-step-num" aria-hidden="true">{{ j + 1 }}</span>
          <div class="doc-step-body">
            <h3>{{ step.title }}</h3>
            <p v-if="step.text"><RichText :text="step.text" /></p>
            <CodeBlock v-if="step.code" :code="step.code" />
          </div>
        </li>
      </ol>
      <CodeBlock v-else-if="block.code" :code="block.code" :title="block.title" />
      <BaseCallout v-else-if="block.callout" :tone="block.tone || 'info'"><RichText :text="block.callout" /></BaseCallout>
      <div v-else-if="block.table" class="table-wrap">
        <table class="table doc-table">
          <thead>
            <tr><th v-for="h in block.table.head" :key="h" scope="col">{{ h }}</th></tr>
          </thead>
          <tbody>
            <tr v-for="(row, j) in block.table.rows" :key="j">
              <td v-for="(cell, k) in row" :key="k"><RichText :text="cell" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<style scoped>
.doc { display: flex; flex-direction: column; gap: 1rem; color: var(--text-2); }
.doc > p { margin: 0; white-space: pre-line; }
.doc h2 { color: var(--text); font-size: 1.3rem; margin: 1.25rem 0 -0.25rem; scroll-margin-top: 5rem; }
.doc-list { margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
.doc-steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.doc-steps > li {
  display: flex; gap: 0.85rem; padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface);
}
.doc-step-num {
  flex: none; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%;
  background: var(--primary); color: var(--primary-ink); font-weight: 750; font-size: 0.9rem;
}
.doc-step-body { display: flex; flex-direction: column; gap: 0.5rem; min-width: 0; flex: 1; }
.doc-step-body h3 { margin: 0.1rem 0 0; color: var(--text); }
.doc-step-body p { margin: 0; }
.doc-table { font-size: 0.93rem; background: var(--surface); }
.doc-table td { vertical-align: top; }
.doc-table td:first-child { white-space: nowrap; color: var(--text); }
.table-wrap { border: 1px solid var(--border); border-radius: var(--radius-sm); }
@media (max-width: 720px) {
  .doc-table td:first-child { white-space: normal; }
}
</style>
