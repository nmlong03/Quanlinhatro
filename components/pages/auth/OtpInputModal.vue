<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import IconClose from "@/assets/svg/close.svg";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";

//composable

const toast = useToast();
const signUpSuccessEventBus = useEventBus(`sign-up-success`);

//emit

const emit = defineEmits(["close"]);

//store
const authStore = useAuthStore();

//state
const gmailOtp = ref("");
const loading = ref(false);

//method
const submitOtp = async () => {
  loading.value = true;
  const res = await authStore.confirmMail(gmailOtp.value);
  if (res.data) {
    toast.success(res.data.message);
    signUpSuccessEventBus.emit();
    loading.value = false;
    emit("close");
  }
  if (res.error) {
    loading.value = false;
    toast.error(res.error.data.message);
  }
};
</script>
<template>
  <div class="modal-change-information">
    <div class="">
      <button
        @click="$emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Nhập mã OTP
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input label="Mã OTP" required v-model="gmailOtp"></g-input>
      </div>
      <hr class="tw-mt-8" />
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
      <g-button :loading="loading" @click="submitOtp">Xác nhận</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
