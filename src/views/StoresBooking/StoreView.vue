<template>
  <div class="store-view container">
    <div class="row justify-content-center">
      <div class="wrap col-xl-10 col-lg-10 col-sm-12">
        <div>
          <div class="d-flex">
            <img class="img-lg-hidden" :src="currentStore.CoverPhoto" alt="">
            <div class="d-flex flex-column justify-content-between">
               <h1>{{ currentStore.StoreName }}</h1>
               <div class="address-lg-display d-flex align-items-center gap-3">
                 <p class="grayColor"> {{ currentStore.StoreLocation.Address }} </p>
                 <a class="grade-font accentColor"
            :href="`https://www.google.com.tw/maps/place/${currentStore.StoreLocation.Address}`"
            target="_blank"
            title="Google Map"
            >查看路線</a
          >
               </div>
               <div class="d-flex grade-font align-items-center gap-2">
                 <!-- <div>
                   ⭐️⭐️⭐️⭐️⭐️
                 </div> -->
                 <div class="tag">
                   9.2
                 </div>
                 <div class="grade-font accentColor">
                   非常棒！
                 </div>
                 <div class="grade-font grayColor">
                   50則評論
                 </div>
               </div>
               <div class="tag-flex d-flex">
                 <div class="tag" v-for="tag of currentStore.Tags" :key="tag">
                   <p class="nowrap-tag">{{tag}}</p>
                 </div>
               </div>
            </div>
          </div>
          <hr>
          <div class="address-lg-hidden">
            <div class="d-flex align-items-center gap-3">
                <p class="grayColor"> {{ currentStore.StoreLocation.Address}} </p>
                <span class="grade-font accentColor">查看路線</span>
            </div>
          </div>
          <hr class="address-lg-hidden">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-between grayColor">
              <div class="col-5 d-flex align-items-center">
              營業時段
              </div>
              <div class="col-7 d-flex flex-column justify-content-center">
                <div class="d-flex justify-content-between gap-3" v-for=" dailyBusinessHours in storeInfo[0]" :key="dailyBusinessHours">
                  <div class="day-block">
                    星期{{dailyBusinessHours.day.join('/')}}
                  </div>
                  <div class="">
                    {{ dailyBusinessHours.hours }}
                  </div>
                </div>
              </div>
            </div>
            <hr class="line-lg-hidden">
            <div class="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-between grayColor">
              <div class="col-5 d-flex align-items-center">
              收費方式
              </div>
              <div class="col-7 d-flex flex-column justify-content-center ">
                <div class="d-flex justify-content-between gap-3" v-for=" dailyFee in storeInfo[1]" :key="dailyFee">
                  <div class="day-block">星期{{dailyFee.day.join('/')}}</div>
                  <div class="d-flex gap-3">
                    <div>{{dailyFee.detail.Fee}}/人</div>
                    <div>{{dailyFee.detail.BasicHour}}小時</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="row gx-5">
            <div class="col-lg-8 col-md-12 col-sm-12">
              <div class="mb-3 accent-title">
              <p>店家介紹</p>
              </div>
              <div class="slider">
                <div class="slides-group d-flex justify-content-center">
                  <div class="left-arrow d-flex align-items-center" @click="getOrder('Prev',copyImgs,currentImg)">
                   <i class="left-arrow fa-solid fa-angle-left"></i>
                  </div>
                  <div class="slides">
                    <div class="slide-overflow d-flex">
                      <img :src="img.item" :title="img.id" v-for="(img,index) in copyImgs" :key="index">
                    </div>
                  </div>
                  <div class="right-arrow d-flex align-items-center" @click="getOrder('Next',copyImgs,currentImg)">
                    <i class="right-arrow fa-solid fa-angle-right"></i>
                  </div>
                </div>
                <div class="bullets text-center">
                  <input v-for="(img,index) in copyImgs" :key="index" type="radio" name="slider" :id="index" @click="dotHandler(index,copyImgs)" :checked="currentImg===index">
                </div>
              </div>
              <article class="grayColor">
                {{ currentStore.Introduction }}
              </article>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12 d-flex flex-column algin-items-center">
              <div class="accent-title mb-3">
                <p>訂位概況</p>
              </div>
              <div class="col-sm-12 d-flex justify-content-center">
                <div class="col-10 d-flex flex-column justify-content-center align-items-center">
                <!-- is-expanded 自適應寬度 -->
                <DatePicker
                  is-expanded
                  container
                  v-model="date"
                  :min-date="new Date()"
                  :columns="$screens({ lg: 1, md: 2 })"
                  class="my-4"
                  />
                <div class="accent-title mt-3"
                v-show="date==''">
                  請選擇日期查看剩餘座位
                </div>
                <div class="accent-title mt-3">
                  {{ getDate() }}
                </div>
                <div v-show="Remaining!=''">
                  <div class="accent-title d-flex my-3">
                    <p>剩餘座位：</p><p>{{ Remaining }}</p><p>人</p>
                  </div>
                </div>
                
                <button class="Booking-Btn" @click="redirectBooking">
                  <p>我要訂位</p>
                </button>
                <button class="Booking-Btn my-3" @click="redirectNewTeam">
                  <p>我要開團</p>
                </button>
              </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="accent-title">
            當前活動
          </div>
          <hr>
          <div>
            <div class="accent-title">
              <p>顧客評價</p>
            </div>
            <div class="d-flex justify-content-center mx-3">
              <div class="d-flex align-items-center" @click="getOrder('Prev',reviews)">
                <i class="left-arrow fa-solid fa-chevron-left"></i>
              </div>
                  <div class="reviews-block">
                    <transition-group name="flip-list"  tag="div" class="d-flex">
                      <ReviewCard v-for="review in reviews" :key="review" 
                        :review="review"/>
                    </transition-group>
                  </div>
                
                <div class="d-flex align-items-center" @click="getOrder('Next',reviews)">
                  <i class="right-arrow fa-solid fa-chevron-right"></i>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { DatePicker } from "v-calendar";
