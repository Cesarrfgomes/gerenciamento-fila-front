import { defineStore } from "pinia"
import api from "../services/api"


export const useOrdersStore = defineStore("orders", () => {
    const loadAllOrders = async () => {
        const response = await api.get("/orders?userEmail=filipegomes012642@gmail.com")

        if (response.status !== 200) {
            return
        }

        return response.data.length ? [...response.data] : []
    }

    return { loadAllOrders }
})