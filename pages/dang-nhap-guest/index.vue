<script setup>
import GuestSigninForm from "@/components/pages/auth/GuestSigninForm.vue";

//middleware

definePageMeta({
  middleware: "check-auth-guest",
});

const signUpSuccessEventBus = useEventBus(`sign-up-success`);

const isSigningUp = ref(false);
signUpSuccessEventBus.on(() => {
  isSigningUp.value = false;
});
</script>
<template>
  <div class="tw-flex tw-w-screen tw-h-screen tw-p-5">
    <div class="tw-w-[55%] tw-rounded-3xl tw-bg-[#f88125] tw-relative">
      <div class="tw-absolute -tw-right-40 tw-top-[50%] tw-translate-y-[-50%]">
        <div
          class="tw-w-[650px] tw-h-[650px] tw-rounded-full tw-bg-white tw-opacity-40 tw-shadow-2xl"
        ></div>
      </div>
      <div v-if="!isSigningUp">
        <GuestSigninForm @signup="isSigningUp = true" />
      </div>
      <div class="tw-absolute tw-bottom-10">
        <div class="tw-w-[200px]">
          <img src="@/assets/img/logo.png" alt="" />
        </div>
      </div>
    </div>
    <div class="tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-p-10">
      <span
        class="tw-text-[64px] tw-font-extrabold tw-leading-[78px] tw-uppercase tw-justify-end"
        >Website
      </span>
      <span
        class="tw-text-[64px] tw-font-extrabold tw-leading-[78px] tw-uppercase tw-justify-end"
        >quản lý nhà trọ
      </span>
      <span
        class="tw-text-[64px] tw-font-extrabold tw-leading-[78px] tw-uppercase tw-justify-end tw-text-[#f88125]"
        >Poly Home Rent
      </span>
    </div>
  </div>
</template>
