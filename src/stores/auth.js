import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "")

  const handleSetToken = (newToken) => {
    token.value = newToken

    localStorage.setItem("token", newToken)
  }

  return { token, handleSetToken }

})
