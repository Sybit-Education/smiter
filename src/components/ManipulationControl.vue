<template>
    <table class="manipulation-control">
      <tr>
        <td class="north-west"> </td>
        <td class="north"><button @click="moveUp" class="moveUp">⬆️</button></td>
        <td class="north-east"> </td>
      </tr>
      <tr>
        <td class="west">
          <button @click="moveLeft" class="moveLeft">⬅️</button>
        </td>
        <td class="center">
          <button @click="zoomOut" class="zoomOut">➖</button>
          <button @click="zoomIn" class="zoomIn">➕</button>
        </td>
        <td class="east">
          <button @click="moveRight" class="moveRight">➡️</button>
        </td>
      </tr>
      <tr>
        <td class="south-west"></td>
        <td class="south"><button @click="moveDown" class="moveDown">⬇️</button></td>
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

<style scoped>

.manipulation-control {
  margin: 0.25rem;
}
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
</style>