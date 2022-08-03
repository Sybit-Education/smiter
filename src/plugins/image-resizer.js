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
    if (!imageContent.match(/image.*/)) return null

    const image = new Image()
    image.src = imageContent

    await new Promise((resolve) => resolve(image.onload))
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", {alpha: true});

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    if (image.height <= image.width) {
        const scaleProportions = canvas.height / image.height;
        const scaledWidth = scaleProportions * image.width;
        context.drawImage(image, (canvas.width - scaledWidth)/2, 0, scaledWidth, canvas.height);
    }
    else {
        const scaleProportions = canvas.width / image.width;
        const scaledHeight = scaleProportions * image.height;
        context.drawImage(image, 0, (canvas.height - scaledHeight)/2, canvas.width, scaledHeight);
    }

    const blob = await new Promise((res) => canvas.toBlob(res))
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
}
