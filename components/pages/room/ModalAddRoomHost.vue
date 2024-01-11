<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import IconClose from "@/assets/svg/close.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import { useForm } from "vee-validate";
import { genders } from "@/utils/constants";
import * as yup from "yup";
import { useMemberStore } from "~/store/member";
import { useToast } from "vue-toastification";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const toast = useToast();
const route = useRoute();
const fetchListRoomEventBus = useEventBus(
  `fetch-list-room-${route.params.motelId}`
);

const emit = defineEmits(["close"]);

//store
const memberStore = useMemberStore();

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().trim().required("Tên không được để trống"),
    email: yup.string().email("Định dạng email chưa hợp lệ").trim().required("Email không được để trống"),
    phone: yup.string().trim().required("Số điện thoại không được để trống").length(10, 'Độ dài số điện thoại phải là 10 chữ số'),
    date_start: yup.string().trim().required("Ngày bắt đầu không được để trống"),
    room_deposit_amount: yup
      .number()
      .typeError("Tiền cọc phải là số")
      .min(0, "Tiền cọc không được âm")
      .required("Tiền cọc không được để trống"),
    vehicle_number: yup.string().trim(),
    identify_code: yup.string().trim(),
    date_of_identify_code: yup.string(),
    address: yup.string().trim(),
    date_of_birth: yup.string().trim(),
  }),
  initialValues: {
    room_deposit_amount: 0,
  },
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  email: defineComponentBinds("email"),
  phone: defineComponentBinds("phone"),
  date_start: defineComponentBinds("date_start"),
  room_deposit_amount: defineComponentBinds("room_deposit_amount"),
  vehicle_number: defineComponentBinds("vehicle_number"),
  identify_code: defineComponentBinds("identify_code"),
  date_of_identify_code: defineComponentBinds("date_of_identify_code"),
  address: defineComponentBinds("address"),
  date_of_birth: defineComponentBinds("date_of_birth"),
});
const gender = ref(genders[0].value);
const loading = ref(false);

//method

const handleCreateRoomHost = handleSubmit(async () => {
  // const startDateConverted = convertDateType(
  //   validateFormData.date_start.modelValue,
  //   "DD/MM/YYYY"
  // );
  loading.value = true;
  const payload = {
    ...values,
    date_start: convertDateType(
      validateFormData.date_start.modelValue,
      "DD/MM/YYYY"
    ),
    date_of_identify_code: convertDateType(
      validateFormData.date_of_identify_code.modelValue,
      "DD/MM/YYYY"
    ),
    date_of_birth: convertDateType(
      validateFormData.date_of_birth.modelValue,
      "DD/MM/YYYY"
    ),
    roomId: props.roomInfo._id,
    gender: gender.value,
  };
  const res = await memberStore.createRoomHost(removeEmptyFields(payload));
  if (res.data) {
    loading.value = false;
    toast.success("Thêm chủ phòng thành công");
    fetchListRoomEventBus.emit();
    emit("close");
  }
  if (res.error) {
    loading.value = false;
    toast.error(res.error.data.message);
  }
});
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
        Thêm chủ phòng
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input
          label="Tên"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-date-picker
          v-bind="validateFormData.date_start"
          :error="errors.date_start"
          class="tw-pt-4"
          label="Ngày bắt đầu"
          required
        ></g-date-picker>
        <g-input
          class="tw-pt-4"
          label="Email"
          v-bind="validateFormData.email"
          :error="errors.email"
          required
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Số điện thoại"
          v-bind="validateFormData.phone"
          :error="errors.phone"
          required
        >
        </g-input>
        <div class="tw-w-full tw-py-8">
          <div class="tw-grid tw-gap-y-4">
            <div class="tw-flex tw-gap-x-1">
              <p>Giới tính</p>
              <IconRequired class="tw-mt-1" />
            </div>
            <div class="tw-flex tw-items-center tw-gap-x-8">
              <g-radio-group
                name="gender"
                :options="genders"
                v-model="gender"
                inline
              />
            </div>
          </div>
        </div>
        <g-input
          class="tw-pt-4"
          label="Tiền cọc"
          required
          v-bind="validateFormData.room_deposit_amount"
          :error="errors.room_deposit_amount"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Biển số xe"
          v-bind="validateFormData.vehicle_number"
          :error="errors.vehicle_number"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Số CCCD/CMND"
          v-bind="validateFormData.identify_code"
          :error="errors.identify_code"
        >
        </g-input>
        <g-date-picker
          class="tw-pt-4"
          label="Ngày cấp"
          v-bind="validateFormData.date_of_identify_code"
          :error="errors.date_of_identify_code"
        >
        </g-date-picker>
        <g-input
          class="tw-pt-4"
          label="Địa chỉ thường trú"
          v-bind="validateFormData.address"
          :error="errors.address"
        >
        </g-input>
        <g-date-picker
          v-bind="validateFormData.date_of_birth"
          :error="errors.date_of_birth"
          class="tw-pt-4"
          label="Ngày sinh"
        ></g-date-picker>
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
      <g-button @click="handleCreateRoomHost" :loading="loading">Thêm</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
