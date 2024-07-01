<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.handleSetToken("");

  router.push("/sign-in");
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo-container">
      <img class="sidebar-logo" src="../assets/logo.svg" alt="logo" />
      <h2>Burger ao Cubo</h2>

      <button class="btn-icon sidebar__btn--attendance">
        <img src="../assets/attendance.svg" alt="" />
        Atendimento
      </button>
    </div>

    <button class="btn-icon sidebar__btn--logout" @click="logout()">
      <img src="../assets/logout.svg" alt="logout" />
      Logout
    </button>
  </aside>
</template>

<style lang="scss" >
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 300px;
  min-height: 100vh;
  padding: 30px 24px;

  background: #ffffff;
  box-shadow: 0px 3.125px 35.156px rgba(0, 0, 0, 0.08);

  .sidebar-logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    gap: 10px;

    .sidebar-logo {
      height: 30px;
      padding: 3px;

      border: 2px solid #229a20;
      border-radius: 20%;
    }

    h2 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 14.6px;
      line-height: 22px;
      letter-spacing: 0.01em;
    }
  }

  &__btn--attendance {
    margin-top: 44px;

    background: #e9f5fe;
    color: #229a20;

    img {
      height: 24px;
      height: 24px;
    }
  }

  &__btn--logout {
    background: rgba(40, 42, 47, 0.82);
    color: #ffffff;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>