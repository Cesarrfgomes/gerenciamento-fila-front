<script setup>
const props = defineProps({
  item: Object,
});

const emit = defineEmits("selectItem");

const selectRadio = () => {
  emit("selectItem", props.item.id);
};
</script>

<template>
  <div class="container-item">
    <div class="container-item__info">
      <img :src="props.item.image" alt="burger" />
      <div>
        <span>{{ props.item.name }}</span>
        <span>R$ {{ props.item.price }}</span>
      </div>
    </div>
    <div>
      <input
        type="radio"
        name="product"
        :value="props.item.name"
        id="green"
        @change="selectRadio()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-item {
  display: flex;
  justify-content: space-between;

  margin-bottom: 24px;

  &__info {
    display: flex;
    img {
      width: 30px;
      height: 30px;

      background: #229b20;

      border-radius: 50%;

      padding: 4px;
      margin-right: 16px;
    }

    div {
      display: flex;
      flex-direction: column;

      span {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;

        color: black;

        &:last-of-type {
          font-size: 12px;
          line-height: 15px;

          color: rgba(34, 34, 38, 8.82);
        }
      }
    }
  }
  input {
    width: 20px;
    height: 20px;

    border: 2px solid black;
  }
}
</style>
