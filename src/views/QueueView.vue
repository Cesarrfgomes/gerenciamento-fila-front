<script setup>
import { onMounted, ref } from "vue";
import { useOrdersStore } from "../stores/orders";
import socket from "../services/socket";

const ordersStore = useOrdersStore();

const allOrders = ref([]);
const currentOrderInDisplay = ref("");

socket.on("orders-filipegomes012642@gmail.com", (param) => {
  allOrders.value = [...allOrders.value, param];
});

onMounted(async () => {
  const orders = await ordersStore.loadAllOrders();

  allOrders.value = orders;

  socket.on("orders-update-filipegomes012642@gmail.com", (param) => {
    const localOrders = [...allOrders.value];

    if (param.status === "waiting") {
      const orderIndex = localOrders.findIndex(
        (order) => order.id === param.id
      );

      localOrders[orderIndex].status = "waiting";

      allOrders.value = [...localOrders];

      currentOrderInDisplay.value = param;

      return;
    }
    currentOrderInDisplay.value = "";

    const filteredOrders = localOrders.filter((order) => order.id !== param.id);

    allOrders.value = [...filteredOrders];
  });
});

const filterOnlyInProduction = () => {
  const onlyInProduction = allOrders.value.filter(
    (order) => order.status === "in production"
  );

  return onlyInProduction;
};

const filterOnlyInWaiting = () => {
  const onlyInWaiting = allOrders.value.filter(
    (order) => order.status === "waiting"
  );

  return onlyInWaiting;
};
</script>

<template>
  <div class="container">
    <aside class="aside">
      <router-link to="/">
        <img class="aside__img" src="../assets/logo.svg" alt="logo" />
      </router-link>

      <strong>Aguarde sua senha ser chamada e dirija-se ao balcão</strong>
    </aside>
    <main>
      <div class="content">
        <div class="left">
          <div class="left__head">
            <img src="../assets/logo.svg" alt="burger" />
            <h1>Próximos pedidos</h1>
          </div>
          <div class="left-columns">
            <div class="left-column left-column--orange">
              <h2>PRÓXIMOS</h2>
              <div v-for="order in filterOnlyInProduction()" :key="order.id">
                <h1>{{ order.number }}</h1>
              </div>
            </div>

            <div class="left-column left-column--green">
              <h2>PRONTOS</h2>
              <div v-for="order in filterOnlyInWaiting()" :key="order.id">
                <h1>{{ order.number }}</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right__top">
            <img
              class="right__img"
              :src="currentOrderInDisplay.image"
              alt="burger"
              v-if="currentOrderInDisplay"
            />
            <img
              class="right__img"
              src="../assets/empty.svg"
              alt="empty"
              v-else
            />
          </div>
          <div class="right__body" v-if="currentOrderInDisplay">
            <div>
              <h1>{{ currentOrderInDisplay.name }}</h1>
              <div class="current">
                <h1>{{ currentOrderInDisplay.number }}</h1>
              </div>
            </div>
            <strong
              >{{ currentOrderInDisplay.client_name }}, pedido pronto!</strong
            >
            <span>Dirija-se ao balcão.</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;

  width: 100vw;
  min-height: 100vh;

  padding: 44px 40px;
}

.aside {
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 25%;
  padding: 0 16px;

  position: relative;

  &__img {
    width: 265px;
    height: 77px;
  }

  strong {
    margin-top: 32px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #ffffff;
  }
}

main {
  width: 75%;
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

    margin: 48px 32px;

    &__head {
      display: flex;
      gap: 16px;

      img {
        width: 54px;
        height: 45px;
      }

      h1 {
        width: 375px;
        height: 44px;

        font-family: "Inter";
        font-style: normal;
        font-weight: 900;
        font-size: 36px;
        line-height: 44px;

        color: #229b20;
      }
    }
  }
  .left-columns {
    display: flex;
    gap: 20px;
    margin-top: 32px;
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 208px;

    h2 {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 34.28px;

      border-radius: 5px;

      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;

      color: #ffffff;
    }

    &--orange {
      h2 {
        background: #ff9900;
      }

      div {
        background: #ffead1;
        color: #ff9900;
      }
    }

    &--green {
      h2 {
        background: #229b20;
      }
      div {
        color: #229b20;
        background: #e6ffe6;
      }
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 93.71px;

      h1 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 48px;
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

        strong,
        span {
          font-family: "Montserrat";
          font-style: normal;
        }

        strong {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;

          color: #302f3c;

          opacity: 0.8;
        }
      }
    }
  }
}
</style>
