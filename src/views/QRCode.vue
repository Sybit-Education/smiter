<template>
  <a-layout id="v-card">
    <a-layout-content v-if="!generated">
      <a-form
        class="v-card-form"
        :model="formData"
        layout="horizontal"
        name="cardValues"
        @submit="generateQrCode()"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
      <a-form-item
          label="Titel"
          name="title"
        >
          <a-input type="text" v-model:value="formData.title"  />
        </a-form-item>
        <a-form-item
          label="Vorname"
          name="first-name"
          label-for="first-name"
          :rules="[{ required: true, message: 'Bitte Vornamen eintragen' }]"
        >
          <a-input id="first-name" type="text" v-model:value="formData.firstName" placeholder="Vorname" />
        </a-form-item>
        <a-form-item label="Nachname" name="last-name" :rules="[{ required: true, message: 'Bitte nachnamen eintragen' }]">
          <a-input type="text" v-model:value="formData.lastName" id="last-name" />
        </a-form-item>
        <a-form-item label="E-Mail" name="e-mail" :rules="[{ required: true, message: 'Bitte E-Mai. eintragen!' }]">
          <a-input type="email" v-model:value="formData.email" />
        </a-form-item>
        <a-form-item label="Telefon" name="telephone">
          <a-input type="tel" v-model:value="formData.phone" />
        </a-form-item>
        <a-form-item label="Firma">
          <a-input type="text" v-model:value="formData.company" />
        </a-form-item>
        <a-form-item label="Job-Titel">
          <a-input type="text" v-model:value="formData.jobTitle" />
        </a-form-item>
        <a-form-item label="Web-Seite">
          <a-input type="url" v-model:value="formData.website" />
        </a-form-item>
        <a-collapse class="a-input ant-collapse-borderless collapse" ghost>
          <a-collapse-panel header="Adresse" class="collapse">
            <a-form-item label="Straße, Hausnummer">
              <a-input type="text" v-model:value="formData.street" />
            </a-form-item>
            <a-form-item label="Postleitzahl">
              <a-input type="text" v-model:value="formData.postalCode" />
            </a-form-item>
            <a-form-item label="Stadt">
              <a-input type="text" v-model:value="formData.city" />
            </a-form-item>
            <a-form-item label="Land">
              <a-input type="text" v-model:value="formData.country" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse class="a-input ant-collapse-borderless" ghost>
          <a-collapse-panel header="Social Media" class="collapse">
            <a-form-item label="LinkedIn">
              <a-input type="text" v-model:value="formData.linkedIn" />
            </a-form-item>

            <a-form-item label="Instagram">
              <a-input type="text" v-model:value="formData.instagram" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Speichern</a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
    <a-layout-content v-if="generated">
      <div class="centered">
        <img id="screen" :src="url" />
      </div>
      <a-float-button-group shape="circle" >
        <a-float-button
          type="default"
          @click="backToForm"
        >
          <template #icon>
            <edit-outlined />
          </template>
        </a-float-button>
        <a-float-button
          type="default"
          @click="download"
        >
          <template #icon>
            <download-outlined />
          </template>
        </a-float-button>
      </a-float-button-group>
    </a-layout-content>
  </a-layout>
</template>

<script>
import QRCode from 'qrcode'
import { DownloadOutlined, EditOutlined } from '@ant-design/icons-vue'

export default {
  name: 'QRCode',
  data() {
    return {
      formData: {
        title: '',
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: '',
        jobTitle: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
        website: '',
        linkedIn: '',
        instagram: '',
      },
      generated: false
    }
  },
  components: {
    DownloadOutlined, EditOutlined
  },
  mounted() {
    if (localStorage.getItem('smiter.vCard')) {
      this.formData = JSON.parse(localStorage.getItem('smiter.vCard'))
      this.generateQrCode()
    }
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
      localStorage.setItem('smiter.vCard', JSON.stringify(this.formData))

      const hasAddress = this.formData.street && this.formData.city && this.formData.postalCode && this.formData.country
      let vCard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:' + this.formData.lastName + ';' + this.formData.firstName + ';;' + this.formData.title + ';',
        'FN:' + this.formData.firstName + ' ' + this.formData.lastName,
        this.formData.email ? 'EMAIL:' + this.formData.email : '',
        this.formData.phone ? 'TEL;TYPE=WORK:' + this.formData.phone : '',
        this.formData.company ? 'ORG:' + this.formData.company : '',
        this.formData.jobTtitle ? 'TITLE:' + this.formData.jobTtitle : '',
        hasAddress ? ('ADR;Type=WORK:;;' +
          this.formData.street +
          ';' +
          this.formData.city +
          ';;' +
          this.formData.postalCode +
          ';' +
          this.formData.country) : '',
        this.formData.website ? 'URL:' + this.formData.website : '',
        this.formData.linkedIn ? 'X-SOCIALPROFILE;TYPE=LinkedIn:' + this.formData.linkedIn : '',
        this.formData.instagram ? 'X-SOCIALPROFILE;TYPE=Instagram:' + this.formData.instagram : '',
        'END:VCARD'
      ].join('\r\n')

      const canvas = document.createElement('canvas')
      QRCode.toCanvas(canvas, vCard, function (error) {
        if (error) console.error(error)
      })

      const screen = document.createElement('canvas')
      screen.width = window.screen.width
      screen.height = window.screen.height

      if (screen.width > 1024) {
        screen.width = 1024
        screen.height = 1366
      }

      const context = screen.getContext('2d')
      context.fillStyle = '#b51783'
      context.fillRect(0, 0, screen.width, screen.height)
      context.drawImage(canvas, screen.width * 0.2, screen.height * 0.3, screen.width * 0.6, screen.width * 0.6)
      this.url = screen.toDataURL('image/png')
      this.generated = true
    },
    download() {
      const a = document.createElement('a') //Create <a>
      a.href = this.url //Image Base64 Goes here
      a.download = 'QR.png' //File name Here
      a.click() //Downloaded file
    },
    backToForm() {
      this.generated = false
    }
  }
}
</script>

<style scoped>
.v-card-form {
  margin: 2rem;
}
.button-style-div {
  padding-top: 4rem;
  padding-bottom: 2rem;
  text-align: center;
}

.button-style {
  padding: 0.8rem 1.25rem 0.8rem 1.25rem;
  background: #b51783;
  color: white;
  font-size: large;
  font-weight: bold;
  border: none;
  border-radius: 0.7rem;
  box-shadow: 0px 8px 15px rgba(0,0,0,0.3);

}

.download-button-style {
  padding: 0.8rem 1.25rem 2.5rem 1.25rem;
  background: dimgrey;
  color: white;
  font-size: large;
  font-weight: bold;
  border: none;
  border-radius: 0.7rem;
  margin-right: 2rem;
  box-shadow: 0px 8px 15px rgba(0,0,0,0.3);
}

.back-button-style {
  padding: 0.8rem 1.25rem 0.8rem 1.25rem;
  background: dimgrey;
  color: white;
  font-size: large;
  font-weight: bold;
  border: none;
  border-radius: 0.7rem;
  margin-left: 2rem;
  box-shadow: 0px 8px 15px rgba(0,0,0,0.3);
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
</style>