import { db } from "@/firebase/config";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import ReviewCard from "../../components/StoreBooking/ReviewCard.vue";
export default {
  name: "StoreView",
  components: {
    DatePicker,
    ReviewCard,
  },
  data() {
    return {
      Remaining:"",
      date: "",
      // order:'',
      currentImg:0,
      imgs:[],
      copyImgs:[],
      reviews:[1,2,3,4,5,6,7,8,9,10],
      copyReviews:[],
      currentStore: {},
      storeInfo:[],
    };
  },
  mounted() {
    
  },
  created(){
    this.getSingleStore();
    
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    addItemsId: function(Arr,copyArr){ 
      for(let i = 0 ; i < Arr.length ; i++){
        let obj = {}
        obj.id = i ;
        obj.item = Arr[i] ;
        copyArr.push(obj)
      }
    },
    getOrder: function(order,Arr,currentNum){
      // this.order = order
      if(order=='Next'){
        const shiftItem = Arr.shift();
        Arr.push(shiftItem);
        if(currentNum>=0){
          if(this.currentImg < Arr.length-1){
            this.currentImg ++
          }else{
            this.currentImg = 0
          }
        }
      }
      else if(order=='Prev'){
        const shiftItem = Arr.pop();
        Arr.unshift(shiftItem);
        if(currentNum>=0){
          if(this.currentImg>0){
            this.currentImg --
          }else{
            this.currentImg = Arr.length-1
          }
        }
      }
    },
    dotHandler: function(index,Arr){
      if(index >= Arr[0].id){
        let x = index - Arr[0].id
        for(let i=0;i<x;i++){
          const shiftItem = Arr.shift();
          Arr.push(shiftItem);
        }
      }else{
        let x = index - Arr[0].id + Arr.length
        for(let i=0;i<x;i++){
          const shiftItem = Arr.shift();
          Arr.push(shiftItem);
        }
      }
      this.currentImg=index;
    },
    transferIndex(index) {
      let Chinese = ["日", "一", "二", "三", "四", "五", "六"];
      let ChineseDay = Chinese[index];
      return ChineseDay;
    },
    getDate: function () {
      let dateBase = this.date;
      let getDate = "";
      let Chinese = ["日", "一", "二", "三", "四", "五", "六"];

      let getRemainingDate ="";
      let storeId = this.currentStore.StoreID
      let remainingBase = this.currentStore.Capacity
      
      async function getRemaining(){
          let x = 0;
          const Ref = collection(db, "BookingLists");
          const q = query(Ref, where("StoreId", "==", Number(storeId)),where("PlayDate", "==", getRemainingDate),where("Status", "in", ["一般已訂位","揪團已訂位"]));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            x += doc.data().Quantity
          });
          return x
        }
      if (this.date != "") {
        let day = dateBase.getDay();
        let getChineseDay = Chinese[day];
        let year = dateBase.getFullYear();
        let month = dateBase.getMonth() + 1;
        let date = dateBase.getDate();
        getDate =
          year + "年" + month + "月" + date + "日 " + " 星期" + getChineseDay;
        getRemainingDate = 
          year + "-" + month + "-" + date;

        getRemaining().then( x => this.Remaining = remainingBase - x);
      }
      // this.infos[0].value = getDate;
      return getDate;
    },
    async getSingleStore() {
      const docRef = await doc(db, "Store", String(this.$route.params.storeId));
      getDoc(docRef).then((doc) => {
        this.currentStore = doc.data() ;
        this.imgs = this.currentStore.StorePhotos
        this.addItemsId(this.imgs,this.copyImgs);
        this.dataHandler();
      });
      
      
    },
    dataHandler: function(){
      let dataBase= this.currentStore.WeekPlan ;
      let businessHours = [] ;
      let dailyFee = []
      let transferIndex = this.transferIndex

      function hoursHandler(){
        let arr = [] ;
        let sundayArr = [] ;
        dataBase.forEach(item => arr.push(item.Open + ' - ' + item.Close)) 
        let sunDay = arr.shift()
        sundayArr.push(sunDay)
        arr.forEach(function(item, index, arr){
          if(arr.indexOf(item) === index ){
            let obj = {} ;
            obj.day = [] ;
            obj.day.push(index + 1) ;
            obj.hours = item ;
            businessHours.push(obj) ;
          }
          else{
            businessHours.forEach(function(Item){
              if( item === Item.hours ){
                Item.day.push(index + 1) ;
              }
            })
          } 
        }) 
        if(businessHours.some(item => item.hours === sundayArr[0])){
          businessHours.forEach( Item => {
            if( sundayArr[0] === Item.hours ){
              Item.day.push(0) 
            }
          })
        }else if(!businessHours.some(item => item.hours === sundayArr[0])){
          let obj = {} ;
          obj.day = [] ;
          obj.day.push(0) ;
          obj.hours = sundayArr[0] ;
          businessHours.push(obj) ;
        }
        businessHours.forEach( Item =>
          Item.day.forEach( (item,index,arr) =>
            arr[index] = transferIndex(item)
        ))
        return businessHours
      }

      function feeHandler(){
        let arr = [] ;
        let sundayArr = [] ;
        dataBase.forEach(item => {
          let obj = {}
          obj.Fee = item.Fee
          obj.BasicHour = item.BasicHour
          arr.push(obj)
        })
        let sunDay = arr.shift()
        sundayArr.push(sunDay)
        arr.forEach((item, index, arr) => {
          let result =
          arr.findIndex( Item => Item.Fee === item.Fee 
            && Item.BasicHour === item.BasicHour
          )
          if(result === index){
            let obj = {} ;
            obj.day = [] ;
            obj.day.push(index + 1) ;
            obj.detail = item ;
            dailyFee.push(obj) ;
          }else{
            dailyFee.forEach(function(Item){
              if(item.Fee === Item.detail.Fee && 
              item.BasicHour === Item.detail.BasicHour){
                Item.day.push(index + 1)
              }
            })
          } 
        }) 

        let same = (item) => 
        item.detail.Fee === sundayArr[0].Fee && 
        item.detail.BasicHour === sundayArr[0].BasicHour

        if( dailyFee.some(same)){
           dailyFee.forEach( Item => {
            if( Item.detail.Fee === sundayArr[0].Fee &&
              Item.detail.BasicHour === sundayArr[0].BasicHour ){
              Item.day.push(0) 
            }
          })
        }else if(!dailyFee.some(same)){
          let obj = {} ;
          obj.day = [] ;
          obj.day.push(0) ;
          obj.detail = sundayArr[0] ;
           dailyFee.push(obj) ;
        }

        dailyFee.forEach( Item =>
          Item.day.forEach( (item,index,arr) =>
            arr[index] = transferIndex(item)
        ))
        return dailyFee
      }
      hoursHandler()
      feeHandler()
      this.storeInfo.push(businessHours,dailyFee)
    },
    redirectBooking() {
      if (this.user) {
        this.$store.commit(
          "setBookingStoreID",
          String(this.$route.params.storeId)
        );
        this.$store.state.bookingDate = this.date
        // console.log(
        //   "getting store info from",
        //   this.$store.state.bookingStoreID
        // );
        this.$router.push("/booking")
      } else {
        alert("請先登入");
        this.$router.push("/login");
      }
    },
    redirectNewTeam() {
      if (this.user) {
        this.$store.commit(
          "setBookingStoreID",
          String(this.$route.params.storeId)
        );
        this.$store.state.bookingDate = this.date
        console.log(
          "getting store info from",
          this.$store.state.bookingStoreID
        );
        this.$router.push("/initiating");
      } else {
        alert("請先登入");
        this.$router.push("/login");
      }
    },    
  },
};
</script>

