
import SensorTag from 'sensortag'
import BaseSvc from './BaseSvc'

export default class SensorTagSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor (config) {

    super (config)

    this.onDiscoverSensor = this.onDiscoverSensor.bind(this)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return 'SensorTagSvc'
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  onDiscoverSensor (sensor) {

    this.emit('sensor.discovered', sensor)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  discoverAll () {

    console.log('Scanning for sensors ...')

    SensorTag.discoverAll(this.onDiscoverSensor)
  }
}
