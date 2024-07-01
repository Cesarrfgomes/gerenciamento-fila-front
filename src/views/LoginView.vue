<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const emailInput = ref("");
const passwordInput = ref("");

const handlesubmit = async (event) => {
  event.preventDefault();

  if (!emailInput.value || !passwordInput.value) {
    return;
  }

  const response = await api.post(
    "/login?userEmail=filipegomes012642@gmail.com",
    {
      email: emailInput.value,
      password: passwordInput.value,
    }
  );

  authStore.handleSetToken(response.data.token);
  router.push("/admin");
};
</script>

<template>
  <div class="container">
    <header>
      <router-link to="/">
        <button class="btn-white--outline">Voltar</button>
      </router-link>
    </header>

    <main>
      <img src="../assets/logo.svg" alt="logo" />
      <form class="form" @submit="handlesubmit">
        <div class="form__input--container">
          <label for="login">
            <input type="text" id="login" v-model="emailInput" />
          </label>
        </div>

        <div class="form__input--container">
          <label for="password">
            <input type="password" id="password" v-model="passwordInput" />
          </label>
        </div>

        <button class="btn-orange">Login</button>
      </form>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

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

  button {
    width: 113px;
  }
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  min-height: calc(100vh - 64px - 56px);

  img {
    width: 289px;
    height: 77px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__input-container {
      display: flex;
      flex-direction: column;
    }

    button {
      width: 500px;
    }
  }
}
</style>