<style scoped>  
@media screen and (max-width: 1399px) {
  .reviews-block{
    min-width: 850px;
   }
}
@media screen and (max-width: 1199px) {
  .wrap{
    width: 100%;
  }  
}
@media screen and (max-width: 991px) {
  .address-lg-display{
    display: none !important;
  }
  .reviews-block.reviews-block{
    min-width: 400px ;
    width: 400px;
  }
  .line-lg-hidden.line-lg-hidden{
    display: block;
  }
  .img-lg-hidden.img-lg-hidden{
    display: block;
  }
  .address-lg-hidden.address-lg-hidden{
    display: flex;
  }
}
@media screen and (max-width: 479px) {
  .reviews-block.reviews-block{
    min-width: 300px ;
    width: 300px;
  }
}

.store-view{
  margin:100px auto ;
}
.wrap {
  background-color: #fff;
  padding: 2vh 2vw;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
}
.img-lg-hidden{
  max-width: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
  flex: calc(100%/3) 0 0;
  height: 150px;
  display: none;
}
.line-lg-hidden{
  display: none;
}
.address-lg-hidden{
  display: none;
}
.accent-title{
  font-weight: 600;
}
.grade-font{
  font-size: 18px;
}
.tag-flex{
  flex-wrap: wrap;
}
.nowrap-tag{
  white-space: nowrap;
}

