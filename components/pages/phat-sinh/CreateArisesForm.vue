<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useArisesStore } from "~/store/arises";
import { useRoomStore } from "@/store/room";
import { convertMonthYear, formatMonthYear } from "~/utils/helps";
import IconRequired from "@/assets/svg/required.svg";

//props

//composable
const toast = useToast();
const route = useRoute();
const fetchListArisesEventBus = useEventBus(`fetch-list-arises`);

//emit

const emit = defineEmits(["close", "dateCreate"]);

//store
const roomStore = useRoomStore();
const arisesStore = useArisesStore();
//state
const listRoom = ref([]);
const err_msg_room = ref("");
const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    monthYear: yup
      .string()
      .trim()
      .required("Ngày tháng phát sinh không được bỏ trống"),
    price: yup
      .number()
      .typeError("Chi phí phải là số")
      .min(0, "Chi phí phải là một số dương")
      .required("Chi phí không được bỏ trống"),
  }),
});
const validateFormData = reactive({
  monthYear: defineComponentBinds("monthYear"),
  price: defineComponentBinds("price"),
});

const formData = reactive({
  roomId: "",
  note: "",
});

const loading = ref(false);

//methods
const getAllRoom = async () => {
  const payload = {
    motelId: route.params.motelId,
    status: "Đã có người ở",
  };
  const res = await roomStore.getAllRoomOfMotel(payload);
  if (res.data) {
    listRoom.value = res.data.rooms;
  }
  if (res.error) {
  }
};
getAllRoom();

const handleCreateArises = handleSubmit(async () => {
  let check = true;
  loading.value = true;
  if (formData.roomId == "" || formData?.roomId?._id == undefined) {
    loading.value = false;
    err_msg_room.value = "Lựa chọn phòng phát sinh chi phí";
    check = false;
  } else {
    err_msg_room.value = "";
  }
  // if (formData.note.trim() == "") {
  //   loading.value = false;
  //   check = false;
  //   toast.error("Nội dung chi phí không được bỏ trống");
  // }

  if (check == true) {
    const payload = {
      ...values,
      monthYear: convertDateType(values.monthYear, "MM/YYYY"),
      note: formData.note,
      roomId: formData?.roomId?._id,
    };
    const res = await arisesStore.createArises(removeEmptyFields(payload));
    if (res.data !== null) {
      toast.success("Tạo chi phí phát sinh thành công!");
      emit("dateCreate", values.monthYear);
      emit("close");
      loading.value = false;
      fetchListArisesEventBus.emit();
    }
    if (res.error !== null) {
      loading.value = false;
      // console.log(res.error.data.message);
      for (const key in res.error.data.message) {
        if (Object.prototype.hasOwnProperty.call(res.error.data.message, key)) {
          toast.error(`${res.error.data.message[key]}`);
        }
      }
    }
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
        Chi phí phát sinh
      </h5>
    </div>

    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-autocomplete
          :items="listRoom"
          item-title="name"
          label="Chọn phòng"
          v-model="formData.roomId"
          :error="err_msg_room"
          required
        >
        </g-autocomplete>
        <g-date-picker
          class="tw-pt-4"
          label="Theo tháng"
          v-bind="validateFormData.monthYear"
          :error="errors.monthYear"
        ></g-date-picker>
        <g-input
          class="tw-pt-4"
          label="Số tiền phát sinh"
          placeholder="0"
          v-bind="validateFormData.price"
          :error="errors.price"
          required
        >
        </g-input>
        <div class="tw-gap-y-1 tw-grid tw-pt-4">
          <div class="tw-flex tw-gap-x-1">
            <p>Ghi chú</p>
            <!-- <IconRequired /> -->
          </div>
          <textarea
            placeholder="Ghi chú ..."
            v-model="formData.note"
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
        Hủy
      </g-button>
      <g-button @click="handleCreateArises" :loading="loading">Thêm</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
