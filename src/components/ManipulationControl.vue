<template>
    <table class="manipulation-control">
      <tr>
        <td class="north-west"> </td>
        <td class="north">
          <a-button @click="moveUp" class="moveUp">▲</a-button></td>
        <td class="north-east"> </td>
      </tr>
      <tr>
        <td class="west">
          <a-button @click="moveLeft" class="moveLeft">◀</a-button>
        </td>
        <td class="center">
          <a-button @click="zoomOut" class="zoomOut">-</a-button>
          <a-button @click="zoomIn" class="zoomIn">+</a-button>
        </td>
        <td class="east">
          <a-button @click="moveRight" class="moveRight">▶</a-button>
        </td>
      </tr>
      <tr>
        <td class="south-west"></td>
        <td class="south">
          <a-button @click="moveDown" class="moveDown">▼</a-button></td>
        <td class="south-east">  </td>
      </tr>
    </table>
</template>

<script>
export default {
  name: 'ManipulationControl',
  methods: {
    moveUp () {
      this.$emit('moveUp')
    },
    moveDown () {
      this.$emit('moveDown')
    },
    moveLeft () {
      this.$emit('moveLeft')
    },
    moveRight () {
      this.$emit('moveRight')
    },
    zoomIn () {
      this.$emit('zoomIn')
    },
    zoomOut () {
      this.$emit('zoomOut')
    },
  }
}
</script>

<style lang="scss">

.manipulation-control {
  margin: 0.25rem;

  .north-west {
      width: 3rem;
      border-top-left-radius: 6rem;
      background-color: grey;
  }
  .north {
      width: 3rem;
      height: 3rem;
      background-color: grey;
  }
  .north-east {
      width: 3rem;
      height: 3rem;
      border-top-right-radius: 6rem;
      background-color: grey;
  }
  .west {
      width: 3rem;
      height: 3rem;
      background-color: grey;
  }
  .center {
      width: 3rem;
      height: 3rem;
      background-color: grey;
  }
  .east {
      width: 3rem;
      height: 3rem;
      background-color: grey;
  }
  .south-west {
      width: 3rem;
      height: 3rem;
      background-color: grey;
      border-bottom-left-radius: 6rem;
  }
  .south {
      width: 3rem;
      height: 3rem;
      background-color: grey;
  }
  .south-east {
      width: 3rem;
      height: 3rem;
      background-color: grey;
      border-bottom-right-radius: 9rem;
  }
  .ant-btn {
    border-style: none;
    font-size: 28px;
    font-weight: 900;
    width: 4.5rem;
    height: 4.5rem;
  }
  .zoomOut {
    width: 4.5rem;
    height: 2.25rem;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }
  .zoomIn {
    width: 4.5rem;
    height: 2.25rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
}
</style>