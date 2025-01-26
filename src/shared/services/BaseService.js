
import { HttpService } from './HttpService'

export class Base {
  static get entity() {
    throw new Error('"entity" getter not defined')
  }


  static request(payload = {}) {
    return new HttpService({
      auth: true,
      ...payload,
    })
  }
}