<template>
  <a-layout>

    <a-layout-header>
      <h1>SMITER - Social Media Image Templater</h1>
    </a-layout-header>

    <a-layout-content>
      <a-tabs id="tabs" v-model:activeKey="activeKey" size="large" tab-position="bottom"
              type="card"
              :tabBarStyle="{margin: '0 0 0 0'}"
      >
        <a-tab-pane id="tab" key="1" tab="Templates">
          <image-template />
        </a-tab-pane>
        <a-tab-pane key="2" tab="vCard" force-render>
          <QRCode/>
        </a-tab-pane>
      </a-tabs>

    </a-layout-content>

    <a-layout-footer class="background">
      <footer-bar />
    </a-layout-footer>
  </a-layout>

</template>

<script>
import {ref} from 'vue'
import FooterBar from '@/components/FooterBar.vue'
import QRCode from '@/views/QRCode.vue'
import ImageTemplate from '@/views/ImageTemplate.vue'

export default {
  name: 'App',
  components: {
    FooterBar, QRCode, ImageTemplate
  },
  setup() {
    return {
      activeKey: ref('1'),
    }
  }
}
</script>

<style scoped>

@import '@/assets/css/custom.css';
h1 {
  color: whitesmoke;
}

.ant-layout-content {
  min-height: calc(100vh - 9rem);
}


</style>
