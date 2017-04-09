import ServiceManager from './SvcManager'
import EventsEmitter from './EventsEmitter'

export default class BaseSvc extends EventsEmitter {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(config = {}) {

    super()

    this._config = config
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return this._name
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  config() {

    return this._config
  }
}
