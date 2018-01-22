// makeReferencesAbsolute.js

const replace = require('replace-in-file')

const options = {
  files: 'node_modules/leaflet/dist/leaflet.css',
  from: /images/g,
  to: '~leaflet/dist/images'
}

replace(options)
  .then(changes => {
    console.log('Modified files:', changes.join(', '))
  })
  .catch(error => {
    console.error('Error occurred:', error)
  })