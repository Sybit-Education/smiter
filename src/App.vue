<template>
  <div>
    <h2>Image Merger</h2>
    <div>
        <div>
            <label for="img">Choose an image:</label>
            <input type="file" id="img" name="img" accept="image/*" @change="readURL" />
        </div>
    </div>

    <div v-if="resizedImg">
      <img ref="result" @mousemove="move" />
      <button @click="download">Downloads</button>
      <table>
        <tr>
          <td> </td><td><button @click="moveUp">⬆️</button></td><td> <button @click="zoomIn">➕</button> </td>
        </tr>
        <tr>
          <td><button @click="moveLeft">⬅️</button></td><td></td><td><button @click="moveRight">➡️</button></td>
        </tr>
        <tr><td></td><td><button @click="moveDown">⬇️</button></td><td> <button @click="zoomOut">➖</button>  </td></tr>
      </table>
    </div>
  </div>

</template>

<script>
import mergeImages from 'merge-images'
import scaleImage from '@/plugins/image-resizer'

export default {
  name: 'App',
  data () {
    return {
      x: 0,
      y: 0,
      factor: 100,
      originalImg: null,
      originalWidth: 0,
      originalHeight: 0,
      resizedImg: null,
      templateImg: null,
      templateWidth: 0,
      templateHeight:0
    }
  },
  created () {
    this.templateImg = 'template/Postingvorlage-SM.png'
  },
  methods: {
    merge () {
      if(this.resizedImg) {
        const toMerge = [
          {src: this.resizedImg, x: this.x, y: this.y},
          {src: this.templateImg, x: 0, y: 0}
        ]
        mergeImages(toMerge)
          .then(b64 => this.$refs['result'].src = b64)
      }
    },
    moveUp () {
      this.y = this.y - this.factor
      console.log('y:', this.y)
    },
    moveDown () {
      this.y = this.y + this.factor
      console.log('y:', this.y)

    },
    moveLeft () {
      this.x = this.x - this.factor
      console.log('x:', this.x)
    },
    moveRight () {
      this.x = this.x + this.factor
      console.log('x:', this.x)
    },
    move(evt) {
      if (evt.buttons > 0 &&  evt.movementX > 0 &&  evt.movement > 0) {
        this.x += evt.movementX
        this.y += evt.movementY
        console.log('x:', this.x, 'y:', this.y)
      }
    },
    zoomIn () {
      scaleImage(this.originalImg, {width: this.originalWidth * .8, height: this.originalHeight * 0.8})
          .then((resizedImage) => {
            this.resizedImg = resizedImage
          })
          .catch((err) => {
            console.error(err)
          })
    },
    zoomOut() {
      scaleImage(this.originalImg, {width: this.originalWidth * .5, height: this.originalHeight * 0.5})
          .then((resizedImage) => {
            this.resizedImg = resizedImage
          })
          .catch((err) => {
            console.error(err)
          })
    },
    readURL(evt) {
      var reader = new FileReader()
      reader.readAsDataURL(evt.target.files[0])
      reader.onload = () => {
        this.originalImg = reader.result
        this.getNaturalSize(this.originalImg).then(size => {
          this.originalWidth = size.width
          this.originalHeight = size.height
        })
        scaleImage(this.originalImg, {width: this.templateWidth, height: this.templateHeight })
          .then((resizedImage) => {
            this.resizedImg = resizedImage

          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    async getNaturalSize(image) {
      const img = new Image()
      img.src = image
      await new Promise((resolve) => resolve(image.onload))
      return {width: img.naturalWidth, height: img.naturalHeight}
    },
    download () {
      const a = document.createElement("a"); //Create <a>
      a.href = this.$refs['result'].src //Image Base64 Goes here
      a.download = "smiter.png"; //File name Here
      a.click(); //Downloaded file
    }
  },
  watch: {
    x(newX, oldX) {
      if(this.resizedImg && newX !== oldX) {
        this.merge()
      }
    },
    y(newY, oldY) {
      if(this.resizedImg && newY !== oldY) {
        this.merge()
      }
    },
    resizedImg(newFile, oldFile) {
      if(newFile != null && newFile !== oldFile) {
        this.merge()
      }
    },
    templateImg(newImg, oldImg) {
      console.log('templateImg', newImg, oldImg)
      if(newImg !== null && newImg !== oldImg) {
        const image = new Image()
        image.onload = () => {
          console.log(`the image dimensions are ${image.width}x${image.height}`);
          this.templateWidth = image.width
          this.templateHeight = image.height
        }
        image.src = this.templateImg
      }
    }
  }
}
</script>
