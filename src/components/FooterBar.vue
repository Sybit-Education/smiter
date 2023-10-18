<template>
  <div>
    <div>Developed with 💜 for you!</div>
    <a-space>
      <span>&copy; {{ year }} Sybit GmbH</span> |
      <a href="https://www.sybit.de/impressum">Impressum</a> |
      <a href="https://www.sybit.de/datenschutz">Datenschutz</a>
    </a-space>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  computed: {
    year() {
      return new Date().getFullYear()
    }
  },
}
</script>

<style>

</style>