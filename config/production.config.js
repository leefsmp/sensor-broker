
/////////////////////////////////////////////////////////////////////
// PRODUCTION configuration
//
/////////////////////////////////////////////////////////////////////
const config = {

  client: {
    // this the public host name of your server for the
    // client socket to connect.
    // eg. https://myforgeapp.mydomain.com
    host: 'https://forge-rcdb.autodesk.io',
    env: 'production',
    port: 443
  },
  sensor: {
    acceleration: {
      threshold: 0.5,
      value: 0
    },
    temperature: {
      threshold: 22,
      value: 0
    },
    lux: {
      threshold: 100,
      value: 0
    }
  }
}

module.exports = config


