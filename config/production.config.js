
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
    temperature:{
      threshold: 22
    }
  }
}

module.exports = config


