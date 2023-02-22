<template>
    <div class="wrap d-flex flex-column mb-4">
        <div class="d-flex">
          <div class="img-block rounded me-3">
            <img :src="bookingStore.CoverPhoto" alt="" />
          </div>
          <div class="d-flex flex-column justify-content-between">
            <div>
              <h2>{{ bookingStore.StoreName }}</h2>
            </div>
            <!-- <StarRating
              v-model:rating="bookingStore.Rating"
              read-only
              :show-rating="showRating"
            /> -->
            <div class="d-flex">
              <div
                class="
                  rating-block
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                "
              >
                <h4>{{ bookingStore.Rating }}</h4>
              </div>
              <div>
                <div><h5>非常棒！</h5></div>
                <div><p class="xs-font">50則評論</p></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3">{{ bookingStore.StoreLocation.Address }}</div>
        <hr>
        <div class="d-flex">
          <div class="tag me-2" v-for="tag in bookingStore.Tags" :key="tag">
            <p>{{ tag }}</p>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">營業時段</div>
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9 d-flex flex-column">
              <div class="d-flex justify-content-between" v-for=" dailyBusinessHours in storeInfo[0]" :key="dailyBusinessHours">
                <div class="day-block">
                星期{{dailyBusinessHours.day.join('/')}}
                </div>
                <div class="">
                {{ dailyBusinessHours.hours }}
                </div>
              </div>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">收費方式</div>
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9 d-flex flex-column">
              <div class="d-flex justify-content-between" v-for=" dailyFee in storeInfo[1]" :key="dailyFee">
                <div class="day-block">星期{{dailyFee.day.join('/')}}</div>
              <div class="d-flex gap-3">
                <div>{{dailyFee.detail.Fee}}/人</div>
                <div>{{dailyFee.detail.BasicHour}}小時</div>
              </div>
              </div>
          </div>
        </div>
    </div>
</template>
<script>


export default {
    setup() {
        
    },
    props:{
        bookingStore : Object,
        storeInfo : Array,
    },
}
</script>

<style scoped>

/* store-info-block     */

p{
    margin-bottom: 0;
}
.img-block {
  max-width: 50%;
  overflow: hidden;
}
img{
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px;
  flex: calc(100%/3) 0 0;
  height: 150px;
}
.rating-block {
  background-color: var(--accent-color);
  width: 60px;
  color: #fff;
  border-radius: 16px;
}
.tag {
  border-radius: 80px;
  background-color: var(--accent-color);
  padding: 0.1em 0.6em;
  color: #fff;
}

</style>