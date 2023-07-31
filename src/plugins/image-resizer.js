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
        let canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext("2d", {alpha: true})


        context.drawImage(image, 0, 0, canvas.width, canvas.height)

        while (canvas.width * 0.5 > dimensions.width) {
            console.log('canvas: ', canvas.width)
            console.log('dimension: ', dimensions.width)
            canvas = resize(canvas, canvas.width / 2, canvas.height / 2)
        }
        console.log('final canvas: ', canvas.width)

        if (image.height <= image.width) {
            const scaleProportions = dimensions.height / image.height
            const scaledWidth = scaleProportions * image.width
            canvas = resize(canvas, scaledWidth, dimensions.height)
        } else {
            const scaleProportions = dimensions.width / image.width
            const scaledHeight = scaleProportions * image.height
            canvas = resize(canvas, dimensions.width, scaledHeight)
        }
        data = canvas.toDataURL('image/png')
    })
    // console.log('DATA: ', data)
    return data
}

function resize(img, width, height) {
    const canvas = newCanvas(width, height);

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

    return canvas;
}


function newCanvas(width, height) {

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    return canvas;
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

