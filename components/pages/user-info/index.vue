<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import IconClose from "@/assets/svg/close.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useUserStore } from "~/store/user";
import { useUploadImagesStore } from "~/store/uploadImages";

// compatibility
const fetchDataUserEventBus = useEventBus(`fetch-data-user`);

const props = defineProps({
  data: {
    Type: Object,
    default: {},
  },
});

const toast = useToast();
const route = useRoute();
// state

const IAvatar = ref(props.data.avatar);
const checkImgesOld = ref(props.data.avatar);
const checkImgesNew = ref(0);
const loadding = ref(false);
const owner = ref(null);

//store

const userStore = useUserStore();
const uploadImagesStore = useUploadImagesStore();

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .matches(/^[^0-9]*$/, "Tên không được chứa ký tự số")
      .trim("Tên không được bỏ trống")
      .strict(true)
      .min(3, "Tối thiểu 3 ký tự")
      .max(64, "Tối đa 64 ký tự")
      .required("Tên là trường bắt buộc"),
    phone: yup
      .string()
      .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ")
      .test(
        "is-phone-length",
        "Số điện thoại phải có độ dài 10 ký tự",
        (value) => {
          return value.length === 10;
        }
      )
      .required("Số điện là trường bắt buộc"),
    date_of_birth: yup.date("").nullable(true),
    // .required("Ngày sinh là trường bắt buộc")
    // .test(
    //   "age",
    //   "Bạn quá nhỏ tuổi (Chưa đủ tuổi quản lý trọ >=18)",
    //   function (birthdate) {
    //     const cutoff = new Date();
    //     cutoff.setFullYear(cutoff.getFullYear() - 18);
    //     return birthdate <= cutoff;
    //   }
    // ),
    date_of_identify_code: yup.date("").nullable(true),
    // .required("Ngày đăng ký CCCD/CMND")
    // .test(
    //   "date_of_identify_code",
    //   "Ngày đăng ký CCCD/CMND không được lớn hơn ngày hiện tại",
    //   function (date) {
    //     if (date !== undefined) {
    //       const today = new Date();
    //       return date <= today;
    //     }
    //   }
    // ),
    address: yup.string(),
    avatar: yup.string(),
    identify_code: yup.string(),
    address_issue_identify_code: yup.string(),
  }),
  initialValues: props.data,
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  phone: defineComponentBinds("phone"),
  date_of_birth: defineComponentBinds("date_of_birth"),
  date_of_identify_code: defineComponentBinds("date_of_identify_code"),
  address: defineComponentBinds("address"),
  email: defineComponentBinds("email"),
  avatar: defineComponentBinds("avatar"),
  identify_code: defineComponentBinds("identify_code"),
  address_issue_identify_code: defineComponentBinds(
    "address_issue_identify_code"
  ),
});

//method

const getOwner = async () => {
  const res = await userStore.getOneUser();
  if (res.data) {
    owner.value = res.data.message;
  }
};
getOwner();

const handleUploadImages = async (file) => {
  try {
    const formData = new FormData();
    formData.append("images", file);
    const res = await uploadImagesStore.uploadImages(formData);
    if (res.data) {
      return { status: true, data: res.data.data };
    }
  } catch (error) {
    throw error;
  }
};

