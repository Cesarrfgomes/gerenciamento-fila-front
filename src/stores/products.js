import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

export const useProductsStore = defineStore("products", () => {
    const products = ref([])

    async function loadAllProducts() {
        const response = await api.get("/products")

        if (response.status !== 200) {
            return
        }

        products.value = [...response.data]

    }

    return { products, loadAllProducts }
})
