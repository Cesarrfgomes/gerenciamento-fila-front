<script setup>
import { onMounted, ref } from "vue";
import ModalNewOrder from "../../components/ModalNewOrder.vue";
import { useProductsStore } from "../../stores/products";

const openModal = ref(false);
const productStore = useProductsStore();

onMounted(() => {
  productStore.loadAllProducts();
});
</script>

<template>
  <div class="container">
    <header>
      <router-link to="/login">
        <button class="btn-white--outline">Login</button>
      </router-link>
    </header>

    <main class="main-home">
      <img src="../../assets/logo.svg" alt="logo" />

      <button class="btn-orange" @click="openModal = true">Novo pedido</button>

      <router-link to="/queue">
        <button class="btn-orange--outline">Acompanhar pedidos</button>
      </router-link>
    </main>

    <ModalNewOrder v-if="openModal" @enableModal="openModal = false" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  min-height: 100vh;
  padding: 32px;

  a {
    text-decoration: none;
  }
}

header {
  display: flex;
  justify-content: flex-end;

  width: 100%;
  button {
    width: 113px;
  }
}

.main-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0;
  margin: 0;

  min-height: calc(100vh - 64px - 56px);

  img {
    height: 77px;
  }

  button {
    width: 423px;
  }
}
</style>
