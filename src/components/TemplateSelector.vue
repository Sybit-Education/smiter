<template>
  <a-row class="template-selector">
    <a-col
      v-for="item in templateList"
      :lg="6"
      :md="8"
      :sm="12"
      :xs="12"
      :key="item.id"
    >
      <a-card
        :class="itemStyle(item)"
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
      templateList: [],
      selectedItem: null
    }
  },
  async mounted () {
    this.templateList = await templateService.getList()
  },
  methods: {
    resetSelection () {
      this.selectedItem = null
    },
    selected(item) {
      this.selectedItem = item
       this.$emit('selected', item)
    },
    itemStyle (item) {
      if (this.selectedItem === item) {
        return 'template-item selected'
      } else {
        return 'template-item'
      }
    }
  }
}
</script>

<style scoped>
.template-item {
  margin: 0.25rem;
}
.selected {
  border-color: #1677ff;
  border-width: 4px;
}
.template-preview {
  background: url('@/assets/img/transparent.jpg') repeat;
}
</style>