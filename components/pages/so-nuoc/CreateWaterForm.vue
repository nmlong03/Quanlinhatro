<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useWaterStore } from "~/store/water";
import { useMotelStore } from "~/store/motel";
import { useUserStore } from "~/store/user";
//props

//composable
const toast = useToast();
const route = useRoute();
const idMotel = route.params?.motelId;
const fetchListWaterEventBus = useEventBus(`fetch-list-water`);

//emit

const emit = defineEmits("close");

//store
const userStore = useUserStore();
const motelStore = useMotelStore();
const waterStore = useWaterStore();
const owner = userStore.user;

//state
const listMotel = ref(null);
const listRoom = ref([]);
const waterUsed = ref(0);
const roomId = ref(null);

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    prevWaterIndex: yup
      .number()
      .default(0)
      .typeError("Chỉ số nước phải là một số")
      .min(0, "Chỉ số nước phải lớn hơn 0"),
    currentWaterIndex: yup
      .number()
      .default(1)
      .typeError("Chỉ số nước phải là một số")
      .nullable()
      .moreThan(
        yup.ref("prevWaterIndex"),
        "Số nước mới không được bé hơn số nước cũ"
      ),
  }),
});
const validateFormData = reactive({
  prevWaterIndex: defineComponentBinds("prevWaterIndex"),
  currentWaterIndex: defineComponentBinds("currentWaterIndex"),
});

const formData = reactive({});

const loading = ref(false);

//methods

const getAllRoom = async (idMotel) => {
  try {
    listRoom.value = [];
    const res = await motelStore.getOneMotels(idMotel);
    if (res.data) {
      listRoom.value = res.data.motelData.roomIds;
    }
  } catch (error) {
    throw error;
  }
};
getAllRoom(idMotel);
const getAllMotels = async () => {
  try {
    const res = await motelStore.getMotels(owner._id);
    if (res.data) {
      listMotel.value = res.data.motels.filter((item) => item._id == idMotel);
    }
  } catch (error) {
    throw error;
  }
};
getAllMotels();

const onHandleRoom = (event) => {
  if (event.target.value == "all") return (roomId.value = null);
  roomId.value = event.target.value;
};

const createRoomWater = handleSubmit(async () => {
  if (roomId.value == null) return toast.warning("Vui lòng chọn phòng trọ");
  try {
    loading.value = true;
    const payload = {
      ...values,
      roomId: roomId.value,
    };
    const res = await waterStore.updateWater(payload);
    if (res.data) {
      fetchListWaterEventBus.emit();
      toast.success("Cập nhật số nước thành công!");
      loading.value = false;
      emit("close");
    }
  } catch (error) {
    throw error;
  }
});
const updatewaterUsed = (event) => {
  if (values.prevWaterIndex < values.currentWaterIndex) {
    waterUsed.value = values.currentWaterIndex - values.prevWaterIndex;
  } else {
    waterUsed.value = 0;
  }
};
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
        Cập nhật chỉ số nước của phòng
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">

        <div class="tw-flex tw-flex-col tw-text-black">
          <h5 class="tw-text-[14px] tw-py-2">Phòng trọ</h5>
          <select
            class="form-control tw-h-[38px] tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
            style="
              border: 1px solid rgb(218, 218, 218) !important ;
              border-radius: 3px;
            "
            @change="onHandleRoom($event)"
          >
            <option value="all" selected>Danh sách phòng</option>
            <option v-for="item in listRoom" :key="item?.id" :value="item?._id">
              {{ item?.name }}
            </option>
          </select>
        </div>
        <g-input
          class="tw-pt-4"
          label="Số nước cũ"
          :placeholder="0"
          v-bind="validateFormData.prevWaterIndex"
          :error="errors.prevWaterIndex"
          @change="updatewaterUsed($event)"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Số nước mới"
          :placeholder="0"
          v-bind="validateFormData.currentWaterIndex"
          :error="errors.currentWaterIndex"
          @change="updatewaterUsed($event)"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Sử dụng"
          :placeholder="waterUsed"
          v-model="waterUsed"
          disabled="true"
        >
        </g-input>
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
      <g-button @click="createRoomWater" :loading="loading">Cập nhật</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
