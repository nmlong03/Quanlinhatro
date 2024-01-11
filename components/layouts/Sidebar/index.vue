<script setup>
import listMenu from "@/components/layouts/Sidebar/menu";
import { mdiChevronRight } from "@mdi/js";
import IconArrowLeft from "@/assets/svg/arrow-left.svg";
import { useUserStore } from "~/store/user";

//store
const userStore = useUserStore();

//composable
const route = useRoute();
//state

//methods
const getOwner = async () => {
  await userStore.getOneUser();
};
getOwner();
const handleLogout = () => {
  useRemoveToken();
  navigateTo("/dang-nhap");
};
</script>
<template>
  <div
    class="tw-h-screen tw-max-w-[280px] tw-shadow-[4px_0px_50px_0px_rgba(0,0,0,0.15)] tw-relative tw-w-full tw-ease-in tw-duration-150 tw-pt-4 tw-px-4"
  >
    <div
      class="tw-mb-4 tw-flex tw-flex-col tw-gap-y-1 tw-items-center tw-cursor-pointer"
    >
      <span class="tw-text-[20px] tw-font-extrabold tw-uppercase"
        >Quản lý phòng trọ</span
      >
      <span
        class="tw-text-[20px] tw-font-extrabold tw-uppercase tw-text-[#f88125]"
        >Poly Home Rent</span
      >
    </div>
    <NuxtLink to="/quan-ly">
      <g-button size="none" class="tw-w-full tw-py-2" rounded="full">
        <template #prepend>
          <IconArrowLeft />
        </template>

        <button>Trở lại</button>
      </g-button>
    </NuxtLink>

    <ul
      class="tw-my-5 tw-px-2 menu-nav tw-overflow-y-auto tw-max-h-[calc(100vh-100px)]"
    >
      <li v-for="item in listMenu" class="tw-flex tw-items-center">
        <SMenu
          :triggers="['click', 'hover']"
          class="tw-w-full"
          :distance="18"
          placement="right-center"
          :delay="{ show: 100, hide: 200 }"
        >
          <nuxt-link
            class="tw-flex tw-items-center tw-w-full tw-p-3 tw-rounded-[10px]"
            :class="[
              $route.path.includes(item.mainPath) ? 'tw-bg-[#eeeeee]' : '',
            ]"
            :to="item.path"
          >
            <div class="tw-shrink-0">
              <component :is="item.icon" />
            </div>
            <span
              class="tw-ml-2 tw-duration-100 tw-ease-in tw-whitespace-nowrap"
              :class="[toggleMenu ? 'tw-w-0 tw-hidden' : 'tw-w-full tw-inline']"
            >
              {{ item.text }}
              <span v-if="item.subMenu">
                <v-icon
                  color="#828282"
                  size="18"
                  :icon="mdiChevronRight"
                ></v-icon>
              </span>
            </span>
          </nuxt-link>
        </SMenu>
      </li>
      <hr class="tw-my-3" />
      <li
        class="tw-flex tw-items-center tw-w-full tw-p-3 tw-rounded-[10px] tw-cursor-pointer"
        @click="handleLogout"
      >
        Đăng xuất
      </li>
    </ul>
  </div>
</template>
<style lang="scss"></style>
