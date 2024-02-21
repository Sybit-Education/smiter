<template>
  <div class="about">
    <a-space direction="vertical">
      <div>Developed with 💜 for you!</div>
      <div>&copy; {{ year }} Sybit GmbH</div>
      <div><a href="https://www.sybit.de/impressum">Impressum</a> </div>
      <div><a href="https://www.sybit.de/datenschutz">Datenschutz</a></div>
    </a-space>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  data() {
    return {
      year: new Date().getFullYear(),
    }
  }
}
</script>

<style scoped>
.about {
  margin: 0.5rem;
}
</style>