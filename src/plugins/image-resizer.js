/**
 * Function scaling an image from a file input to specified dimensions
 * If the specified dimensions are not proportional to image dimensions the output image will be cropped at center
 *
 * @param imageContent base64 encoded content of file
 * @param dimensions {{width: number, height: number}} Dimenstions of the output image
 * @returns {Promise<Blob | null>} Promise resolving to a scale image or a null if provided an invalid file type
 */
export default async function scaleImage(imageContent, dimensions) {
  // ensure the file is an image
  if (!imageContent.match(/image.*/)) {
    throw "No Image content!"
  }

  let data = ""
    await loadImage(imageContent).then(async image => {
      const canvas = document.createElement("canvas")
      canvas.width = dimensions.width
      canvas.height = dimensions.height
      const context = canvas.getContext("2d", {alpha: true})

      if (image.height <= image.width) {
        const scaleProportions = canvas.height / image.height
        const scaledWidth = scaleProportions * image.width
        context.drawImage(image, (canvas.width - scaledWidth)/2, 0, scaledWidth, canvas.height)
      } else {
        const scaleProportions = canvas.width / image.width
        const scaledHeight = scaleProportions * image.height
        context.drawImage(image, 0, (canvas.height - scaledHeight)/2, canvas.width, scaledHeight)
      }
      data = canvas.toDataURL('image/png', 1)
    })


  // console.log('DATA: ', data)
  return data
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    // console.log('IMAGE: ', image)
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  })
}

