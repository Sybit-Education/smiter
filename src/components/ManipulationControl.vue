<template>
    <table class="manipulation-control">
      <tr>
        <td class="north-west"> </td>
        <td class="north">
          <a-button @click="moveUp" class="moveUp" ><ArrowUpOutlined /></a-button></td>
        <td class="north-east"> </td>
      </tr>
      <tr>
        <td class="west">
          <a-button @click="moveLeft" class="moveLeft" ><ArrowLeftOutlined /></a-button>
        </td>
        <td class="center-zoom">
          <a-button @click="zoomOut" class="zoomOut"><MinusOutlined /></a-button>
          <a-button @click="zoomIn" class="zoomIn"><PlusOutlined /></a-button>
        </td>
        <td class="east">
          <a-button @click="moveRight" class="moveRight"><ArrowRightOutlined /></a-button>
        </td>
      </tr>
      <tr>
        <td class="south-west"></td>
        <td class="south">
          <a-button @click="moveDown" class="moveDown"><ArrowDownOutlined /></a-button>
        </td>
        <td class="south-east">  </td>
      </tr>
    </table>
</template>

<script>
import { ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'

export default {
    name: 'ManipulationControl',
    components: { ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, MinusOutlined },
    methods: {
        moveUp() {
            this.$emit('moveUp');
        },
        moveDown() {
            this.$emit('moveDown');
        },
        moveLeft() {
            this.$emit('moveLeft');
        },
        moveRight() {
            this.$emit('moveRight');
        },
        zoomIn() {
            this.$emit('zoomIn');
        },
        zoomOut() {
            this.$emit('zoomOut');
        },
    }
}
</script>

<style lang="scss" scoped>

.manipulation-control {
  margin: 0.25rem;

  .north-west {
      width: 3rem;
      height: 3rem;
      border-top-left-radius: 100%;
      background-color: grey;
  }
  .north {
      width: 4.5rem;
      height: 4.5rem;
      background-color: grey;
  }
  .north-east {
      width: 4.5rem;
      height: 4.5rem;
      border-top-right-radius: 100%;
      background-color: grey;
  }
  .west {
      width: 4.5rem;
      height: 4.5rem;
      background-color: grey;
  }
  .center-zoom {
      width: 4.5rem;
      height: 4.5rem;
      background-color: grey;
  }
  .east {
      width: 4.5rem;
      height: 4.5rem;
      background-color: grey;
  }
  .south-west {
      width: 4.5rem;
      height: 4.5rem;
      background-color: grey;
      border-bottom-left-radius: 100%;
  }
  .south {
      width: 4.5rem;
      height: 4.5rem;
      background-color: grey;
  }
  .south-east {
      width: 4.5rem;
      height: 4.5rem;
      background-color: grey;
      border-bottom-right-radius: 100%;
  }
  .ant-btn {
    border-style: none;
    font-size: 28px;
    font-weight: 900;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 0;
    border: 0;
  }
  .zoomOut {
    width: 4.5rem;
    height: 2.25rem;
    padding: 0;
    border-top-left-radius: 2.25rem;
    border-top-right-radius: 2.25rem;
  }
  .zoomIn {
    width: 4.5rem;
    height: 2.25rem;
    padding: 0;
    border-bottom-left-radius: 2.25rem;
    border-bottom-right-radius: 2.25rem;
  }
}
</style>