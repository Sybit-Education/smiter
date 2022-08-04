import api from '@/service/airtable.service'

export const templateService = {
  async getList () {
    return new Promise((resolve, reject) => {
      const all = []
      api('Template')
        .select({
          view: 'published'
        })
        .eachPage(
          function page (records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            records.forEach((record) => {
              all.push({
                id: record.id,
                name: record.fields.Name,
                image: {
                  url: record.fields?.Image[0].url,
                  preview: record.fields?.Image[0].thumbnails.large.url,
                  width: record.fields?.Image[0].width,
                  height: record.fields?.Image[0].height
                }
              })
            })
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage()
          },
          function done (err) {
            if (err) {
              console.error(err)
              reject(err)
            }
            resolve(all)
          }
        )
    })
  }
}
export default templateService
