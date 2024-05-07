<template>
  <a-app>
    <a-layout>
      <a-config-provider :theme="{ token: { colorPrimary: '#b51783', borderRadius: '8px' } }">

        <a-layout-header class="header">
          <div>SMITER - <small>Social Media Image Templater</small></div>
        </a-layout-header>

        <a-layout-content>
          <a-tabs id="tabs" v-model:activeKey="activeKey" size="large" tab-position="bottom" type="card">
            <a-tab-pane key="1" class="content" tab="Templates" force-render>
              <image-template />
            </a-tab-pane>
            <a-tab-pane key="2" class="content" tab="vCard" force-render>
              <QRCode/>
            </a-tab-pane>
            <a-tab-pane key="3" class="content" tab="About">
              <about-component />
            </a-tab-pane>
          </a-tabs>

        </a-layout-content>
      </a-config-provider>
    </a-layout>
  </a-app>
</template>

<script>
import {ref} from 'vue'
import AboutComponent from '@/views/AboutComponent.vue'
import QRCode from '@/views/QRCode.vue'
import ImageTemplate from '@/views/ImageTemplate.vue'

export default {
  name: 'App',
  components: {
    AboutComponent, QRCode, ImageTemplate
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
.ant-layout-header {
  background-color: #b51783;
  color: whitesmoke;
  position: 'fixed';
  z-index: 1;
  font-size: 1.25rem;
  div {
    width: '100%';
    height: 1.25rem;
    text-overflow: 'clip';
  }
}


.content {
  min-height: calc(100vh - 120px);
  max-height: calc(100vh - 120px);
  overflow: scroll;
}
</style>
