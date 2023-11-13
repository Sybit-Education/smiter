<template>
  <template-selector @selected="templateChanged" />

  <div class="center">
    <a-upload
      ref="uploadInput"
      v-if="templateImg"
      id="img"
      name="img"
      accept="image/*"
      :show-upload-list="false"
      :maxCount="1"
      :before-upload="readImg"
      @remove="removeImg"
    >
      <a-button type="primary" size="large" class="upload-button">
        <upload-outlined />
        Dein Foto auswählen
      </a-button>
    </a-upload>
  </div>
  <!-- img ref="photo"/ -->
  <div v-if="resizedImg">
    <img class="result" ref="result" @mousemove="move" crossorigin="anonymous" />
    <a-row class="center">
      <a-col cols="12">
        <manipulation-control
          @moveLeft="moveLeft"
          @moveRight="moveRight"
          @moveUp="moveUp"
          @moveDown="moveDown"
          @zoomIn="zoomIn"
          @zoomOut="zoomOut"
        />
      </a-col>
      <a-col cols="12">
        <a-button @click="download" type="primary" size="large">
          <download-outlined />
          Download
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ManipulationControl from '@/components/ManipulationControl'
import TemplateSelector from '@/components/TemplateSelector.vue'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import mergeImages from 'merge-images'
import scaleImage from '@/plugins/image-resizer'

export default {
  name: 'ImageTemplate',
  components: {
    ManipulationControl,
    UploadOutlined,
    DownloadOutlined,
    TemplateSelector
  },
  data() {
    return {
      x: 0,
      y: 0,
      zoom: 1.0,
      factor: 100,
      original: {
        img: null,
        width: 0,
        height: 0
      },
      resizedImg: null,
      resizedWidth: 0,
      resizedHeight: 0,
      templateImg: null,
      templateWidth: 0,
      templateHeight: 0,
      handleChange: null
    }
  },
  created() {
    this.handleChange = (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  },
  methods: {
    merge() {
      if (this.resizedImg) {
        const toMerge = [
          { src: this.resizedImg, x: this.x, y: this.y },
          { src: this.templateImg, x: 0, y: 0 }
        ]
        mergeImages(toMerge, {
          width: this.templateWidth,
          height: this.templateHeight,
          crossOrigin: 'Anonymous'
        })
          .then((b64) => {
            this.$refs['result'].src = b64
          })
          .catch((err) => {
            message.error(err.message)
          })
      }
    },
    moveUp() {
      this.y = this.y - this.factor
    },
    moveDown() {
      this.y = this.y + this.factor
    },
    moveLeft() {
      this.x = this.x - this.factor
    },
    moveRight() {
      this.x = this.x + this.factor
    },
    move(evt) {
      if (evt.buttons > 0 && evt.movementX > 0 && evt.movement > 0) {
        this.x += evt.movementX
        this.y += evt.movementY
        console.log('move: x:', this.x, 'y:', this.y)
      }
    },
    async zoomFit() {
      if (this.original.width >= this.original.height) {
        this.zoom = this.templateWidth / this.original.width
      } else {
        this.zoom = this.templateHeight / this.original.height
      }
      scaleImage(this.original.img, {
        width: this.original.width * this.zoom,
        height: this.original.height * this.zoom
      })
        .then((resizedImage) => {
          this.resizedImg = resizedImage
          this.getNaturalSize(resizedImage).then((size) => {
            this.resizedWidth = size.width
            this.resizedHeight = size.height
          })
          this.$refs['photo'].src = this.resizedImg
          return this.resizedImg
        })
        .catch((err) => {
          message.error(err.message)
        })
    },
    zoomIn() {
      this.zoom *= 1.1
      scaleImage(this.original.img, {
        width: this.original.width * this.zoom,
        height: this.original.height * this.zoom
      })
        .then((resizedImage) => {
          this.resizedImg = resizedImage
        })
        .catch((err) => {
          message.error(err.message)
        })
    },
    zoomOut() {
      this.zoom /= 1.1
      scaleImage(this.original.img, {
        width: this.original.width * this.zoom,
        height: this.original.height * this.zoom
      })
        .then((resizedImage) => {
          this.resizedImg = resizedImage
        })
        .catch((err) => {
          message.error(err.message)
        })
    },
    readImg(evt) {
      var reader = new FileReader()
      reader.onerror = (err) => {
        message.error(err.message)
        return
      }
      reader.onload = () => {
        this.original.img = reader.result
        this.getNaturalSize(this.original.img).then((size) => {
          this.original.width = size.width
          this.original.height = size.height
          this.zoomFit()
        })
      }
      reader.readAsDataURL(evt)
      return false // prevent upload action
    },
    removeImg() {
      this.original.img = null
      this.resized.img = null
    },
    getNaturalSize(image) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          resolve({ width: img.naturalWidth, height: img.naturalHeight })
        }
        img.onerror = reject
        img.src = image
      })
    },
    download() {
      const a = document.createElement('a') //Create <a>
      a.href = this.$refs['result'].src //Image Base64 Goes here
      a.download = 'smiter.png' //File name Here
      a.click() //Downloaded file
    },
    templateChanged(template) {
      this.templateImg = template.image.url
      this.$nextTick(() => {
        document.getElementById('img').removeAttribute('capture') //TODO tweak
      })
    }
  },
  watch: {
    x(newX, oldX) {
      if (this.resizedImg && newX !== oldX) {
        this.merge()
      }
    },
    y(newY, oldY) {
      if (this.resizedImg && newY !== oldY) {
        this.merge()
      }
    },
    resizedImg(newImg, oldImg) {
      if (newImg != null && newImg !== oldImg) {
        this.merge()
      }
    },
    templateImg(newImg, oldImg) {
      if (newImg !== null && newImg !== oldImg) {
        const image = new Image()
        image.onload = () => {
          this.templateWidth = image.width
          this.templateHeight = image.height
        }
        image.src = this.templateImg
      } else {
        this.templateWidth = 0
        this.templateHeight = 0
      }
    }
  }
}
</script>
