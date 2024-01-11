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
  userInfo: {
    type: Object,
    default: {},
  },
});

const toast = useToast();
const route = useRoute();

const emit = defineEmits(["close", "fetchRoomData"]);
const fetchRoomEventBus = useEventBus(`fetch-room-${route.params.roomId}`);

//store
const memberStore = useMemberStore();

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().trim().required("Tên không được để trống"),
    phone: yup.string().length(10, 'Độ dài số điện thoại phải là 10 chữ số'),
    vehicle_number: yup.string(),
    identify_code: yup.string(),
    date_of_birth: yup.string(),
  }),
  initialValues: {
    name: props.userInfo.name,
    phone: props.userInfo.phone,
    vehicle_number: props.userInfo.vehicle_number,
    identify_code: props.userInfo.identify_code,
    date_of_birth: props.userInfo.date_of_birth,
  },
});


const validateFormData = reactive({
  name: defineComponentBinds("name"),
  phone: defineComponentBinds("phone"),
  vehicle_number: defineComponentBinds("vehicle_number"),
  identify_code: defineComponentBinds("identify_code"),
  date_of_birth: defineComponentBinds("date_of_birth"),
});
const gender = ref("Nam");

//method

const handleCreateRoomMember = handleSubmit(async () => {
  const dateOfBirthConverted = convertDateType(
    validateFormData.date_of_birth.modelValue,
    "DD/MM/YYYY"
  );
  const payload = {
    ...values,
    date_of_birth: dateOfBirthConverted,
    gender: gender.value,
  };
  const res = await memberStore.updateRoomMember(payload, props.userInfo._id);
  if (res.data) {
    toast.success("Chỉnh sửa thông tin thành viên thành công!");
    fetchRoomEventBus.emit();
    emit("close");
  }
  if (res.error) {
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
        Thêm thành viên vào phòng
      </h5>
    </div>
    <div class="modal-change-information__form">
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
          class="tw-pt-4"
          label="Ngày sinh"
        ></g-date-picker>
        <div class="tw-w-full tw-py-8">
          <div class="tw-grid tw-gap-y-4">
            <div class="tw-flex tw-gap-x-1">
              <p>Giới tính</p>
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
          label="Số CCCD/CMND"
          v-bind="validateFormData.identify_code"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Biển số xe"
          v-bind="validateFormData.vehicle_number"
        >
        </g-input>
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
      <g-button @click="handleCreateRoomMember">Xác nhận</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
