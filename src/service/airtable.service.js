import Airtable from 'airtable'

export const api = new Airtable({
  apiKey: `${import.meta.env.VITE_APP_AIRTABLE_API_KEY}`
}).base(`${import.meta.env.VITE_APP_AIRTABLE_BASE}`)

export default api
