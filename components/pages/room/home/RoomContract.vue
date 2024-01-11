<script setup>
import { useForm } from "vee-validate";
import { useContractStore } from "~/store/contract";
import * as yup from "yup";
import { useToast } from "vue-toastification";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
const toast = useToast();

const contractStore = useContractStore();

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    ContractNo: yup.string(),
    ContractDate: yup.string().required("Ngày ký kết không được để trống"),
    DateStartContract: yup
      .string()
      .required("Ngày bắt đầu không được để trống"),
  }),
});

const contract = ref(null);
const contractTerm = ref("");
const contractTermList = ref([
  { _id: "1", value: 1, title: "1 tháng" },
  { _id: "2", value: 3, title: "3 tháng" },
  { _id: "3", value: 6, title: "6 tháng" },
  { _id: "4", value: 9, title: "9 tháng" },
  { _id: "5", value: 12, title: "12 tháng" },
]);

const contractData = reactive({
  ContractNo: randomString(6),
  ContractDate: defineComponentBinds("ContractDate"),
  DateStartContract: defineComponentBinds("DateStartContract"),
});

if (props.roomInfo.contractId?.content) {
  contract.value = props.roomInfo.contractId.content;
}

const handleCreateNewContract = handleSubmit(async () => {
  const payload = {
    ContractNo: contractData.ContractNo,
    ContractDate: convertDateType(
      contractData.ContractDate.modelValue,
      "DD/MM/YYYY"
    ),
    DateStartContract: convertDateType(
      contractData.DateStartContract.modelValue,
      "DD/MM/YYYY"
    ),
    ContractTerm: contractTerm.value.value,
  };
  const res = await contractStore.createNewContractByRoom(
    removeEmptyFields(payload),
    route.params.roomId
  );
  if (res.data) {
    contract.value = res.data.contract.content;
    toast.success("Tạo hợp đồng thành công");
  }
  if (res.error) {
    toast.error(res.error.data.message);
  }
});

async function handleExport() {
  // await handleSelectedList();
  let text = "";
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML =
    header + document.getElementById("exportAll").innerHTML + footer;
  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = "hop-dong.doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

watch(
  () => props.roomInfo,
  (newVal) => {
    contract.value = newVal.contractId.content;
  }
);
</script>
<template>
  <div class="tw-text-center tw-flex tw-justify-center" v-if="!contract">
    <div class="tw-pb-[300px]">
      <span class="tw-text-[24px] tw-font-bold">Tạo hợp đồng</span>
      <div class="tw-grid tw-grid-cols-2 tw-gap-10 tw-mt-4">
        <div class="tw-flex tw-flex-col tw-gap-y-[20px]">
          <div class="tw-max-w-[300px]">
            <g-input
              label="Hợp đồng số"
              v-model="contractData.ContractNo"
              disabled
            ></g-input>
          </div>
          <div>
            <g-autocomplete
              v-model="contractTerm"
              label="Kì hạn"
              required
              :items="contractTermList"
              item-title="title"
            ></g-autocomplete>
            <!-- <g-input v-model="contractTerm" label="Kì hạn (tháng)" required> </g-input> -->
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-gap-y-[33px]">
          <div>
            <g-date-picker
              label="Ngày kí kết"
              required
              v-bind="contractData.ContractDate"
              :error="errors.ContractDate"
            ></g-date-picker>
          </div>
          <div>
            <g-date-picker
              label="Ngày bắt đầu hợp đồng"
              required
              v-bind="contractData.DateStartContract"
              :error="errors.DateStartContract"
            ></g-date-picker>
          </div>
        </div>
      </div>
      <div class="tw-col-span-2 tw-flex tw-justify-center">
        <g-button class="tw-mt-3" @click="handleCreateNewContract"
          >Tạo hợp đồng</g-button
        >
      </div>
    </div>
  </div>
  <div v-else class="tw-flex tw-flex-col tw-gap-y-3">
    <quill-editor
      id="exportAll"
      v-model:content="contract"
      contentType="html"
      toolbar="full"
      theme="snow"
      class=""
    />
    <g-button class="tw-w-[150px]" @click="handleExport">Tải hợp đồng</g-button>
    <!-- <g-button class="tw-w-[150px]" @click="handleCreateNewContract">Cập nhật hợp đồng</g-button> -->
  </div>
</template>
