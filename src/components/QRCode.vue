<template class="template">
  <form v-if="!generated" name="cardValues" v-on:submit.prevent="generateQrCode()" class="form-style">
    <div class="input">
      <label for="first-name" class="label">Vorname</label>
      <input type="text" v-model="firstName" id="first-name" class="input-style" required>
    </div>
    <div class="input">
      <label for="last-name" class="label">Nachname</label>
      <input type="text" v-model="lastName" id="last-name" class="input-style" required>
    </div>
    <div class="input">
      <label for="email" class="label">Email</label>
      <input type="text" v-model="email" id="email" class="input-style" required>
    </div>
    <div class="input">
      <label for="phone" class="label">Telefonnummer</label>
      <input type="text" v-model="phone" id="phone" class="input-style">
    </div>
    <div class="input">
      <label for="company" class="label">Firmenname</label>
      <input type="text" v-model="company" id="company" class="input-style">
    </div>
    <div class="input">
      <label for="title" class="label">Titel</label>
      <input type="text" v-model="title" id="title" class="input-style">
    </div>
    <a-collapse class="input ant-collapse-borderless collapse" ghost>
      <a-collapse-panel header="Adresse" class="collapse">
        <label for="street" class="label">Straße und Hausnummer</label>
        <input type="text" v-model="street" id="street" class="input-style">

        <label for="city" class="label">Stadt</label>
        <input type="text" v-model="city" id="city" class="input-style">

        <label for="postalCode" class="label">Postleitzahl</label>
        <input type="text" v-model="postalCode" id="postalCode" class="input-style">

        <label for="country" class="label">Land</label>
        <input type="text" v-model="country" id="country" class="input-style">
      </a-collapse-panel>
    </a-collapse>
    <a-collapse class="input ant-collapse-borderless" ghost>
      <a-collapse-panel header="Social Media" class="collapse">
        <label for="LinkedIn" class="label">LinkedIn</label>
        <input type="text" v-model="LinkedIn" id="LinkedIn" class="input-style">

        <label for="instagram" class="label">Instagram</label>
        <input type="text" v-model="instagram" id="instagram" class="input-style">
      </a-collapse-panel>
    </a-collapse>
    <div class="button-style-div">
      <button class="button is-primary button-style">Submit</button>
    </div>
  </form>
  <div v-if="generated" class="centered">
    <img id="screen" :src="url"/>
    <div class="button-style-div">
      <a-button @click="download" type="primary" size="large" class="download-button-style">
        <download-outlined/>
        Download
      </a-button>
      <button class="back-button-style" @click="backToForm">Back</button>
    </div>
  </div>
</template>

<script>
let QRCode = require('qrcode')
import {DownloadOutlined} from '@ant-design/icons-vue'

export default {
  name: "QRCode",
  data() {
    return {
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      email: '',
      title: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      LinkedIn: '',
      instagram: '',
      url: '',
      generated: false
    }
  },
  components: {
    DownloadOutlined
  },
  methods: {
    /**
     * References:
     * https://stackoverflow.com/questions/70498657/is-it-possible-to-add-form-data-in-qr-code
     * https://de.wikipedia.org/wiki/VCard#vCard_2.1
     * https://snyk.io/advisor/npm-package/qrcode/functions/qrcode.toCanvas
     * https://alessandrorossini.org/the-sad-story-of-the-vcard-format-and-its-lack-of-interoperability/
     */
    generateQrCode() {
      let canvas = document.createElement('canvas')
      let vCard = [
        "BEGIN:VCARD",
        "VERSION:2.1",
        "N:" + this.lastName + ";" + this.firstName + ";",
        "FN:" + this.firstName + " " + this.lastName,
        "EMAIL:" + this.email,
        "TEL;TYPE=cell:" + this.phone,
        "ORG:" + this.company,
        "TITLE:" + this.title,
        "ADR;WORK:;;" + this.street + ";" + this.city + ";;" + this.postalCode + ";" + this.country,
        "X-SOCIALPROFILE;TYPE=linkedin:" + this.LinkedIn,
        "X-SOCIALPROFILE;TYPE=instagram:" + this.instagram,
        "END:VCARD"
      ].join("\r\n")

      QRCode.toCanvas(canvas, vCard, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })

      let screen = document.createElement('canvas')
      screen.width = window.screen.width
      screen.height = window.screen.height

      if (screen.width > 1024) {
        screen.width = 1024
        screen.height = 1366
      }

      const context = screen.getContext("2d")
      context.fillStyle = '#b51783'
      context.fillRect(0, 0, screen.width, screen.height)
      context.drawImage(canvas, screen.width * 0.2, screen.height * 0.3, screen.width * 0.6, screen.width * 0.6)
      this.url = screen.toDataURL('image/png')
      this.generated = true;
    },
    download() {
      const a = document.createElement("a"); //Create <a>
      a.href = this.url//Image Base64 Goes here
      a.download = "QR.png"; //File name Here
      a.click(); //Downloaded file
    },
    backToForm() {
      this.generated = false
    }
  }
}
</script>

<style scoped>

.form-style {
  align-items: start;
  background: #f5f5f5;
}

.input {
  width: 80%;
  max-width: 70rem;
  align-items: center;
  margin: auto;
}

.input-style {
  border-radius: 10px;
  height: 2.5rem;
  width: 100%;
  align-self: center;
  display: flex;
  border-color: darkgrey;
  font-size: medium;
  color: dimgrey;
}

.label {
  display: flex;
  padding: .5rem .25rem .25rem .5rem;
  font-size: medium;
  color: dimgrey;
}

.button-style-div {
  padding-top: 4rem;
  padding-bottom: 2rem;
  text-align: center;
}

.button-style {
  padding: .8rem 1.25rem .8rem 1.25rem;
  background: #b51783;
  color: white;
  font-size: large;
  font-weight: bold;
  border: none;
  border-radius: .7rem;
}

.download-button-style {
  padding: .8rem 1.25rem 2.5rem 1.25rem;
  background: dimgrey;
  color: white;
  font-size: large;
  font-weight: bold;
  border: none;
  border-radius: .7rem;
  margin-right: 2rem;
}

.back-button-style {
  padding: .8rem 1.25rem .8rem 1.25rem;
  background: dimgrey;
  color: white;
  font-size: large;
  font-weight: bold;
  border: none;
  border-radius: .7rem;
  margin-left: 2rem;
}

.centered {
  text-align: center;
}

.collapse {
  font-size: large;
  margin-top: 2rem;
  border-bottom-color: white !important;
  border-bottom-width: 2px !important;
}

.template {
  background: #f5f5f5;
}

</style>