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

//composable

const toast = useToast();

//store
const authStore = useAuthStore();

//state
const requiredMessage = "Trường này không được bỏ trống";
const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Định dạng email chưa hợp lệ")
      .trim()
      .required(requiredMessage)
      .min(3, "Tên đăng nhập không thể nhỏ hơn 3 ký tự"),
    password: yup
      .string()
      .trim()
      .required(requiredMessage)
      .min(8, "Mật khẩu không được nhỏ hơn 8 ký tự")
      .max(255, "Mật khẩu không được lớn hơn 255 ký tự."),
  }),
});

const formData = reactive({
  email: defineComponentBinds("email"),
  password: defineComponentBinds("password"),
});

const isShowPassword = ref(false);
const isLoadingSignin = ref(false);

//method

const handleSignin = handleSubmit(async () => {
  isLoadingSignin.value = true;
  const payload = { ...values };
  const res = await authStore.signin(payload);
  if (res.data) {
    useSetToken(res.data.accessToken);
    isLoadingSignin.value = false;
    toast.success("Đăng nhập thành công");
    navigateTo("/");
  }
  if (res.error?.data?.message.email) {
    isLoadingSignin.value = false;
    toast.error(res.error.data.message.email);
    return;
  }
  if (res.error) {
    isLoadingSignin.value = false;
    toast.error(res.error.data?.message);
  }
});
</script>
<template>
  <div
    v-if="!isChangePassword"
    class="tw-absolute tw-right-0 tw-top-[50%] tw-translate-y-[-50%] tw-w-[40%]"
    @keyup.enter="handleSignin"
  >
    <div class="tw-flex tw-flex-col tw-gap-y-[12px] tw-w-[400px]">
      <div class="tw-w-full">
        <g-input
          label="Email"
          placeholder="Nhập email"
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
          placeholder="Nhập mật khẩu"
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
      <div>
        <span
          @click="$emit('signup')"
          class="tw-text-[#1a3b70] hover:tw-underline"
          >Chưa có tài khoản?</span
        >
      </div>
      <div class="tw-w-full tw-flex tw-mt-[10px]">
        <g-button
          class="tw-w-full tw-py-4 tw-bg-black tw-text-white tw-rounded-[10px]"
          @click="handleSignin"
          :loading="isLoadingSignin"
        >
          Đăng nhập
        </g-button>
      </div>
    </div>
  </div>
</template>