const handleUpdateUser = handleSubmit(async () => {
  loadding.value = true;
  if (checkImgesNew._value == 0) {
  } else {
    const res = await handleUploadImages(checkImgesNew._value);
    checkImgesNew.value = 0;
    if (res.status) {
      IAvatar.value = res.data[0].url;
    } else {
      toast.error("Tải ảnh lên thất bại");
      loadding.value = false;
      return res;
    }
  }
  const sendData = {
    name: values.name,
    phone: values.phone,
    identify_code: values.identify_code,
    address: values.address,
    secret_key: values.secret_key,
    card_number: values.card_number,
    avatar: values.avatar,
    date_of_birth: formatDayMonthYear(values.date_of_birth),
    date_of_identify_code: formatDayMonthYear(values.date_of_identify_code),
    address_issue_identify_code: values.address_issue_identify_code,
  };
  if (props.data.avatar !== IAvatar._value) {
    sendData.avatar = IAvatar._value;
  } else {
    sendData.avatar = props.data.avatar;
  }
  try {
    const res = await userStore.updateUser(
      removeEmptyFields(sendData),
      props.data._id
    );
    if (res.data !== null) {
      // console.log(res);
      fetchDataUserEventBus.emit();
      loadding.value = false;
      toast.success("Cập nhật thông tin người dùng thành công !!!");
    }
    if (res.error !== null) {
      loadding.value = false;
      // console.log(res.error.data.message);
      for (const key in res.error.data.message) {
        if (Object.prototype.hasOwnProperty.call(res.error.data.message, key)) {
          toast.error(`${res.error.data.message[key]}`);
        }
      }
    }
  } catch (error) {
    loadding.value = false;
    toast.error("Cập nhật thất bại");
    throw error;
  }
});

const onHandleAvt = (e) => {
  if (e.target.files[0] === undefined) {
    checkImgesNew.value = 0;
  } else {
    checkImgesNew.value = e.target.files[0];
  }
  IAvatar.value = props.data.avatar;
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    const base64 = reader.result;
    IAvatar.value = base64;
  };
  reader.readAsDataURL(file);
};
</script>
<template>
  <div class="tw-m-auto tw-my-3 tw-pt-5 tw-max-w-[534px]">
    <div class="">
      <h5
        class="tw-text-center tw-text-3xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Thông tin người dùng
      </h5>
    </div>
    <div class="" style="min-height: 103vh !important">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input
          label="Tên"
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Số điện thoại"
          v-bind="validateFormData.phone"
          :error="errors.phone"
        >
        </g-input>
        <g-date-picker
          v-bind="validateFormData.date_of_birth"
          :error="errors.date_of_birth"
          class="tw-pt-4"
          label="Ngày sinh"
        ></g-date-picker>

        <g-input
          class="tw-pt-4"
          label="Email"
          v-bind="validateFormData.email"
          :error="errors.email"
          disabled="true"
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Địa chỉ"
          v-bind="validateFormData.address"
          :error="errors.address"
        >
        </g-input>

        <div class="tw-w-full tw-py-8">
          <div class="tw-grid tw-gap-y-4">
            <div class="tw-flex tw-gap-x-1">
              <p>Avatar</p>
            </div>
            <div class="tw-pb-4 tw-h-44">
              <img :src="IAvatar" class="tw-h-44" alt="" />
            </div>
            <input
              type="file"
              accept="image/*"
              name=""
              @change="onHandleAvt($event)"
            />
          </div>
        </div>
        <g-input
          class="tw-pt-4"
          label="Số CCCD/CMND"
          placeholder="Số CCCD/CMND 9 hoặc 12 số"
          v-bind="validateFormData.identify_code"
          :error="errors.identify_code"
        >
        </g-input
        ><g-date-picker
          v-bind="validateFormData.date_of_identify_code"
          :error="errors.date_of_identify_code"
          class="tw-pt-4"
          label="Ngày đăng ký CCCD"
        ></g-date-picker>
        <g-input
          class="tw-pt-4"
          label="Nơi cấp CCCD/CMND"
          v-bind="validateFormData.address_issue_identify_code"
          :error="errors.address_issue_identify_code"
        >
        </g-input>
      </div>
      <hr class="tw-mt-8" />
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <NuxtLink to="/quan-ly">
        <g-button variant="bezeled" @click="" class="tw-w-full">
          <template #prepend>
            <IconXMark />
          </template>
          Trở lại
        </g-button></NuxtLink
      >
      <g-button @click="handleUpdateUser" :loading="loadding"
        >Cập nhật thông tin</g-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
