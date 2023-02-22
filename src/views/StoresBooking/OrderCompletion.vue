<template>
  <!-- step-block -->
  <div class="container mt-5">
    <StepProgressBar :step="step" />
  </div>
  <!-- step-block end -->
  <!-- card -->
  <div class="container">
    <div class="row justify-content-center">
      <div class="wrapper row flex-column align-items-center m-5 p-3">
        <p class="text-center">恭喜，已成功完成訂位！立刻到訂位記錄確認吧！</p>
        <p class="text-center">
          將自動跳轉至訂位記錄頁面，若未自動跳轉請自行點選下面按鈕
        </p>
      </div>
      <div class="btn-block d-flex justify-content-center">
        <button class="send btn rounded-pill text-center mb-5">
          到訂位記錄
        </button>
      </div>
    </div>
  </div>
  <!-- card end -->
</template>
<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push("/orderlist");
    }, 4000);
  },
  data() {
    return {
      step: 3,
    };
  },
  methods: {
    redirect() {
      this.$router.push("/orderlist");
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 580px) {
  .wrapper {
    width: 90vw;
  }
}

.wrapper {
  background-color: #fff;
  max-width: 700px;
  margin-top: 8vh;
  margin-bottom: 8vh;
  padding-top: 6vh 4vw;
  border-radius: 5px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
}

.send {
  background-color: rgb(246, 213, 94);
  color: rgb(69, 144, 212);
  width: 300px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
}
</style>
