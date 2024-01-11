<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useToast } from "vue-toastification";
import { useAssetStore } from "~/store/assets";
import ModalUpdateAsset from "../ModalUpdateAsset.vue";
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
// composable

const toast = useToast();
const route = useRoute();

const fetchListAssetEventBus = useEventBus(
  `get-list-asset-${route.params.motelId}`
);

//store

const assetStore = useAssetStore();

const tableHeaders = ref([
  {
    title: "STT",
    key: "STT",
    sortable: false,
    width: "73px",
  },
  {
    title: "Tên nội thất",
    key: "name",
    sortable: true,
  },
  {
    title: "Giá nội thất",
    key: "price",
    sortable: true,
  },
  {
    title: "Miêu tả",
    key: "description",
    sortable: true,
  },
]);

const assets = ref([]);
const assetInfo = ref({});
const isShowModalUpdateAsset = ref(false);
const isShowConfirmDeleteAsset = ref(false);

// function

const getAllAssets = async () => {
  const res = await assetStore.getAllAssets();
  if (res.data) {
    assets.value = res.data.listInterior;
  }
};

getAllAssets();

const handleDeleteAsset = async () => {
  const res = await assetStore.deleteAsset(assetInfo.value._id);
  if (res.data) {
    toast.success(`Xóa ${assetInfo.value.name} thành công`);
    getAllAssets();
    isShowConfirmDeleteAsset.value = false;
  }
};

fetchListAssetEventBus.on(() => {
  getAllAssets();
});
</script>

<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="assets" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatCurrency(item.price) }}</td>
          <td>{{ item.note }}</td>
          <div
            class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-hidden group-hover:tw-flex tw-space-x-2"
          >
            <div>
              <g-button
                class="!tw-ml-0 !tw-p-1"
                variant="bezeled"
                @click="(isShowModalUpdateAsset = true), (assetInfo = item)"
              >
                <IconEdit />
              </g-button>
            </div>
            <div>
              <g-button
                class="!tw-ml-0 !tw-p-1"
                variant="bezeled"
                @click="(isShowConfirmDeleteAsset = true), (assetInfo = item)"
              >
                <IconRemove class="!tw-ml-0" />
              </g-button>
            </div>
          </div>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isShowModalUpdateAsset" width="544">
      <ModalUpdateAsset
        :assetInfo="assetInfo"
        @close="isShowModalUpdateAsset = false"
      />
    </v-dialog>
    <g-modal-confirm
      v-model="isShowConfirmDeleteAsset"
      :title="'Xóa ' + assetInfo.name + '?'"
      description="Một khi đã xóa, không thể hồi lại"
      @ok="handleDeleteAsset"
    ></g-modal-confirm>
  </div>
</template>
