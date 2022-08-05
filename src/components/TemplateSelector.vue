<template>
  <a-row class="template-selector">
    <a-col
      v-for="item in templateList"
      :md="8"
      :xs="12"
      :key="item.id"
    >
      <a-card
        class="template-item"
        hoverable
        @click="selected(item)"
      >
        <template #cover>
            <img
            class="template-preview"
            :alt="item.name"
            :src="item.image.preview"
            />
            </template>
        <template #actions>
        </template>
        <a-card-meta :title="item.name">
        </a-card-meta>
        ({{item.image.width}} x {{item.image.height}})
      </a-card>
    </a-col>
  </a-row>
</template>

<script>

import templateService from '@/service/template.service'
export default {
  name: 'TemplateSelector',
  data () {
    return {
      templateList: []
    }
  },
  async mounted () {
    this.templateList = await templateService.getList()
  },
  methods: {
    selected(item) {
       this.$emit('selected', item)
    }
  }
}
</script>

<style scoped>
.template-item {
  margin: 0.25rem;
}
.template-preview {
  background: url('@/assets/img/transparent.jpg') repeat;
}
</style>