<template>
    <Loading v-show="loading" />

  <div class="container">

    <div class="d-flex justify-content-center">
      <div class="userEntry-wrapper">
        <h1 class="title text-center">Google初次登入</h1>
        <div class="content">
          <div class="mb-4">
            <p class="input_title">電子信箱</p>
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                v-model="userInfo.email"
              />
              <label for="floatingInput">請輸入電子信箱</label>
            </div>
          </div>
          <div class="mb-4">
            <p class="input_title">手機號碼</p>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="0912345678"
                v-model="userInfo.phone"
              />
              <label for="floatingInput">請輸入手機號碼</label>
            </div>
          </div>
          <div class="mb-4">
            <p class="input_title">暱稱</p>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="王小明"
                v-model="userInfo.username"
              />
              <label for="floatingInput">中英文字8字元以內，後續可修改</label>
            </div>
          </div>
          <div class="row">
            <div class="mb-4 col-12 col-sm-6">
              <p class="input_title">生日</p>
              <div class="form-floating">
                <input
                  type="date"
                  class="form-control birthday"
                  id="floatingInput"
                  placeholder="2022/xx/xx"
                  v-model="userInfo.birthday"
                />
                <label for="floatingInput">請選擇生日</label>
              </div>
            </div>
            <div class="mb-4 col-12 col-sm-12">
              <p class="input_title">性別</p>
              <div
                class="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  value="Male"
                  v-model="userInfo.sex"
                />
                <label class="btn btn-outline-warning" for="btnradio1">
                  <span class="sextext">男性</span>
                </label>

                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                  value="Female"
                  v-model="userInfo.sex"
                />
                <label class="btn btn-outline-warning" for="btnradio2">
                  <span class="sextext">女性</span>
                </label>

                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio3"
                  autocomplete="off"
                  value="Unreveal"
                  v-model="userInfo.sex"
                />
                <label class="btn btn-outline-warning" for="btnradio3">
                  <span class="sextext">不透露</span>
                </label>
              </div>
            </div>
          </div>
          <hr />
          <div :class="{ invisible: !error }" class="err-message d-flex">
            <div><span>Error: </span>{{ this.errorMsg }}</div>
          </div>
          <div class="form-check d-flex justify-content-center my-4">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked
            />
            <p class="form-check-label" for="flexCheckChecked">
              我同意
              <span
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                class="text-primary"
                >使用條約</span
              >
            </p>
          </div>
          <div class="text-center my-3">
            <button class="mainBtn" @click="submitInfo()">下一頁</button>
          </div>
          <div class="toggle-form d-flex justify-content-center">
            <router-link to="login">已有會員？登入</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #f6d55e">
          <h5 class="modal-title" id="exampleModalLabel">
            <img src="../../assets/logo.png" alt="" style="width: 100px" />
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            「BGIP」是由「BGIP」（下稱我們）所經營之網站(下稱本網站)各項服務與資訊。<br />
            以下是我們的隱私權保護政策，幫助您瞭解本網站所蒐集的個人資料之運用及保護方式。<br />
            一、隱私權保護政策的適用範圍<br />
            &emsp;
            （1）請您在於使用本網站服務前，確認您已審閱並同意本隱私權政策所列全部條款，若您不同意全部或部份者，則請勿使用本網站服務。<br />
            &emsp;
            （2）隱私權保護政策內容，包括我們如何處理您在使用本網站服務時蒐集到的個人識別資料。<br />
            &emsp;
            （3）隱私權保護政策不適用於本網站以外的相關連結網站，亦不適用於非我們所委託或參與管理之人員。<br />
            二、個人資料的蒐集及使用<br />
            &emsp;
            （1）於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進服務的參考依據，此記錄為內部應用，絕不對外公布。<br />
            &emsp;
            （2）在使用我們的服務時，我們可能會要求您向我們提供可用於聯繫或識別您的某些個人資料，包括：<br />
            &emsp; &emsp; • C001辨識個人者：
            如姓名、地址、電話、電子郵件等資訊。<br />&emsp; &emsp; •
            C011個人描述：例如：性別、出生年月日等。 <br />&emsp;
            （3）本網站將蒐集的數據用於各種目的：<br />&emsp; &emsp;
            •提供和維護系統所提供讀服務 <br />&emsp; &emsp; •提供用戶支持&emsp;
            &emsp; <br />&emsp; &emsp; •提供分析或有價值訊息，以便我們改進服務
            <br />&emsp; &emsp; •監控服務的使用情況<br />&emsp; &emsp;
            •檢測，預防和解決技術問題<br />
            &emsp; （4）本網站針對蒐集數據的利用期間、地區、對象及方式：<br />
            &emsp; &emsp;
            •期間：當事人要求停止使用或本服務停止提供服務之日為止。<br />
            &emsp; &emsp; •地區：個人資料將用於台灣地區。<br />
            &emsp; &emsp;
            •利用對象及方式：所蒐集到的資料將利用於各項業務之執行，利用方式為因業務執行所必須進行之各項分析、聯繫及通知。<br />
            三、資料的保護與安全<br />
            &emsp;
            （1）本網站主機均設有防火牆、防毒系統等相關資訊安全設備及必要的安全防護措施，本網站及您的個人資料均受到嚴格的保護。只有經過授權的人員才能接觸您的個人資料，相關處理人員均有簽署保密合約，如有違反保密義務者，將會受到相關的法律處分。<br />
            &emsp; （2）
            如因業務需要有必要委託本網站相關單位提供服務時，我們會要求其遵守保密義務，並採取相當之檢查程序以確定其將確實遵守。<br />
            &emsp;
            （3）請您妥善保管您的密碼與個人資料，並提醒您使用完畢本網站相關服務後，務必關閉本網站，以免您的資料遭人盜用。<br />
            &emsp;
            （4）您同意在使用本網站服務時，所留存的資料與事實相符。另若嗣後您發現您的個人資料遭他人非法使用或有任何異常時，應即時通知我們。<br />
            &emsp;
            （5）您同意於使用本網站服務時，所提供及使用之資料皆為合法，並無侵害第三人權利、違反第三方協議或涉及任何違法行為。如因使用本APP服務而致第三人損害，除因我們故意或重大過失所致外，我們並不負擔相關賠償責任。<br />
            四、對外的相關連結<br />
            本網站上有可能包含其他合作網站或網頁連結，該網站或網頁也有可能會蒐集您的個人資料，不論其內容或隱私權政策為何，皆與本網站
            無關，您應自行參考該連結網站中的隱私權保護政策，我們不負任何連帶責任。<br />
            五、與第三人共用個人資料之政策<br />
            &emsp;
            （1）本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。<br />
            &emsp; （2）前項但書之情形包括但不限於：<br />&emsp; &emsp;
            •經由您書面同意。<br />&emsp; &emsp; •法律明文規定。<br />
            &emsp; &emsp; •為維護國家安全或增進公共利益。<br />
            &emsp; &emsp; •為免除您生命、身體、自由或財產上之危險。<br />
            &emsp; &emsp;
            •與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。<br />
            &emsp; &emsp;
            •當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。<br />
            &emsp; &emsp; •有利於您的權益。<br />
            &emsp;
            （3）本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。<br />
            六、Cookie之使用<br />
            &emsp;
            （1）為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導致網站某些功能無法正常執行
            。 <br />以下是可能使用的Cookie範例: <br />&emsp; &emsp; •session
            cookies. 用來維護應用程式的狀態<br />&emsp; &emsp; •Preference
            Cookies. 用來記錄您的喜好與設定 <br />&emsp; &emsp; •Security
            Cookies. 用來控制安全和檢查 <br />
            七、未成年人保護<br />
            未成年人於註冊或使用本服務而同意本公司蒐集、利用其個人資訊時，應按其年齡由其法定代理人代為或在法定代理人之同意下為之。<br />
            八、隱私權政策的修訂<br />
            我們將因應需求擁有隨時修改本隱私權保護政策的權利，當我們做出修改時，會於本網站公告，且自公告日起生效，不再另行通知。<br />
          </p>
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row justify-content-center">
              <div class="text-center my-1">
                <button class="mainBtn" data-bs-dismiss="modal">確認</button>
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
import { db } from "@/firebase/config";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export default {
  data() {
    return {
      loading: null,
      error: null,
      errorMsg: "",
      userInfo: {
        email: null,
        phone: null,
        username: null,
        birthday: null,
        sex: null,
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getUserInfo() {
      try {
        const docRef = doc(db, "Account", this.user.uid);
        const docRes = await getDoc(docRef);
        const data = docRes.data();
        console.log("user info getted",data)
        this.userInfo.email = data.Email;
        this.userInfo.username = data.Username;
      } catch {
        (err) => {
          console.log(err.message);
        };
      }
    },
    async submitInfo() {
      if (this.userInfo.phone == null) {
        this.$snackbar.add({
          type: "error",
          text: "請填寫手機號碼",
        });
        return;
      } else if (this.userInfo.birthday == null) {
        this.$snackbar.add({
          type: "error",
          text: "請填寫生日欄位",
        });
        return;
      } else if (this.userInfo.sex == null) {
        this.$snackbar.add({
          type: "error",
          text: "請填寫性別欄位",
        });
        return;
      } else {
        this.loading = true;
        updateDoc(doc(db, "Account", this.user.uid), {
          Phone: this.userInfo.phone,
          Gender: this.userInfo.sex,
          Birthday: this.userInfo.birthday,
        }).then(() => {
          this.$snackbar.add({
            type: "info",
            text: "接下來只要選擇喜歡的桌遊就可以完成註冊了喔！",
          });
          this.$router.push("/gamefavorite");
        });
      }
    },
  },
};
</script>

<style scoped>
.btn-outline-warning {
  border-radius: 100rem !important;
  border: none !important;
  color: #4590d4 !important;
  font-weight: bolder;
}

.btn-group {
  border: 3px solid rgb(246, 213, 94);
  width: 350px;
  text-align: center;
  line-height: 2;
  border-radius: 100rem;
  text-decoration: none;
  height: 3.5rem !important;
}

.sextext {
  font-size: 1.3rem;
  position: relative;
  top: 3px;
}

@media (min-width: 992px) {
  .birthday {
    width: 350px;
  }
}

@media (max-width: 991px) {
  .btn-group {
    width: 250px;
  }
}

.title {
  margin-bottom: 4vh;
}

.form-control {
  border-radius: 100px;
  border: 3px solid rgb(246, 213, 94);
  height: 3.5rem !important;
  padding-left: 2rem !important;
}

.form-control:focus {
  border-color: rgb(246, 213, 94, 0.6);
  box-shadow: 0 0 2px 4px rgba(246, 213, 94, 0.3);
}

label {
  color: rgb(150, 150, 150);
  margin-left: 1.3rem;
}

.input_title {
  padding-left: 2rem;
  margin-bottom: 2px;
}

.msg {
  padding-left: 20px;
  margin-bottom: 0px;
  color: rgb(150, 150, 150);
  font-size: 16px;
}

.warning-msg {
  padding-left: 20px;
  margin-bottom: 0px;
  color: #ff0000;
  font-size: 14px;
}

.form-check-input:checked {
  background-color: rgb(69, 144, 212);
  border: rgb(69, 144, 212);
}

.invisible {
  opacity: 0 !important;
}

.err-message {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  bottom: 10px;
  background-color: #777777;
  opacity: 1;
  transition: 0.5s ease all;
}

.err-message div {
  color: #fff;
}

.err-message span {
  font-weight: 600;
}
</style>
