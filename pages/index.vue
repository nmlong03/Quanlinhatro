<script setup>
import Footer from "~/components/global/footer/Footer.vue";
import { useUserStore } from "~/store/user";
// viết hướng dẫn sử dụng ở đây

const userStore = useUserStore();
const getOwner = async () => {
  await userStore.getOneUser();
};
getOwner();
</script>
<template>
  <div>
    <header class="tw-w-full">
      <div
        class="tw-max-w-7xl tw-w-full lg:tw-flex lg:tw-justify-around tw-m-auto lg:tw-py-6"
      >
        <aside
          class="tw-w-2/3 max-lg:tw-w-full tw-px-4 lg:tw-flex lg:tw-justify-start lg:tw-items-center lg:tw-gap-3"
        >
          <a href="/" class="max-lg:tw-flex max-lg:tw-justify-center">
            <img
              src="https://i.ibb.co/CKmyrtN/motel-manager-low-resolution-logo-transparent.png"
              alt=""
              srcset=""
              width="100px"
              height="100px"
            />
          </a>
          <h3 class="tw-py-7 max-lg:tw-py-3 tw-font-bold tw-text-center">
            QUẢN LÝ PHÒNG TRỌ <br />
            <span class="tw-text-[#f88125]"> POLY HOME RENT</span>
          </h3>
        </aside>
        <aside
          class="w-full tw-w-1/3 max-lg:tw-w-full tw-flex tw-justify-around tw-flex-col tw-gap-2 tw-items-center"
        >
          <button class="cta">
            <span class="tw-skew-x-[15deg]"
              >Xin chào: {{ userStore.user?.name }}</span
            >
          </button>
          <button>
            <NuxtLink to="/quan-ly" class="cta">
              <span>Trang quản lý</span>
              <span>
                <svg
                  width="36px"
                  height="13px"
                  viewBox="0 0 66 43"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    id="arrow"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <path
                      class="one"
                      d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                      fill="#FFFFFF"
                    ></path>
                    <path
                      class="two"
                      d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                      fill="#FFFFFF"
                    ></path>
                    <path
                      class="three"
                      d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                      fill="#FFFFFF"
                    ></path>
                  </g>
                </svg>
              </span>
            </NuxtLink>
          </button>
        </aside>
      </div>
    </header>
    <section
      class="tw-bg-[linear-gradient(193deg,#f5f5f5_0%,#f7dfd0_66%,#dedede_100%)] tw-min-h-[85vh]"
    >
      <div
        class="tw-max-w-7xl tw-m-auto tw-py-6 tw-flex max-lg:tw-flex-col lg:tw-gap-3"
      >
        <div class="tw-w-full lg:tw-w-2/3 tw-flex tw-flex-col tw-gap-6">
          <div class="tw-py-5 tw-px-5 tw-rounded-md tw-bg-white">
            <div>
              <h4 class="tw-font-semibold">GIỚI THIỆU</h4>
              <p class="tw-py-3">
                Được ra đời dựa vào nhu cầu thực tế của các cá nhân, tổ chức cho
                thuê nhà, phòng trọ, chung cư mini. Ứng dụng quản lý phòng trọ
                được phát triển giúp cho người quản lý tính toán chính xác tiền
                phòng, dịch vụ, tiết kiệm thời gian ghi chép, thống kê. Phần mềm
                quản lý được nhà trọ có nhiều nhà/ khu vực, nhiều phòng. Thiết
                lập linh động đơn giá dịch vụ, linh động về kỳ thu tiền. Phần
                mềm được phát triển trên nền tảng web, sử dụng online, có thể
                truy cập bất kỳ nơi nào có internet, không phụ thuộc thiết bị,
                hệ điều hành.
              </p>
            </div>
            <div>
              <h5 class="tw-font-semibold tw-text-lg">Các tính năng cơ bản:</h5>
              <p class="tw-py-3">
                Nhập chỉ số điện, nước, dịch vụ; tính tiền phòng Sử dụng được
                trên tất cả các thiết bị khác nhau như laptop, PC, tablet,
                mobile Sử dụng được trên các hệ điều hành khác nhau như Window,
                linux, iOS, Android
              </p>
            </div>
          </div>
          <div class="tw-py-5 tw-px-5 tw-rounded-md tw-bg-white">
            <h4 class="tw-font-semibold">CHI TIẾT CHỨC NĂNG</h4>
            <p class="tw-py-3">
              - Quản lý phòng, khu vực <br />- Quản lý dịch vụ, đơn giá, số
              lượng sử dụng (ví dụ điện, nước, internet, vệ sinh, tiền gửi xe..
              linh động bổ sung tùy từng khách hàng) <br />- Thêm khách, sửa
              thông tin khách, trả phòng, quản lý thông tin hợp đồng, xuất, in
              hợp đồng, tùy chỉnh mẫu hợp đồng theo từng nhu cầu khác nhau; quản
              lý thành viên trong phòng <br />- Nhập chỉ số điện/ nước mới theo
              từng phòng, tháng <br />- Nhập các phát sinh tăng giảm khác (các
              ngoại lệ) <br />- Tính tiền thuê phòng, tiền dịch vụ, theo từng
              khu vực, phòng, theo kỳ <br />- Quản lý các khoản phí liên quan
              đến nhà trọ <br />- Báo cáo doanh thu tổng; Danh sách khách thuê;
              Báo cáo lời lỗ; Hợp đồng sắp hết hạn; Danh sách khách thuê đặt cọc
            </p>
          </div>
        </div>
        <div class="tw-w-full lg:tw-w-1/3">
          <div class="tw-py-5 tw-px-5 tw-rounded-md tw-bg-white max-lg:tw-mt-6">
            <h4 class="tw-font-semibold">LIÊN HỆ</h4>
            <div class="tw-py-3">
              <a
                href="tel:+84869076265"
                class="tw-flex tw-items-center tw-w-full tw-my-1"
                ><svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="phone"
                  class="w-5 svg-inline--fa fa-phone"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="15px"
                  width="15px"
                  style="margin-right: 8px"
                >
                  <path
                    fill="currentColor"
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  ></path>
                </svg>
                086.907.6265</a
              >
              <a
                href="tel:+84869076265"
                class="tw-flex tw-items-center tw-w-full tw-my-1"
                ><svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="message"
                  class="w-5 svg-inline--fa fa-message"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="15px"
                  width="15px"
                  style="margin-right: 8px"
                >
                  <path
                    fill="currentColor"
                    d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"
                  ></path>
                </svg>
                086.907.6265
              </a>
              <a
                href="https://maps.app.goo.gl/RSWjeJ8bNaFFtFqU8"
                class="tw-flex tw-items-center tw-w-full tw-my-1"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="location-dot"
                  class="w-5 svg-inline--fa fa-location-dot"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  height="15px"
                  width="15px"
                  style="margin-right: 8px"
                >
                  <path
                    fill="currentColor"
                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"
                  ></path>
                </svg>
                Tòa nhà FPT Polytechnic., Cổng số 2, 13 P. Trịnh Văn Bô, Xuân
                Phương, Nam Từ Liêm, Hà Nội
              </a>
              <a
                href="mailto:motel-manager@gmail.com"
                class="tw-flex tw-items-center tw-w-full tw-my-1"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="envelope"
                  class="w-5 svg-inline--fa fa-envelope"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="15px"
                  width="15px"
                  style="margin-right: 8px"
                >
                  <path
                    fill="currentColor"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                  ></path>
                </svg>
                motel-manager@gmail.com
              </a>
              <NuxtLink
                to="/motel-manager.com"
                class="tw-flex tw-items-center tw-w-full tw-my-1"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="link"
                  class="w-5 svg-inline--fa fa-link"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  height="15px"
                  width="15px"
                  style="margin-right: 8px"
                >
                  <path
                    fill="currentColor"
                    d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
                  ></path>
                </svg>
                motel-manager.com
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.li {
  margin: 4px 0px;
}
p {
  font-size: 16px;
}
.cta {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  background: #f88125;
  transition: 1s;
  box-shadow: 6px 6px 0 #ffbc89;
  transform: skewX(-15deg);
}

.cta:focus {
  outline: none;
}

.cta:hover {
  transition: 0.5s;
  box-shadow: 10px 10px 0 #ee6060;
}

.cta span:nth-child(2) {
  transition: 0.5s;
  margin-right: 0px;
}

.cta:hover span:nth-child(2) {
  transition: 0.5s;
  margin-right: 25px;
}

span {
  transform: skewX(15deg);
}
span:nth-child(2) {
  width: 20px;
  margin-left: 10px;
  position: relative;
  top: 12%;
}

/**************SVG****************/

path.one {
  transition: 0.4s;
  transform: translateX(-60%);
}

path.two {
  transition: 0.5s;
  transform: translateX(-30%);
}

.cta:hover path.three {
  animation: color_anim 1s infinite 0.2s;
}

.cta:hover path.one {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.6s;
}

.cta:hover path.two {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.4s;
}

/* SVG animations */

@keyframes color_anim {
  0% {
    fill: white;
  }
  50% {
    fill: #fbc638;
  }
  100% {
    fill: white;
  }
}
</style>
