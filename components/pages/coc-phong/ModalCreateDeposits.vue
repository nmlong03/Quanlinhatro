<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import IconRequired from "@/assets/svg/required.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useDepositsStore } from "~/store/deposits";
import { useMotelStore } from "~/store/motel";
import { useRoomStore } from "~/store/room";

//props

const props = defineProps({
  roomDeposits: {
    Type: Array,
    default: [],
  },
});
//composable
const toast = useToast();
const route = useRoute();
const fetchListDepositsEventBus = useEventBus(`fetch-list-deposits`);

//emit

const emit = defineEmits("close");

//store
const roomStore = useRoomStore();
const depositsStore = useDepositsStore();
//state

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .trim("Tên phòng không được bỏ trống ")
      .required("Tên phòng là trường bắt buộc")
      .min(3, "Tên tối thiểu 3 ký tự"),
    money: yup
      .number()
      .typeError("Cọc phòng phải là số")
      .required("Cọc phòng là trường bắt buộc")
      .min(0, "Cọc phải lớn >= 0"),
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
      .required("Số điện thoại là trường bắt buộc"),
    bookingDate: yup
      .string()
      .trim()
      .required("Ngày đặt cọc không được bỏ trống"),
    expectedArrivalDate: yup
      .string()
      .trim()
      .required("Ngày bắt đầu vào ở không được bỏ trống"),
  }),
});
const validateFormData = reactive({
  name: defineComponentBinds("name"),
  money: defineComponentBinds("money"),
  phone: defineComponentBinds("phone"),
  bookingDate: defineComponentBinds("bookingDate"),
  expectedArrivalDate: defineComponentBinds("expectedArrivalDate"),
});
const loading = ref(false);
const listRoom = ref([]);
const room = ref("");
const note = ref("");

//methods

const getAllRoom = async () => {
  const payload = {
    motelId: route.params.motelId,
    status: "Trống",
  };
  const res = await roomStore.getAllRoomOfMotel(payload);
  if (res.data) {
    listRoom.value = res.data.rooms;
  }
};

getAllRoom();

const createDeposits = handleSubmit(async () => {
  const payload = {
    ...values,
    roomId: room.value._id,
    motelId: route.params.motelId,
    bookingDate: convertDateType(values.bookingDate, "DD/MM/YYYY"),
    expectedArrivalDate: convertDateType(
      values.expectedArrivalDate,
      "DD/MM/YYYY"
    ),
    note: note.value,
  };
  const res = await depositsStore.createDeposits(payload);
  if (res.data) {
    toast.success("Tạo cọc phòng thành công");
    fetchListDepositsEventBus.emit();
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
        @click="emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Cọc phòng
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col">
        <g-autocomplete
          :items="listRoom"
          v-model="room"
          label="Chọn phòng"
          item-title="name"
          required
          class="tw-mb-4"
        >
        </g-autocomplete>
        <g-input
          label="Họ tên người cọc"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
          class="tw-mb-4"
        ></g-input>
        <g-input
          label="Số tiền cọc"
          required
          v-bind="validateFormData.money"
          :error="errors.money"
          class="tw-mb-4"
        ></g-input>
        <g-input
          label="Điện thoại liên hệ"
          required
          v-bind="validateFormData.phone"
          :error="errors.phone"
          class="tw-mb-4"
        >
        </g-input>
        <g-date-picker
          label="Ngày đặt cọc"
          v-bind="validateFormData.bookingDate"
          :error="errors.bookingDate"
          class="tw-mb-4"
          required
        ></g-date-picker>
        <g-date-picker
          label="Ngày bắt đầu ở"
          v-bind="validateFormData.expectedArrivalDate"
          :error="errors.expectedArrivalDate"
          class="tw-mb-4"
          required
        ></g-date-picker>
        <div class="tw-gap-y-1 tw-grid tw-pt-4">
          <p>Ghi chú</p>
          <textarea
            v-model="note"
            class="tw-resize-none tw-rounded-[10px] tw-bg-white tw-outline tw-p-3 !tw-outline-[#c0c0c0] tw-outline-[1px] focus:!tw-outline-[#f88125] tw-w-full tw-h-[158px] focus:!tw-shadow-[0px_0px_0px_2px_rgba(248,129,37,0.2)]"
          ></textarea>
        </div>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Đóng
      </g-button>
      <g-button @click="createDeposits" :loading="loading">Đặt cọc</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
