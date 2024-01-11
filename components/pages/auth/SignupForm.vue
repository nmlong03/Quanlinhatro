<script setup>
import IconUser from "@/assets/svg/login/user.svg";
import IconLock from "@/assets/svg/login/lock.svg";
import IconEye from "@/assets/svg/login/eye.svg";
import IconEyeSlash from "@/assets/svg/login/eye-slash.svg";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { setAccessToken } from "@/utils/auth";
import jwt_decode from "jwt-decode";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";
import OtpInputModal from "@/components/pages/auth/OtpInputModal.vue";

const toast = useToast();

//store
const authStore = useAuthStore();

//state


const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Định dạng email không hợp lệ")
      .required('Email không được để trống')
      .trim()
      .min(3, "Tên đăng nhập không thể nhỏ hơn 3 ký tự"),
    name: yup
      .string()
      .trim()
      .required('Tên người dùng không được để trống')
      .min(3, "Tên đăng nhập không thể nhỏ hơn 3 ký tự"),
    password: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .min(8, "Mật khẩu không được nhỏ hơn 8 ký tự,")
      .max(255, "Mật khẩu không được lớn hơn 255 ký tự."),
    confirmPassword: yup
      .string()
      .trim()
      .required('Xác nhận mật khẩu không được để trống')
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  }),
});

const formData = reactive({
  email: defineComponentBinds("email"),
  name: defineComponentBinds("name"),
  password: defineComponentBinds("password"),
  confirmPassword: defineComponentBinds("confirmPassword"),
});

const isLoadingSignup = ref(false);
const isShowPassword = ref(false);
const isChangePassword = ref(false);
const isShowConfirmPassword = ref(false);
const isShowOtpInputModal = ref(false);
//method

const handleSignup = handleSubmit(async () => {
  isLoadingSignup.value = true;
  const payload = {
    ...values,
  };
  const res = await authStore.signup(payload);
  if (res.data) {
    isLoadingSignup.value = false;
    toast.success(res.data.message);
    isShowOtpInputModal.value = true;
  }
  if (res.error) {
    isLoadingSignup.value = false;
    toast.error(res.error.data.message);
  }
});
</script>
<template>
  <div
    v-if="!isChangePassword"
    class="tw-absolute tw-right-0 tw-top-[50%] tw-translate-y-[-50%] tw-w-[40%]"
    @keyup.enter="handleLogin"
  >
    <div class="tw-flex tw-flex-col tw-gap-y-[12px] tw-w-[400px]">
      <div class="tw-w-full">
        <g-input
          label="Tên người dùng"
          v-bind="formData.name"
          :error="errors.name"
        >
          <template #prepend>
            <IconUser />
          </template>
        </g-input>
      </div>
      <div class="tw-w-full">
        <g-input
          label="Tên tài khoản"
          v-bind="formData.email"
          :error="errors.email"
        >
          <template #prepend>
            <IconUser />
          </template>
        </g-input>
      </div>
      <div class="tw-w-full">
        <g-input
          label="Mật khẩu"
          v-bind="formData.password"
          :type="isShowPassword ? 'text' : 'password'"
          :error="errors.password"
        >
          <template #prepend> <IconLock /></template>
          <template #append>
            <div
              class="tw-cursor-pointer active:tw-opacity-70"
              @click="isShowPassword = !isShowPassword"
            >
              <IconEye v-if="isShowPassword" />
              <IconEyeSlash v-if="!isShowPassword" />
            </div>
          </template>
        </g-input>
      </div>
      <div class="tw-w-full">
        <g-input
          label="Xác nhận mật khẩu"
          v-bind="formData.confirmPassword"
          :type="isShowConfirmPassword ? 'text' : 'password'"
          :error="errors.confirmPassword"
        >
          <template #prepend> <IconLock /></template>
          <template #append>
            <div
              class="tw-cursor-pointer active:tw-opacity-70"
              @click="isShowConfirmPassword = !isShowConfirmPassword"
            >
              <IconEye v-if="isShowConfirmPassword" />
              <IconEyeSlash v-if="!isShowConfirmPassword" />
            </div>
          </template>
        </g-input>
      </div>
      <div>
        <span
          class="tw-text-[#1a3b70] hover:tw-underline"
          @click="$emit('signin')"
          >Đã có tài khoản?</span
        >
      </div>
      <div class="tw-w-full tw-flex tw-mt-[10px]">
        <g-button
          class="tw-w-full tw-py-4 tw-bg-black tw-text-white tw-rounded-[10px]"
          @click="handleSignup"
          :loading="isLoadingSignup"
        >
          Đăng ký
        </g-button>
      </div>
    </div>
  </div>
  <v-dialog v-model="isShowOtpInputModal" width="544">
    <OtpInputModal @close="isShowOtpInputModal = false" />
  </v-dialog>
</template>
