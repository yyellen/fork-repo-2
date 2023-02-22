<template>
  <div class="container">
    <!-- step-block -->
    <StepProgressBar :step="step" class="my-5"/>
    <!-- main-block -->
    <div class="main row justify-content-center gap-4">
      <!-- input-block -->
      <div class="input-form col-xl-5 col-lg-5 col-md-8 col-sm-10 col-xs-10">
        <!-- RWD-info-block -->
        <div class="md-display">
          <StoreCard :bookingStore="bookingStore" :storeInfo="storeInfo" />
        </div>
        <!-- form-block -->
        <div class="wrap">
          <div class="d-flex justify-content-center">
            <DatePicker
              is-expanded
              v-model="date"
              :min-date="new Date()"
              @click="convertDayValue"
            />
            <!-- 以下為公休日設定 -->
            <!-- :disabled-dates="{ weekdays: [1, 2] }" -->
          </div>
          <div class="d-flex justify-content-between">
            <p>訂位日期</p>
            <p>{{ getDate() }}</p>
          </div>
          <hr>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <p>訂位人數</p>

            <div
              class="
                attendance-group
                d-flex
                justify-content-center
                align-items-center
              "
            >
              <div class="btn-group btn-group-sm me-1">
                <button
                  class="minus-btn btn btn-outline-secondary"
                  type="button"
                  @click="
                    infos[1].value >= 2 ? infos[1].value-- : infos[1].value == 1
                  "
                >
                  －
                </button>
                <input
                  type="text"
                  class="form-control text-center"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model="infos[1].value"
                />
                <button
                  class="plus-btn btn btn-outline-secondary"
                  type="button"
                  @click="infos[1].value++"
                >
                  ＋
                </button>
              </div>
              <p>人</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <p>開始時段</p>
            <div class="beginningtime-block">
              <div class="input-group input-group-sm">
                <div
                  type="input"
                  class="time-select-output btn btn-outline-secondary"
                >
                  {{ BeginningTime }}
                </div>
                <button
                  type="button"
                  class="
                    split-btn
                    btn btn-outline-secondary
                    dropdown-toggle dropdown-toggle-split
                  "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="time-dropdown-menu dropdown-menu dropdown-menu-end">
                  <li
                    class="dropdown-item"
                    v-for="dropdownValue in dropdownValues"
                    :key="dropdownValue"
                    @click="getBeginningTime(dropdownValue)"
                  >
                    {{ dropdownValue }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <p>結束時段</p>
            <div class="enddingtime-block">
              <div class="input-group input-group-sm">
                <div
                  type="input"
                  class="time-select-output btn btn-outline-secondary"
                >
                  {{ EnddingTime }}
                </div>
                <button
                  type="button"
                  class="
                    split-btn
                    btn btn-outline-secondary
                    dropdown-toggle dropdown-toggle-split
                  "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="time-dropdown-menu dropdown-menu dropdown-menu-end">
                  <li
                    class="dropdown-item"
                    v-for="dropdownValue in dropdownValues"
                    :key="dropdownValue"
                    @click="getEnddingTime(dropdownValue)"
                  >
                    {{ dropdownValue }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <p>遊玩桌遊</p>
            <div class="enddingtime-block">
              <div class="input-group input-group-sm">
                <div
                  type="input"
                  class="time-select-output btn btn-outline-secondary"
                >
                  {{ selectedGame }}
                </div>
                <button
                  type="button"
                  class="
                    split-btn
                    btn btn-outline-secondary
                    dropdown-toggle dropdown-toggle-split
                  "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="time-dropdown-menu dropdown-menu dropdown-menu-end">
                  <li
                    class="dropdown-item"
                    v-for="dropdownGame in dropdownGames"
                    :key="dropdownGame"
                    @click="selectedGame = dropdownGame"
                  >
                    {{ dropdownGame }}
                  </li>
                </ul>
              </div>
              <div class="d-flex justify-content-end mt-2">
                <div
                  class="recommendation accentColor xs-font"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  @click="getRecommendGame"
                >
                  點我推薦！
                </div>
              </div>

              <!-- Modal Start -->
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div
                  class="
                    modal-dialog
                    modal-lg
                    modal-dialog-centered
                    modal-dialog-scrollable
                  "
                >
                  <div class="modal-content">
                    <div class="d-flex justify-content-center">
                      <h1 class="modal-title" id="staticBackdropLabel">
                        我們推薦您！
                      </h1>
                    </div>

                    <div class="modal-body d-flex justify-content-center">
                      <div class="flex-text-content">
                        依照您的桌遊類型喜好,推薦您
                        <div class="game mt-2 d-flex justify-content-center">
                          {{ recommendation }} ！
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        class="modal-Btn"
                        @click="selectedGame = recommendation"
                        data-bs-dismiss="modal"
                      >
                        <h4>聽起來不錯</h4>
                      </button>
                      <button class="modal-Btn" data-bs-dismiss="modal">
                        <h4>沒興趣</h4>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal End -->
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <p>套用優惠</p>
            <div class="coupon-block">
              <div class="input-group input-group-sm">
                <button
                  type="button"
                  class="coupon-select-output btn btn-outline-secondary"
                >
                  {{ Coupon }}
                </button>
                <button
                  type="button"
                  class="
                    split-btn
                    btn btn-outline-secondary
                    dropdown-toggle dropdown-toggle-split
                  "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul
                  class="coupon-dropdown-menu dropdown-menu dropdown-menu-end"
                >
                  <li
                    class="dropdown-item"
                    v-for="coupon in useCoupon"
                    :key="coupon"
                    @click="getCoupon(coupon)"
                  >
                    {{ coupon.key }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <p>點數折扣</p>
            <div class="point-block d-flex align-items-center">
              <div class="point-input input-group input-group-sm me-1">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="infos[6].value"
                />
              </div>

              <p class="me-2">點</p>
              <span>(剩餘</span>
              <span>{{ remainPoints }}</span>
              <span>點)</span>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <p>聯絡人姓名</p>
            <div class="d-flex align-items-center">
              <div class="text-input input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="infos[7].value"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <p>聯絡人電話</p>
            <div class="d-flex align-items-center">
              <div class="text-input input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="infos[8].value"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <p>Email</p>
            <div>
              <div class="text-input input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="infos[9].value"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center mb-3">
            <p>備註</p>
            <p>注意事項</p>
          </div>
          <textarea
            name=""
            id=""
            class="col-12"
            rows="10"
            v-model.trim="infos[10].value"
          ></textarea>
        </div>
      </div>

      <!-- output-block -->
      <div
        class="
          output-form
          col-xl-5 col-lg-5 col-md-8 col-sm-10 col-xs-10
          d-flex
          flex-column
        "
      >
        <!-- info-block -->
        <div class="lg-display">
          <StoreCard :bookingStore="bookingStore" :storeInfo="storeInfo" />
        </div>
        <!-- comfirmation-block -->
        <div class="comfirmation-wrapper text-center">
          <div class="content">
            <div
              v-for="info in infos"
              :key="info"
              class="d-flex justify-content-between align-items-center mb-3"
            >
              <p>{{ info.key }}</p>
              <p class="note">{{ info.value }}</p>
            </div>
            <hr />
            <div
              class="
                count-block
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <div class="form-check d-flex align-items-center">
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  v-model="isChecked"
                />
                <label class="form-check-label" for="flexCheckChecked"
                  >我同意 <a  data-bs-toggle="modal" data-bs-target="#exampleModal" class="text-primary">使用條約</a></label
                >
              </div>
              <div class="d-flex align-items-center gap-3">
                <p>總計</p>
                <h2 class="text-danger">{{ getCount }}</h2>
                <p>元</p>
              </div>
            </div>
          </div>
          <router-link @click="submitOrder" to="" style="text-decoration: none"
            ><h5 class="send">確認預訂</h5></router-link
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl  modal-dialog-scrollable">
    <div class="modal-content p-0">
      <div class="modal-header" style="background-color: #f6d55e;">
        <h5 class="modal-title" id="exampleModalLabel"><img src="../../assets/logo.png" alt="" style="width:100px"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>
          「BGIP」是由「BGIP」（下稱我們）所經營之網站(下稱本網站)各項服務與資訊。<br>
          以下是我們的隱私權保護政策，幫助您瞭解本網站所蒐集的個人資料之運用及保護方式。<br>
          一、隱私權保護政策的適用範圍<br>
          &emsp; （1）請您在於使用本網站服務前，確認您已審閱並同意本隱私權政策所列全部條款，若您不同意全部或部份者，則請勿使用本網站服務。<br>
          &emsp; （2）隱私權保護政策內容，包括我們如何處理您在使用本網站服務時蒐集到的個人識別資料。<br>
          &emsp; （3）隱私權保護政策不適用於本網站以外的相關連結網站，亦不適用於非我們所委託或參與管理之人員。<br>
          二、個人資料的蒐集及使用<br>
          &emsp; （1）於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進服務的參考依據，此記錄為內部應用，絕不對外公布。<br>
          &emsp; （2）在使用我們的服務時，我們可能會要求您向我們提供可用於聯繫或識別您的某些個人資料，包括：<br>
          &emsp; &emsp; • C001辨識個人者： 如姓名、地址、電話、電子郵件等資訊。<br>&emsp; &emsp;  •
          C011個人描述：例如：性別、出生年月日等。
          <br>&emsp; （3）本網站將蒐集的數據用於各種目的：<br>&emsp; &emsp;  •提供和維護系統所提供讀服務
          <br>&emsp; &emsp; •提供用戶支持&emsp; &emsp; <br>&emsp; &emsp;  •提供分析或有價值訊息，以便我們改進服務
          <br>&emsp; &emsp; •監控服務的使用情況<br>&emsp; &emsp;  •檢測，預防和解決技術問題<br>
          &emsp; （4）本網站針對蒐集數據的利用期間、地區、對象及方式：<br>
          &emsp; &emsp; •期間：當事人要求停止使用或本服務停止提供服務之日為止。<br>
          &emsp; &emsp; •地區：個人資料將用於台灣地區。<br>
          &emsp; &emsp; •利用對象及方式：所蒐集到的資料將利用於各項業務之執行，利用方式為因業務執行所必須進行之各項分析、聯繫及通知。<br>
          三、資料的保護與安全<br>
          &emsp; （1）本網站主機均設有防火牆、防毒系統等相關資訊安全設備及必要的安全防護措施，本網站及您的個人資料均受到嚴格的保護。只有經過授權的人員才能接觸您的個人資料，相關處理人員均有簽署保密合約，如有違反保密義務者，將會受到相關的法律處分。<br>
          &emsp; （2）
          如因業務需要有必要委託本網站相關單位提供服務時，我們會要求其遵守保密義務，並採取相當之檢查程序以確定其將確實遵守。<br>
          &emsp; （3）請您妥善保管您的密碼與個人資料，並提醒您使用完畢本網站相關服務後，務必關閉本網站，以免您的資料遭人盜用。<br>
          &emsp; （4）您同意在使用本網站服務時，所留存的資料與事實相符。另若嗣後您發現您的個人資料遭他人非法使用或有任何異常時，應即時通知我們。<br>
          &emsp; （5）您同意於使用本網站服務時，所提供及使用之資料皆為合法，並無侵害第三人權利、違反第三方協議或涉及任何違法行為。如因使用本APP服務而致第三人損害，除因我們故意或重大過失所致外，我們並不負擔相關賠償責任。<br>
          四、對外的相關連結<br>
          本網站上有可能包含其他合作網站或網頁連結，該網站或網頁也有可能會蒐集您的個人資料，不論其內容或隱私權政策為何，皆與本網站
          無關，您應自行參考該連結網站中的隱私權保護政策，我們不負任何連帶責任。<br>
          五、與第三人共用個人資料之政策<br>
          &emsp; （1）本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。<br>
          &emsp; （2）前項但書之情形包括但不限於：<br>&emsp; &emsp;  •經由您書面同意。<br>&emsp; &emsp;  •法律明文規定。<br>
          &emsp; &emsp; •為維護國家安全或增進公共利益。<br>
          &emsp; &emsp; •為免除您生命、身體、自由或財產上之危險。<br>
          &emsp; &emsp; •與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。<br>
          &emsp; &emsp; •當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。<br>
          &emsp; &emsp; •有利於您的權益。<br>
          &emsp; （3）本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。<br>
          六、Cookie之使用<br>
          &emsp; （1）為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導致網站某些功能無法正常執行
          。 <br>以下是可能使用的Cookie範例: <br>&emsp; &emsp; •session cookies.
          用來維護應用程式的狀態<br>&emsp; &emsp;  •Preference Cookies. 用來記錄您的喜好與設定
          <br>&emsp; &emsp; •Security Cookies. 用來控制安全和檢查 <br> 七、未成年人保護<br>
          未成年人於註冊或使用本服務而同意本公司蒐集、利用其個人資訊時，應按其年齡由其法定代理人代為或在法定代理人之同意下為之。<br>
          八、隱私權政策的修訂<br>
          我們將因應需求擁有隨時修改本隱私權保護政策的權利，當我們做出修改時，會於本網站公告，且自公告日起生效，不再另行通知。<br>
        </p>
      </div>
      <div class="modal-footer">
        <div class="container">
        <div class="row justify-content-center">
          <div class="text-center my-1">
            <button class="mainBtn" data-bs-dismiss="modal">
              確認
            </button>
          </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
<!-- Modal end -->
</template>

<script>
// import StarRating from "vue-star-rating";
import { DatePicker } from "v-calendar";
// import 'v-calendar/dist/style.css';
import { db } from "@/firebase/config";
import StepProgressBar from "../../components/StoreBooking/StepProgressBar.vue";
import StoreCard from "../../components/StoreBooking/Booking-StoreCard.vue";

import {
  getDoc,
  doc,
  //addDoc, collection
} from "firebase/firestore";
import axios from "axios";

export default {
  async created() {
    await this.getSingleStore();
    await this.dataHandler();
    await this.setBookingContact();
    await this.convertDayValue();
    
  },
  components: {
    DatePicker,
    // StarRating,
    StoreCard,
    StepProgressBar,
  },
  data() {
    return {
      bookingStore: {},
      // showRating: false,
      step: 1,
      date: "",
      playDate: "",
      dayTimeValue: {},
      userPoints: 0,
      bookingListId: "",
      userId: "",
      storeInfo: [],
      infos: [
        { key: "訂位日期", value: "" },
        { key: "訂位人數", value: "1" },
        { key: "訂位時段", value: "" },
        { key: "遊玩時數", value: "" },
        { key: "套用優惠", value: "" },
        { key: "優惠折扣", value: "" },
        { key: "點數折扣", value: 0 },
        { key: "聯絡人姓名", value: "" },
        { key: "聯絡人電話", value: "" },
        { key: "Email", value: "" },
        { key: "備註", value: "" },
      ],
      BeginningTime: "選擇時段",
      EnddingTime: "選擇時段",
      selectedGame: "選擇桌遊",
      dropdownValues: [],
      Coupon: "選擇優惠券",
      useCoupon: [
        { key: "免費點心", value: 0 },
        { key: "折價30元", value: 30 },
        { key: "折價50元", value: 50 },
      ],
      isChecked: "",
      dropdownGames: [
        "德古拉之怒",
        "戰場：奇幻之戰",
        "挪亞方舟(鐵盒)",
        "矮人礦坑",
        "魔戒",
        "寶石陣",
        "詐賭巫師",
        "說書人",
        "工業革命",
        "權力遊戲:冰與火之歌",
        "波多黎各",
        "農家樂",
        "電力公司",
        "卡卡頌2014新版",
        "印加寶藏;鑽石(Diamant)",
        "富饒之城",
        "山中小屋(中文版)",
        "抵抗組織：阿瓦隆",
        "拉密：標準版",
        "暗影獵人",
        "風聲",
        "魔法風雲會",
        "鍛鑰者",
        "寶可夢TCG",
        "神秘大地",
      ],
      recommendations: [],
      recommendation: "",
    };
  },
  computed: {
    bookingStoreID() {
      return this.$store.state.bookingStoreID;
    },
    userUID() {
      return this.$store.state.user.uid;
    },
    remainPoints() {
      return this.userPoints - this.infos[6].value;
    },
    getCount: function () {
      let count = 0;
      let infos = this.infos;
      let plan = this.bookingStore.WeekPlan;
      let attendance = Number(infos[1].value);
      if (this.date != "" && infos[3].value != "" && attendance > 0) {
        let day = this.date.getDay();
        let actualHours = Math.ceil(Number(infos[3].value));
        let baseHours = plan[day].BasicHour;
        let baseCharge = plan[day].Fee;
        if (actualHours < baseHours) {
          actualHours = baseHours;
        }
        let total =
          Math.ceil(actualHours / baseHours) * baseCharge * attendance;
        let discount = infos[5].value;
        let point = infos[6].value;
        count = total - discount - point;
      }
      return count;
    },
  },

  methods: {
    async getSingleStore() {
      // console.log("get single store");
      // const docRef = doc(db, "Store", String(this.bookingStoreID));
      const result = await getDoc(
        doc(db, "Store", String(this.bookingStoreID))
      );
      // const result = await getDoc(docRef)
      // console.log(result.data())
      this.bookingStore = result.data();
      this.date = this.$store.state.bookingDate;
      // console.log(this.bookingStore);
    },
    async setBookingContact() {
      const getData = await getDoc(doc(db, "Account", this.userUID));
      const result = getData.data();
      this.infos[9].value = result.Email;
      this.infos[8].value = result.Phone;
      this.userPoints = result.Points;
      this.userId = result.UserId;
    },
    transferIndex(index) {
      let Chinese = ["日", "一", "二", "三", "四", "五", "六"];
      let ChineseDay = Chinese[index];
      return ChineseDay;
    },
    convertDayValue() {
      let dateBase = this.date;
      var dayIndex = dateBase.getDay();
      var open = this.bookingStore.WeekPlan[dayIndex].Open;
      var close = this.bookingStore.WeekPlan[dayIndex].Close;
      var openSplit = open.split(":");
      var closeSpit = close.split(":");

      var openH = Number(openSplit[0]);
      var openM = Number(openSplit[1] / 60);

      var closeH = Number(closeSpit[0]);
      var closeM = Number(closeSpit[1] / 60);

      this.dayTimeValue = {
        openTime: openH + openM,
        closeTime: closeH + closeM,
      };

      // console.log(this.dayTimeValue);
      this.getTimeArray();
    },
    getTimeArray() {
      const generateHoursInterval = (
        startHourInMinute,
        endHourInMinute,
        interval
      ) => {
        const times = [];

        for (let i = 0; startHourInMinute < 24 * 60; i++) {
          if (startHourInMinute > endHourInMinute) break;

          var hh = Math.floor(startHourInMinute / 60); // getting hours of day in 0-24 format

          var mm = startHourInMinute % 60; // getting minutes of the hour in 0-55 format

          times[i] = ("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2);

          startHourInMinute = startHourInMinute + interval;
        }

        return times;
      };

      const interval = 30; //minutes interval

      const startDate = 60 * this.dayTimeValue.openTime; // start time in minutes

      const endDate = 60 * this.dayTimeValue.closeTime; // end time in minutes

      const foo = generateHoursInterval(startDate, endDate, interval);

      this.dropdownValues = foo;
    },
    getBeginningTime: function (dropdownValue) {
      let BeginningArr = dropdownValue.split(":");
      let EnddingArr = this.EnddingTime.split(":");
      let BeginningNumber =
        (Number(BeginningArr[0]) * 60 + Number(BeginningArr[1])) / 60;
      let EnddingNumber =
        (Number(EnddingArr[0]) * 60 + Number(EnddingArr[1])) / 60;
      if (EnddingNumber > BeginningNumber || isNaN(EnddingNumber)) {
        this.BeginningTime = dropdownValue;
        this.infos[2].value = this.BeginningTime + "-" + this.EnddingTime;
        this.infos[3].value = EnddingNumber - BeginningNumber;
      }
    },
    getEnddingTime: function (dropdownValue) {
      let BeginningArr = this.BeginningTime.split(":");
      let EnddingArr = dropdownValue.split(":");
      let BeginningNumber =
        (Number(BeginningArr[0]) * 60 + Number(BeginningArr[1])) / 60;
      let EnddingNumber =
        (Number(EnddingArr[0]) * 60 + Number(EnddingArr[1])) / 60;
      if (EnddingNumber > BeginningNumber || isNaN(BeginningNumber)) {
        this.EnddingTime = dropdownValue;
        this.infos[2].value = this.BeginningTime + "-" + this.EnddingTime;
        this.infos[3].value = EnddingNumber - BeginningNumber;
      }
    },
    getCoupon: function (coupon) {
      this.Coupon = coupon.key;
      this.infos[4].value = this.Coupon;
      this.infos[5].value = coupon.value;
    },
    getDate: function () {
      let dateBase = this.date;
      let getDate = "";
      let Chinese = ["日", "一", "二", "三", "四", "五", "六"];

      if (this.date != "") {
        let day = dateBase.getDay();
        let getChineseDay = Chinese[day];
        let year = dateBase.getFullYear();
        let month = dateBase.getMonth() + 1;
        let date = dateBase.getDate();

        getDate =
          year + "年" + month + "月" + date + "日 " + " 星期" + getChineseDay;
        this.playDate = year + "-" + month + "-" + date;
      }
      this.infos[0].value = getDate;
      return getDate;
    },
    dataHandler: function () {
      let dataBase = this.bookingStore.WeekPlan;
      let businessHours = [];
      let dailyFee = [];
      let transferIndex = this.transferIndex;

      function hoursHandler() {
        let arr = [];
        let sundayArr = [];
        dataBase.forEach((item) => arr.push(item.Open + " - " + item.Close));
        let sunDay = arr.shift();
        sundayArr.push(sunDay);
        arr.forEach((item, index, arr) => {
          if (arr.indexOf(item) === index) {
            let obj = {};
            obj.day = [];
            obj.day.push(index + 1);
            obj.hours = item;
            businessHours.push(obj);
          } else {
            businessHours.forEach( Item => {
              if (item === Item.hours) {
                Item.day.push(index + 1);
              }
            });
          }
        });
        if (businessHours.some( item => item.hours === sundayArr[0])) {
          businessHours.forEach( Item => {
            if (sundayArr[0] === Item.hours) {
              Item.day.push(0);
            }
          });
        } else if (!businessHours.some( item => item.hours === sundayArr[0])) {
          let obj = {};
          obj.day = [];
          obj.day.push(0);
          obj.hours = sundayArr[0];
          businessHours.push(obj);
        }
        businessHours.forEach( Item =>
          Item.day.forEach(
            (item, index, arr) => (arr[index] = transferIndex(item))
          )
        );
        return businessHours;
      }

      function feeHandler() {
        let arr = [];
        let sundayArr = [];
        dataBase.forEach((item) => {
          let obj = {};
          obj.Fee = item.Fee;
          obj.BasicHour = item.BasicHour;
          arr.push(obj);
        });
        let sunDay = arr.shift();
        sundayArr.push(sunDay);
        arr.forEach((item, index, arr) => {
          let result = arr.findIndex(
            (Item) => Item.Fee === item.Fee && Item.BasicHour === item.BasicHour
          );
          if (result === index) {
            let obj = {};
            obj.day = [];
            obj.day.push(index + 1);
            obj.detail = item;
            dailyFee.push(obj);
          } else {
            dailyFee.forEach( Item => {
              if (
                item.Fee === Item.detail.Fee &&
                item.BasicHour === Item.detail.BasicHour
              ) {
                Item.day.push(index + 1);
              }
            });
          }
        });

        let same = (item) =>
          item.detail.Fee === sundayArr[0].Fee &&
          item.detail.BasicHour === sundayArr[0].BasicHour;

        if (dailyFee.some(same)) {
          dailyFee.forEach((Item) => {
            if (
              Item.detail.Fee === sundayArr[0].Fee &&
              Item.detail.BasicHour === sundayArr[0].BasicHour
            ) {
              Item.day.push(0);
            }
          });
        } else if (!dailyFee.some(same)) {
          let obj = {};
          obj.day = [];
          obj.day.push(0);
          obj.detail = sundayArr[0];
          dailyFee.push(obj);
        }

        dailyFee.forEach((Item) =>
          Item.day.forEach(
            (item, index, arr) => (arr[index] = transferIndex(item))
          )
        );
        return dailyFee;
      }
      hoursHandler();
      feeHandler();
      this.storeInfo.push(businessHours, dailyFee);
    },
    getRandom(x) {
      return Math.floor(Math.random() * x) + 1;
    },
    getRandomID(ID) {
      var n = 0;
      for (var i = 0; i < 4; i++) {
        n = this.getRandom(9);
        ID += String(n);
      }
      return ID;
    },
    getRecommendGame() {
      axios
        .get(`https://tgame-api.ddns.net/${this.userId}`)
        .then((res) => {
          var gameList = res.data.gameList;
          this.recommendation = gameList[0].name;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    submitOrder() {
      let dateBase = this.date;
      // var dayIndex = dateBase.getDay();

      if (!this.date) {
        this.$snackbar.add({
          type: "error",
          text: "尚未選擇訂位日期",
        });
        return;
      } else if (isNaN(this.infos[3].value) || this.infos[3].value == "") {
        this.$snackbar.add({
          type: "error",
          text: "請務必選擇開始及結束時間",
        });
        return;
      } else if (
        this.infos[3].value <
        this.bookingStore.WeekPlan[dateBase.getDay()].BasicHour
      ) {
        this.$snackbar.add({
          type: "warning",
          text: `遊玩時數未達基礎時數【${this.bookingStore.WeekPlan[dateBase.getDay()].BasicHour}小時】，金額仍將以基礎消費計算`,
        });
      } else if (this.infos[7].value == "") {
        this.$snackbar.add({
          type: "error",
          text: "請填寫訂位人姓名",
        });
      } else if (this.selectedGame == "選擇桌遊"){
        this.$snackbar.add({
          type: "error",
          text: "請選擇桌遊",
        });
        return;
      }
      else if (this.isChecked !== true) {
        this.$snackbar.add({
          type: "error",
          text: "如需進行服務，需同意使用條約",
        });
        return;
      } else if (this.getCount < 0 ) {
        this.$snackbar.add({
          type: "error",
          text: "結帳金額不可小於０",
        });
        return;
      }else {
        const string = this.infos[2].value;
        const stringResult = string.split("-");
        const start = stringResult[0];
        const end = stringResult[1];

        var orderDetail = {
          BookingListId: this.getRandomID("7000"),
          StoreId: this.bookingStore.StoreID,
          BookingId: {
            Count: this.infos[1].value,
            Id: this.userId,
            Comfirm: true,
          },
          Participant: [Number(this.userId)],
          PlayDate: this.playDate,
          Quantity: this.infos[1].value,
          StartTime: start,
          EndTime: end,
          TimeCount: this.infos[3].value,
          Status: "一般已訂位",
          Name: "一般訂位",
          Tags: [],
          Contact: this.infos[7].value,
          Phone: this.infos[8].value,
          Email: this.infos[9].value,
          Note: this.infos[10].value,
          CouponName: this.infos[4].value,
          CouponDiscount: this.infos[5].value,
          PointDiscount: this.infos[6].value,
          Price: this.getCount / this.infos[1].value,
          GameName: [this.selectedGame],
        };
        this.$store.commit("setOrderCheckData", orderDetail);
        this.$router.push("/orderdetail");
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 991px) {
  .md-display.md-display {
    display: block;
  }
  .lg-display {
    display: none;
  }
}
* {
  --step-gray: rgb(190, 190, 190);
  --step-gray-700: rgba(210, 210, 210, 0.7);
  --input-gray: rgb(118, 118, 118);
  --input-btn-gray-hover: rgba(118, 118, 118, 0.7);
}

/* font */
p,
h4,
h5,
h6 {
  margin-bottom: 0px;
}
.md-display {
  display: none;
}

.main {
  margin-bottom: 8vh;
}
.recommendation:hover {
  color: var(--accent-color-800);
  cursor: pointer;
}
.game {
  font-weight: bolder;
}
.modal-content {
  padding: 50px 14%;
}
.flex-text-content {
  padding: 10% 0;
}

.modal-Btn {
  font-size: 2rem;
  font-weight: bolder;
  padding: 3% 2%;
  background-color: #f6d55e;
  color: #4590d4;
  width: 170px;
  text-align: center;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
  border-radius: 100rem;
  border: none;
  text-decoration: none;
}

/* calendar */
.vc-container {
  border: 0px;
}

/* step-block */
.step-start-wrap {
  height: 4rem;
}
.step-start {
  width: 2rem;
  height: 2rem;
  border-radius: 99rem;
  line-height: 2rem;
  background-color: var(--primary-color);
}

.step-line-wrap {
  height: 4rem;
  width: 6vw;
}
.step-line {
  /* height: 2px; */
  width: 2vw;
  border: solid 1px var(--primary-color);
  transform: scale(3);
}

.step-circle-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
}
.step-circle {
  width: 4rem;
  height: 4rem;
  border-radius: 99rem;
  line-height: 4rem;
  background-color: var(--step-gray-700);
  margin-bottom: 1rem;
}

.step-inner-circle{
  width: 2.8rem;
  height: 2.8rem;
  line-height: 2.8rem;
  border-radius: 99rem;
  background-color: var(--step-gray);
}
.step-number {
  line-height: 2.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.step-text{
  color: var(--step-gray);
}
.step-pill {
  width: 6rem;
  height: 4rem;
  border-radius: 75rem;
  line-height: 4rem;
  color: #fff;
  background-color: var(--step-gray-700);
  margin-bottom: 1rem;
}

.step-inner-pill{
  width: 4.7rem;
  height: 2.8rem;
  border-radius: 75rem;
  line-height: 4rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: var(--step-gray);
}
/* input-block */
.wrap {
  background-color: #fff;
  padding: 2vh 2vw;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
}

/* attendance-input-block */
.attendance-group {
  width: 130px;
}
.minus-btn,
.plus-btn {
  background-color: var(--input-gray);
  color: #fff;
}
.minus-btn:hover,
.plus-btn:hover {
  background: var(--input-btn-gray-hover);
}

/* time-select-block */
.time-select-output {
  width: 100px;
  cursor: default;
}
.time-select-output:hover {
  background-color: #fff;
  color: var(--input-gray);
  cursor: default;
}
.split-btn {
  width: 30px;
  background-color: var(--input-gray);
  color: #fff;
}
.split-btn:hover {
  background: var(--input-btn-gray-hover);
}
.split-btn:focus:hover {
  background-color: var(--input-btn-gray-hover);
}
.time-dropdown-menu {
  min-width: 130px;
  max-height: 170px;
  overflow-y: overlay;
  -webkit-overflow-scrolling: touch;
  cursor: pointer;
}
.time-dropdown-menu::-webkit-scrollbar {
  width: 10px;
}
.time-dropdown-menu::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background-color: var(--input-gray);
  border: 2px solid rgba(255, 255, 255);
}

/* .coupon-select-block */
.coupon-select-output {
  width: 140px;
  cursor: default;
}
.coupon-select-output:hover {
  background-color: #fff;
  color: var(--input-gray);
  cursor: default;
}
.coupon-dropdown-menu {
  width: 170px;
  cursor: pointer;
}

/* point-block */
.point-input {
  width: 70px;
}
span {
  font-size: 12px;
  margin: 0;
  padding: 0;
}

/* note-block */
.note-input {
  width: 170px;
}

/* comfirmation-block */
.comfirmation-wrapper {
  background-color: #fff;
  border: solid 6px var(--primary-color);
  border-radius: 12px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
}
.content {
  padding: 4vh 3vw;
  width: 100%;
}
textarea {
  resize: none;
  padding: 20px;
  outline: none;
}
.note {
  max-width: 70%;
  word-break: break-all;
  white-space: pre-wrap;
}
.form-check-input:checked {
  background-color: rgb(69, 144, 212);
  border: rgb(69, 144, 212);
}
.send {
  background-color: var(--primary-color);
  letter-spacing: 3px;
  padding: 20px;
  color: var(--accent-color);
}
</style>