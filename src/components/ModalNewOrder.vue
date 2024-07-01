<script setup>
import { onMounted, ref } from "vue";
import OrderItem from "./OrderItem.vue";
import api from "../services/api";

const emit = defineEmits(["enableModal"]);

const allProducts = ref([]);

const showSuccess = ref(false);
const nameInput = ref("");

const currentItemId = ref("");

const itemId = (id) => {
  currentItemId.value = id;
};

onMounted(async () => {
  const response = await api.get("/products");

  allProducts.value = response.data;
});

const closeModal = () => {
  emit("enableModal");
};

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!nameInput.value || !currentItemId.value) {
    return;
  }

  const response = await api.post(
    "/orders?userEmail=filipegomes012642@gmail.com",
    {
      product_id: currentItemId.value,
      client_name: nameInput.value,
    }
  );

  if (response.status !== 200) {
    return;
  }

  showSuccess.value = true;
};
</script> 

<template>
  <div class="container-modal">
    <form v-if="!showSuccess" @submit="handleSubmit">
      <div class="order">
        <div>
          <h2 class="order__h2">Novo Pedido</h2>
          <img
            class="order__img"
            src="../assets/close-icon.svg"
            alt="close-icon"
            @click="closeModal()"
          />
        </div>

        <span class="order__span">Escolha o seu pedido e confirme!</span>

        <div>
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Digite seu nome"
            v-model="nameInput"
          />
        </div>

        <span class="order__span">Pedido</span>

        <div
          class="order__item"
          v-for="product in allProducts"
          :key="product.id"
        >
          <OrderItem :item="product" @selectItem="itemId" />
        </div>
      </div>

      <hr />

      <div class="container-buttons">
        <button
          class="btn-black btn-black--outline"
          type="button"
          @click="closeModal()"
        >
          Cancelar
        </button>
        <button class="btn-green">Confirmar pedido</button>
      </div>
    </form>
    <div class="content-success" v-else>
      <img
        src="../assets/check.svg"
        alt="success"
        class="content-success__img"
      />

      <strong class="content-success__strong">Pedido realizado!</strong>
      <span class="content-success__span">Aguarde e acompanhe o pedido</span>
      <router-link to="/queue">
        <button class="btn-green content-success__btn">
          Acompanhar pedido
        </button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  width: 570px;
  height: 609.16px;

  background: #ffffff;

  box-shadow: 0px 6.01413px 12.0283px;
  border-radius: 12px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
  }

  label {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 21.0495px;
    line-height: 182%;

    color: #2a224f;
  }

  hr {
    color: rgba(34, 34, 38, 0.08);
    width: 100%;
  }
}

.order {
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 24px 32px;

  &__h2 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 24.0565px;
    line-height: 152%;
  }

  &__img {
    cursor: pointer;

    width: 18px;
    height: auto;

    position: absolute;
    right: 8px;
    top: 12px;
  }

  &__span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 21.0495px;
    line-height: 160%;

    margin: 16px 0 48px 0;

    &:last-of-type {
      margin: 16px 0;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
  }
}

.container-buttons {
  display: flex;
  justify-content: space-between;

  width: 100%;

  padding: 24px 32px;

  button {
    width: 125px;
    &:last-of-type {
      width: 240px;
    }
  }
}

.content-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__img {
    width: 166px;
    height: 166px;
  }

  &__strong {
    margin-top: 40px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 24.0565px;
    line-height: 152%;

    text-align: center;

    color: #282a2f;
  }

  &__span {
    margin: 16px 0 24px 0;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 21.0495px;
    line-height: 160%;

    text-align: center;

    color: #282a2f;
  }

  &__btn {
    width: 270px;
  }

  a {
    text-decoration: none;
  }
}
</style>