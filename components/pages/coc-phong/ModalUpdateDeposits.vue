<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useDepositsStore } from "~/store/deposits";
import { useRoomStore } from "~/store/room";
//props

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

//composable
const toast = useToast();
const route = useRoute();
const fetchListDepositsEventBus = useEventBus(`fetch-list-deposits`);

//emit

const emit = defineEmits(["close"]);

//store

const roomStore = useRoomStore();
const depositsStore = useDepositsStore();

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
      .required("Ngày đặt cọc không được để trống"),
    expectedArrivalDate: yup
      .string()
      .trim()
      .required("Ngày bắt đầu vào ở không được để trống"),
  }),
  initialValues: {
    name: props.roomInfo.name || "",
    money: props.roomInfo.money || "",
    phone: props.roomInfo.phone || "",
    bookingDate: props.roomInfo.bookingDate,
    expectedArrivalDate: props.roomInfo.expectedArrivalDate,
  },
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  money: defineComponentBinds("money"),
  phone: defineComponentBinds("phone"),
  bookingDate: defineComponentBinds("bookingDate"),
  expectedArrivalDate: defineComponentBinds("expectedArrivalDate"),
});

const listRoom = ref([]);
const room = ref(props.roomInfo.roomId);
const loading = ref(false);
const note = ref(props.roomInfo.note);

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

const handleUpdateDepositInfo = handleSubmit(async () => {
  const payload = { ...values, note: note.value, roomId: room.value._id };
  payload.bookingDate = convertDateType(validateFormData.bookingDate.modelValue, 'DD/MM/YYYY')
  payload.expectedArrivalDate = convertDateType(validateFormData.expectedArrivalDate.modelValue, 'DD/MM/YYYY')
  console.log(payload)
  const res = await depositsStore.updateDeposits(props.roomInfo._id, payload);
  if (res.data) {
    toast.success("Cập nhật thông tin cọc phòng thành công");
    emit("close");
    fetchListDepositsEventBus.emit();
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
        Cập nhật cọc phòng
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-autocomplete
          :items="listRoom"
          v-model="room"
          label="Phòng trọ"
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
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Điện thoại liên hệ"
          required
          v-bind="validateFormData.phone"
          :error="errors.phone"
        >
        </g-input>
        <g-date-picker
          class="tw-pt-4"
          label="Ngày đặt cọc"
          required
          v-bind="validateFormData.bookingDate"
          :error="errors.bookingDate"
        ></g-date-picker>
        <g-date-picker
          class="tw-pt-4"
          label="Ngày bắt đầu ở"
          required
          v-bind="validateFormData.expectedArrivalDate"
          :error="errors.expectedArrivalDate"
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
      <g-button @click="handleUpdateDepositInfo" :loading="loading"
        >Cập nhật</g-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