.slider input{
  all: unset;
  display: inline-flex;
  flex-direction: row;
  width: 10px;
  height: 10px;
  border-radius:100%;
  background: #ccc;
  margin: 0 5px;
}
.slider input:checked{
  background-color: var(--accent-color);
}
.slides{
  width: 90%;
  padding: 5px;
  /* border: solid 1px; */
}
.slide-overflow{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.slide-overflow img{
  object-fit: cover;
  max-width: calc(100%/2 - 10px);
  border-radius: 10px;
  flex: calc(100%/2  - 10px) 0 0;
  height: 200px;
  margin: 5px;
}
.left-arrow,
.right-arrow{
  color: rgb(0, 0, 0,0.7);
  cursor: pointer;
  font-size: 40px;
}
.left-arrow:hover,
.right-arrow:hover{
  color: rgba(0, 0, 0, 0.3);
}

article{
  padding: 30px;
}
.vc-container {
  border: 0px;
  border-radius: 0;
  box-shadow: 4px 4px 10px 2px rgb(210, 210, 210);
}
.Booking-Btn{
  font-size: 2rem;
  font-weight: bolder;
  padding: 6px 20px;
  background-color: #f6d55e;
  color: #4590d4;
  width:200px;
  text-align: center;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
  border-radius: 100rem;
  border: none;
  text-decoration: none;
}
p{
  margin-bottom: 0;
}
 .reviews-block{
  overflow: hidden;
  width: 850px;
  padding: 25px;
  position: relative;
  margin: 0 10px;
  /* border: solid 1px #4590d4; */
}   
.flip-list-move{
  transition: all .5s linear;
}

</style>