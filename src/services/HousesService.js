import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class HousesService {
    async getHouses() {
        const res = await api.get('api/houses')
        logger.log('getting houses', res.data)
        const newHouses = res.data.map(pojo => new House(pojo))
        AppState.houses = newHouses
    }
    async createHouse(houseData) {
        const res = await api.post('api/houses', houseData)
        logger.log('creating a new house', res.data)
        const newHouse = new House(res.data)
        AppState.houses.push(newHouse)
    }
    async getHouseById(houseId) {
        const res = await api.get(`api/houses/${houseId}`)
        logger.log('getting a house', res.data)
        const newHouse = new House(res.data)
        AppState.activeHouse = newHouse
    }
    async destroyHouse(houseId) {
        const res = await api.delete(`api/houses/${houseId}`)
        logger.log(res.data)
        this.clearData()

    }
    async editHouse(houseData) {
        const res = await api.put(`api/houses/${houseData.id}`, houseData)
        logger.log('editing a house!', res.data)
        const newHouse = new House(res.data)
        AppState.activeHouse = newHouse
    }
    clearData() {
        AppState.activeHouse = null
    }
}

export const housesService = new HousesService()