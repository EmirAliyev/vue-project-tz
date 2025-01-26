import { Base } from "../services/BaseService"

export class AuthAPI extends Base {
  static get entity() {
    return 'login'
  }

  static async auth(payload) {
    const data = await this.request().post(`/${this.entity}`,payload)

    return data
  }
}