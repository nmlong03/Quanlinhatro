<script setup>
import { useUserStore } from "~/store/user";

const fetchDataUserEventBus = useEventBus(`fetch-data-user`);

const userStore = useUserStore();
const userData = ref(null);
const getUser = async () => {
  try {
    const res = await userStore.getOneUser();
    if (res.data) {
      userData.value = res.data.message;
      // console.log(res.data.message);
    }
  } catch (error) {
    throw error;
  }
};

getUser();
fetchDataUserEventBus.on(() => {
  userData._value = null;
  getUser();
});

const handleLogout = () => {
  useRemoveToken();
  navigateTo("/dang-nhap");
};
</script>

<template>
  <header
    class="tw-w-full tw-shadow-[rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.06)_0px_2px_4px_-1px]"
  >
    <div
      class="tw-max-w-7xl tw-w-full max-lg:tw-flex max-lg:tw-justify-between max-lg:tw-items-center lg:tw-flex lg:tw-justify-between lg:tw-items-center tw-m-auto lg:tw-py-3 max-lg:tw-px-4 max-lg:tw-py-3"
    >
      <aside class="tw-w-1/3 tw-flex tw-justify-start max-lg:tw-hidden">
        <div>
          <h5 class="max-lg:tw-py-3 tw-font-bold tw-text-center">
            QUẢN LÝ PHÒNG TRỌ
          </h5>
          <h5
            class="tw-text-[#f88125] max-lg:tw-py-3 tw-font-bold tw-text-center"
          >
            POLY HOME RENT
          </h5>
        </div>
      </aside>
      <aside
        class="tw-w-1/3 tw-px-4 lg:tw-flex lg:tw-justify-center lg:tw-items-center lg:tw-gap-3"
      >
        <NuxtLink to="/">
          <img
            src="https://i.ibb.co/BVW3hQM/logo1-1.png"
            alt="Không thể tải logo"
            class="tw-h-[70px] tw-w-[70px] max-lg:tw-h-[50px] max-lg:tw-w-[50px]"
          />
        </NuxtLink>
      </aside>
      <aside class="tw-w-1/3 tw-flex tw-justify-end">
        <div class="tw-relative">
          <!-- <button
            v-if="userData?.avatar == null"
            class="btn_account tw-rounded-full tw-h-10 tw-w-10 tw-bg-[#f88125] hover:tw-bg-[#ee6060] active:tw-transition-all tw-flex tw-justify-center tw-items-center tw-text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 448 512"
            >
              <path
                fill="white"
                d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
              />
            </svg>
          </button> -->
          <button
            class="btn_account tw-rounded-full tw-h-10 tw-w-10 tw-flex tw-justify-center tw-border-solid tw-border-2 tw-border-[#f88125] tw-items-center tw-overflow-hidden"
          >
            <img
              :src="userData?.avatar == null ? '' : userData?.avatar"
              class="tw-w-full tw-object-cover"
            />
          </button>
          <div class="drop_menu_account">
            <ul>
              <li>
                <NuxtLink to="/" class="tw-block">Trang chủ</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/profile" class="tw-block"
                  >Thông tin tài khoản</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/thong-ke" class="tw-block">Thống kê</NuxtLink>
              </li>
              <li>
                <button @click="handleLogout" class="tw-block">
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </header>
</template>

<style lang="css">
.btn_account:hover ~ .drop_menu_account {
  opacity: 1;
  z-index: 10;
}
.drop_menu_account:hover {
  opacity: 1;
  z-index: 10;
}
@media screen and (min-width: 1024px) {
  .drop_menu_account {
    z-index: -1;
    transition: all 0.45s;
    opacity: 0;
    left: -180%;
    position: absolute;
    width: auto;
    color: white;
    background-color: #f88125;
    min-width: 200px;
    max-width: 350px;
    border-radius: 5px;
  }
}
@media screen and (max-width: 1024px) {
  .drop_menu_account {
    z-index: -1;
    transition: all 0.45s;
    opacity: 0;
    right: -10px;
    left: -180%;
    position: absolute;
    width: auto;
    color: white;
    background-color: #f88125;
    border-radius: 5px;
  }
}

.drop_menu_account ul li {
  margin: 1px 0;
  display: block;
}
.drop_menu_account ul li {
  padding: 9px 8px;
  display: block;
  font-size: 16.5px;
}
.drop_menu_account ul li:hover {
  background-color: #ee6060;
}
.drop_menu_account ul li:hover:nth-child(1),
.drop_menu_account ul li:nth-child(1) {
  padding-top: 14px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.drop_menu_account ul li:hover:nth-last-child(1),
.drop_menu_account ul li:nth-last-child(1) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-bottom: 14px;
}
</style>
