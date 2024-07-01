<script setup>
import { onMounted, ref } from "vue";
import { useOrdersStore } from "../stores/orders";
import { useAuthStore } from "../stores/auth";
import api from "../services/api";
import socket from "../services/socket";

const ordersStore = useOrdersStore();
const currentOrder = ref("");
const allOrders = ref([]);
const authStore = useAuthStore();

onMounted(async () => {
  const orders = await ordersStore.loadAllOrders();

  allOrders.value = orders;

  socket.on("orders-filipegomes012642@gmail.com", (param) => {
    allOrders.value = [...allOrders.value, param];
  });
});

const filterNotDone = () => {
  const allOrdersNotDone = allOrders.value.filter(
    (order) => order.status !== "done"
  );

  return allOrdersNotDone;
};

const setCurrentOrder = (order) => {
  currentOrder.value = order;
};

const updateOrderStatus = async (newStatus) => {
  if (!currentOrder.value) {
    return;
  }

  const response = await api.put(
    `/orders/${currentOrder.value.id}`,
    {
      status: newStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    }
  );

  console;

  if (response.status !== 200) {
    return;
  }

  if (newStatus === "done") {
    const updatedAllOrders = allOrders.value.filter(
      (order) => order.id !== currentOrder.value.id
    );

    allOrders.value = [...updatedAllOrders];
  }

  currentOrder.value = "";
};
</script>

<template>
  <div class="container">
    <main>
      <div class="content">
        <div class="left">
          <h1>PEDIDOS PENDENTES</h1>
          <h2>Selecione para editar o pedido</h2>
          <div class="left__order">
            <div
              v-for="order in filterNotDone()"
              :key="order.id"
              @click="setCurrentOrder(order)"
            >
              <h1>{{ order.number }}</h1>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right__top">
            <img
              class="right__img"
              :src="currentOrder.image"
              alt="product"
              v-if="currentOrder.image"
            />
            <img
              class="right__img"
              src="../assets/empty.svg"
              alt="empty"
              v-else
            />
          </div>
          <div class="right__body">
            <div>
              <h1>Pedido</h1>
              <div class="current">
                <h1 v-if="currentOrder">{{ currentOrder.number }}</h1>
              </div>
            </div>
            <div class="container__buttons">
              <button class="btn-yellow" @click="updateOrderStatus('waiting')">
                CHAMAR
              </button>
              <button class="btn-green" @click="updateOrderStatus('done')">
                FINALIZAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  width: 100vw;
  min-height: 100vh;

  padding: 44px 40px;
}

main {
  width: calc(100vw - 300px - 64px);
  padding: 32px;

  background: rgba(214, 243, 162, 0.45);
  border-radius: 37.2px;
}

.content {
  display: flex;
  justify-content: space-between;

  height: 100%;

  background: #ffffff;
  border-radius: 37.2px;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 50%;
    margin: 48px 32px;

    h1 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 900;
      font-size: 36px;
      line-height: 44px;

      color: #229b20;
    }

    h2 {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 35px;
      margin: 30px 0 10px 0;

      border-radius: 5px;

      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 15.2px;
      line-height: 18px;

      background: #ff9900;

      color: #ffffff;
    }

    &__order {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;

      cursor: pointer;

      width: 100%;

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 48%;
        height: 94.71px;

        background: #ffead1;
        border-radius: 5px;

        h1 {
          font-family: "Inter";
          font-style: normal;
          font-weight: 700;
          font-size: 40px;
          line-height: 49px;

          color: #ff9900;
        }
      }
    }
  }
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 490px;

  &__top {
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.05);

    width: 100%;
    height: 50%;

    img {
      width: 340px;
      height: auto;

      border-radius: 32px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 332px;
    padding: 48px 24px;

    background: #fdfdfd;
    border-radius: 31.9px;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;

        color: #229b20;
      }

      .current {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 100px;
        height: 48px;

        background: #e6ffe6;
        border: 2px solid #229b20;
        border-radius: 5px;
      }
    }
    .container__buttons {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }
  }
}
</style>

