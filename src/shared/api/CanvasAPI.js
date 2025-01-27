import { Base } from '../services/BaseService'

export class CanvasAPI extends Base {
  static get entity() {
    return 'canvas_templates'
  }

  static async getList() {
    const { data } = await this.request().get(`/${this.entity}`)

    return data
  }

  static async getTemplate(id) {
    const { data } = await this.request().get(`/${this.entity}/${id}`)

    return data
  }

  static async deleteTemplate(payload) {
    const data = await this.request().delete(`/${this.entity}`, { data: payload })

    return data
  }

  static async updateTemplate(payload) {
    const { id, data } = payload

    // Отправляем запрос с уже подготовленным FormData
    const response = await this.request().post(`/${this.entity}/${id}`, data, {})

    return response
  }

  static async createTemplate(payload) {
    const data = await this.request().post(`/${this.entity}`, payload)

    return data
  }
}
