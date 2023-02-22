<template>
    <div class="step-block d-flex justify-content-center text-center">
      <div class="step-start-wrap d-flex align-items-center">
        <div class="step-start"></div>
      </div>
      <div
        class="step-line-wrap d-flex align-items-center justify-content-center"
      >
        <div class="step-line"></div>
      </div>

      <div class="step-circle-wrap d-flex align-items-center justify-content-center">
        <div
          class="step-circle d-flex align-items-center justify-content-center"
          :style="step >= 1 ? 'background-color: rgba(246, 213, 94, 0.4);' : ''"
        >
        <div class="step-inner-circle" :style="step >= 1 ? 'background-color: rgb(246, 213, 94);' : ''">

          <h4 class="step-number"
          :style="step >= 1 ? 'color: #fff;' : ''">1</h4>

        </div>
        </div>
        <p class="step-text"
        :style="step >= 1 ? 'color: #000;' : ''">填選訂單</p>
      </div>
      <div
        class="step-line-wrap d-flex align-items-center justify-content-center"
      >
        <div
          class="step-line"
          :style="step < 2 ? 'border: dashed var(--line-base) #bebebe;' : ''"
        ></div>
      </div>
      <div class="step-circle-wrap">
        <div
          class="step-circle d-flex align-items-center justify-content-center"
          :style="step >= 2 ? 'background-color: rgba(246, 213, 94, 0.4);' : ''"
        >
        <div class="step-inner-circle" :style="step >= 2 ? 'background-color: rgb(246, 213, 94);' : ''">
          
          <h4 class="step-number"
          :style="step >= 2 ? 'color: #fff;' : ''">2</h4>

        </div>
          
        </div>
        <p class="step-text"
        :style="step >= 2 ? 'color: #000;' : ''">確認預訂</p>
      </div>
      <div
        class="step-line-wrap d-flex align-items-center justify-content-center"
      >
        <div
          class="step-line"
          :style="step < 3 ? 'border: dashed var(--line-base) #bebebe' : ''"
        ></div>
      </div>
      <div class="step-circle-wrap">
        <div
          class="step-pill d-flex align-items-center justify-content-center"
          :style="step >= 3 ? 'background-color: rgba(246, 213, 94, 0.4);' : ''"
        >
        <div 
          class="step-inner-pill" 
          :style="step >= 3 ? 'background-color: rgb(246, 213, 94);' : ''">
          <h5 class="step-number"
          :style="step >= 3 ? 'color: #fff;' : ''">完成</h5>
        </div>
          
        </div>
        <p class="step-text"
        :style="step >= 3 ? 'color: #000;' : ''">預訂成功</p>
      </div>
    </div>
</template>
<script>


export default {
    data() {
        return{

        }
    },
    props:{
        step: Number,
    },
}
</script>

<style scoped>

@media screen and (max-width: 991px) {
    .step-block.step-block{
        --size-base: 3.4rem;
    }
    h5{
        font-size: 18px;
    }
}
@media screen and (max-width: 479px) {
    .step-block.step-block{
        --size-base: 3rem;
        --line-base: .6px;
    }
    .step-line-wrap.step-line-wrap {
      width: 10vw;
    }
    .step-line.step-line {
      transform: scale(4);
    }
    h4{
        font-size: 18px;
    }
    h5{
        font-size: 16px;
    }
}

 * {
  --step-gray: rgb(190, 190, 190);
  --step-gray-700: rgba(210, 210, 210, 0.7);
  
}
.step-block{
    --size-base: 4rem;
    --line-base: 1px;
}
/* step-block */
.step-start-wrap {
  height: var(--size-base);
}
.step-start {
  width: calc(var(--size-base) * 0.5);
  height: calc(var(--size-base) * 0.5);
  border-radius: 99rem;
  line-height: calc(var(--size-base) * 0.5);
  background-color: var(--primary-color);
}

.step-line-wrap {
  height: var(--size-base);
  width: 8vw;
}
.step-line {
  /* height: 2px; */
  width: 2.6vw;
  border: solid var(--line-base) var(--primary-color);
  transform: scale(3);
}

.step-circle-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
}
.step-circle {
  width: var(--size-base);
  height: var(--size-base);
  border-radius: 99rem;
  line-height: var(--size-base);
  background-color: var(--step-gray-700);
  margin-bottom: 1rem;
}
.step-inner-circle{
  width: calc(var(--size-base) * 0.7);
  height: calc(var(--size-base) * 0.7);
  line-height: calc(var(--size-base) * 0.7);
  border-radius: 99rem;
  background-color: var(--step-gray);
}

.step-number {
  line-height: calc(var(--size-base) * 0.7);
  color: rgba(255, 255, 255, 0.7);
}
.step-text{
  color: var(--step-gray);
}

.step-pill {
  width: calc(var(--size-base) * 1.5);
  height: var(--size-base);
  border-radius: 75rem;
  line-height: var(--size-base);
  color: #fff;
  background-color: var(--step-gray-700);
  margin-bottom: 1rem;
}
.step-inner-pill{
  width: calc(var(--size-base) * 1.15);
  height: calc(var(--size-base) * 0.7);
  border-radius: 75rem;
  line-height: var(--size-base);
  color: rgba(255, 255, 255, 0.7);
  background-color: var(--step-gray);
}

</style>