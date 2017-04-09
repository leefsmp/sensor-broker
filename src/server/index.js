// async support
import 'babel-polyfill'

//Server stuff
import express from 'express'
import path from 'path'

//endpoint
import SocketAPI from './api/endpoints/socket'

//Services
import ServiceManager from './api/services/SvcManager'
import SensorTagSvc from './api/services/SensorTagSvc'
import SocketSvc from './api/services/SocketSvc'

//Config (NODE_ENV dependant)
import config from'c0nfig'

/////////////////////////////////////////////////////////////////////
// App initialization
//
/////////////////////////////////////////////////////////////////////
var app = express()

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
const onSensorDiscovered = (sensor, socketSvc) => {

  console.log(' Connecting sensor ...')
  console.log('')

  console.log(' ---------------------------------------------')
  console.log('  Sensor Id: ' + sensor.id)

  sensor.connectAndSetUp((error) => {

    if (error) {

      console.log('Error connecting sensor:')
      console.log(error)
      return
    }

    sensor.readBatteryLevel((error, batteryLevel) => {

      console.log('  Battery Level: ' + batteryLevel)
    })

    sensor.readSystemId((error, systemId) => {

      console.log('  System Id: ' + systemId)
    })

    sensor.readFirmwareRevision((error, firmwareRevision) => {

      console.log('  Firmware Revision: ' + firmwareRevision)
    })

    sensor.readHardwareRevision((error, hardwareRevision) => {

      console.log('  Hardware Revision: ' + hardwareRevision)
    })

    sensor.readManufacturerName((error, manufacturerName) => {

      console.log('  Manufacturer: ' + manufacturerName)
      console.log(' ---------------------------------------------')
    })

    var data = {
      acceleration: config.sensor.acceleration,
      temperature: config.sensor.temperature,
      lux: config.sensor.lux,
      sensorId: sensor.id
    }

    sensor.enableIrTemperature()

    sensor.setIrTemperaturePeriod(1000)

    sensor.notifyIrTemperature ()

    sensor.on('irTemperatureChange', (objectTemperature, ambientTemperature) => {

      if (Math.abs(data.temperature.value - objectTemperature) > 1.0)  {

        console.log(' ----------------- TEMP ----------------------' )
        console.log('Ambient Temperature: ' + ambientTemperature)
        console.log('Object Temperature: ' + objectTemperature)
        console.log('')

        data.temperature.value = objectTemperature

        socketSvc.broadcast('sensor.temperature', data)
      }
    })


    sensor.enableAccelerometer()

    sensor.setAccelerometerPeriod(1000)

    sensor.notifyAccelerometer()

    sensor.on('accelerometerChange', (x, y, z) => {

      const acceleration = squaredNorm({
        x, y, z
      })

      if (Math.abs(data.acceleration.value - acceleration) > 0.2) {

        console.log(' ----------------- ACCEL ----------------------')
        console.log('Acceleration: ' + acceleration)
        console.log('')

        data.acceleration.value = acceleration

        socketSvc.broadcast('sensor.acceleration', data)
      }
    })


    sensor.enableLuxometer()

    sensor.setLuxometerPeriod(1000)

    sensor.notifyLuxometer()

    sensor.on('luxometerChange', (lux) => {

      if (Math.abs(data.lux.value - lux) > 50.0) {

        console.log(' ----------------- LUX ----------------------')
        console.log('Lux: ' + lux)
        console.log('')

        data.lux.value = lux

        socketSvc.broadcast('sensor.lux', data)
      }
    })
  })
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
const squaredNorm = (v) => {

  return v.x * v.x + v.y * v.y + v.z * v.z
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
const runServer = (app) => {

  try {

    process.on('exit', () => {

    })

    process.on('uncaughtException', (err) => {

      console.log('uncaughtException')
      console.log(err)
      console.error(err.stack)
    })

    process.on('unhandledRejection', (reason, p) => {

      console.log('Unhandled Rejection at: Promise ', p,
        ' reason: ', reason)
    })

    const sensorTagSvc = new SensorTagSvc({

    })

    const socketSvc = new SocketSvc({
      host: config.client.host,
      port: config.client.port
    })

    ServiceManager.registerService(sensorTagSvc)
    ServiceManager.registerService(socketSvc)

    var server = app.listen(
      process.env.PORT || config.server_port || 5000, () => {

        const port = server.address().port
        console.log('Server listening on PORT: ' + port)
        console.log('ENV: ' + process.env.NODE_ENV)

        socketSvc.connect().then((socket) => {

          console.log(`${config.client.host}:${config.client.port}`)

          const id = socket.id
          console.log('Client socket connected: ' + id)
        })

        sensorTagSvc.on('sensor.discovered', (sensor) => {

          onSensorDiscovered(sensor, socketSvc)
        })

        sensorTagSvc.discoverAll()
      })

  } catch (ex) {

    console.log('Failed to run server... ')
    console.log(ex)
  }
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
runServer(app)

