
/////////////////////////////////////////////////////////////////////
// DEVELOPMENT configuration
//
/////////////////////////////////////////////////////////////////////
const config = {

  client: {
    host: 'http://localhost',
    env: 'development',
    port: 3000
  },
  sensor: {
    acceleration: {
      threshold: 0.5,
      value: 0
    },
    temperature: {
      threshold: 30,
      value: 0
    },
    lux: {
      threshold: 100,
      value: 0
    }
  }
}

module.exports = config


