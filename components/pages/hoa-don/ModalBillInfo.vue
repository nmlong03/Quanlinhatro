<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import { useBillStore } from "~/store/bill";
import { useToast } from "vue-toastification";
import BillItemField from "./BillItemField.vue";
import { useServiceStore } from "~/store/services";

const props = defineProps({
  billId: {
    type: String,
    default: "",
  },
  services: {
    type: Array,
    default: [],
  },
});

const electricService = props.services.find((el) => el.name === "Điện");
const waterService = props.services.find((el) => el.name === "Nước");

const toast = useToast();

const billStore = useBillStore();

const billInfo = ref(null);
const loadingSendEmail = ref(false);
const body = ref("");

const getBillInfo = async () => {
  const res = await billStore.getOneBill(props.billId);
  if (res.data) {
    billInfo.value = res.data.billData;
    body.value = `<div class="ql-editor"><h2 class="ql-align-center" style="text-align: center;"><strong>Chi tiết hợp đồng</strong></h2><p><br></p><h4 class="ql-align-justify"><strong>Tên chủ trọ: </strong>${
      billInfo.value?.memberId?.name
    }</h4><p class="ql-align-justify"><strong>Thời hạn thanh toán: </strong>${convertDateType(
      billInfo.value.billDate,
      "DD/MM/YYYY"
    )}</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">---------------------------------------------------------------------------------------</p><p class="ql-align-justify">Tổng hóa đơn: ${formatCurrency(
      billInfo.value.totalBill
    )}</p><p class="ql-align-justify">Đã thanh toán: ${formatCurrency(
      billInfo.value.paidAmount
    )}</p><p class="ql-align-justify">Cần thanh toán: ${formatCurrency(
      billInfo.value.totalBill - billInfo.value.paidAmount
    )}</p>
    <p class="ql-align-justify">Số điện sử dụng: </p><p class="ql-align-justify">Số nước sử dụng: </p><p class="ql-align-justify">Danh sách dịch vụ: </p><ul><li class="ql-align-justify">Rác:</li><li class="ql-align-justify">Mạng:</li><li class="ql-align-justify">Gửi xe:</li></ul>
    <p class="ql-align-justify">Thông tin thanh toán: 05821127301 - Ngân hàng tiên phong TPBank</p>
     <p class="ql-align-justify">Chủ tài khoản: TRAN TRUNG NGHIA</p>
     </div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data`;
  }
};

getBillInfo();

const handleSendingMail = async () => {
  loadingSendEmail.value = true;
  const res = await billStore.sendMailMonthlyBill(props.billId);
  if (res.data) {
    toast.success("Đã thông báo qua email");
    loadingSendEmail.value = false;
  }
};

async function handleExport() {
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML = header + body.value + footer;
  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = "hoa-don.doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

const generateBillPdf = async () => {
  const res = await billStore.generateBillPdf(props.billId)
  if(res.data){
    res.data.download = 'hoa-don.pdf'
  }
}

</script>
<template>
  <div v-if="!billInfo"></div>
  <div v-else class="modal-change-information">
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
        Chi tiết hóa đơn
      </h5>
      <p class="tw-text-[15px] tw-leading-5 tw-text-center">
        A message should be a short, complete sentence.
      </p>
    </div>
    <div class="tw-flex tw-justify-center tw-w-full tw-mt-3">
      <hr class="tw-w-[80%]" />
    </div>
    <div class="modal-change-information__form tw-flex tw-flex-col tw-gap-y-3">
      <BillItemField label="Tên chủ trọ" :value="billInfo.memberId?.name" />
      <hr class="tw-mt-3" />
      <BillItemField
        label="Tiền phòng"
        :value="formatCurrency(billInfo.housePrice)"
      />
      <span v-for="item in billInfo.roomId.serviceIds">
        <BillItemField
          v-if="item?.type !== 'ĐIỆN' && item?.type !== 'NƯỚC'"
          :label="'Tiền ' + item.name"
          :value="formatCurrency(item.price)"
        />
      </span>

      <BillItemField
        v-if="billInfo.roomElectricityUsed"
        :label="
          'Số điện đã sử dụng: ' +
          billInfo.roomElectricityUsed?.currentElectricityIndex +
          ' - ' +
          billInfo.roomElectricityUsed?.prevElectricityIndex +
          ' = ' +
          billInfo.roomElectricityUsed?.electricityUsed
        "
        :value="
          formatCurrency(
            billInfo.roomElectricityUsed?.electricityUsed *
              electricService.price
          )
        "
      />
      <BillItemField
        v-if="billInfo.roomWaterUsed"
        :label="
          'Số nước đã sử dụng: ' +
          billInfo.roomWaterUsed?.currentWaterIndex +
          ' - ' +
          billInfo.roomWaterUsed?.prevWaterIndex +
          ' = ' +
          billInfo.roomWaterUsed?.waterUsed
        "
        :value="
          formatCurrency(billInfo.roomWaterUsed?.waterUsed * waterService.price)
        "
      />
      <BillItemField
        label="Tổng hóa đơn"
        :value="formatCurrency(billInfo.totalBill)"
      />
      <BillItemField
        label="Số tiền đã thanh toán"
        :value="formatCurrency(billInfo.paidAmount)"
      />
      <BillItemField
        label="Số tiền còn lại"
        :value="formatCurrency(billInfo.totalBill - billInfo.paidAmount)"
      />
    </div>
    <div
      class="tw-grid tw-grid-cols-3 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Đóng
      </g-button>
      <g-button @click="handleSendingMail" :loading="loadingSendEmail"
        >Thông báo</g-button
      >
      <g-button @click="handleExport" :loading="loading">Tải hóa đơn</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
