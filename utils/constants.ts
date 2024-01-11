import imageDefault from "~/assets/images/default-thumbnail.jpg";
import avatarDefault from "@/public/images/avatar-default.png";

export const PREFIX_CLASS = "s-";

export const ACCESS_TOKEN = "accessToken";

export const GUEST_ACCESS_TOKEN = "guestAccessToken";

export const CLASS_ID_COOKIE = "lms_class_id";

export const ROOM_STATUS = [
  { title: "Đã đặt cọc", status: "Đã đặt cọc" },
  { title: "Đang sửa", status: "Đang sửa" },
  { title: "Trống", status: "Trống" },
  { title: "Đã có người ở", status: "Đã có người ở" },
];

export const UPLOAD_KEY =
  "MGMJU97D7WVRANW44JLM9M9PSH2MUWS1JBBW1D9PDJ37J2GMGZYI1CWT7GWWWSE";

type keyType = {
  [key: string]: String;
};

export const GENDER_TYPE: keyType = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};

export const IMAGE_DEFAULT = imageDefault;
export const AVATAR_DEFAULT = avatarDefault;

export const genders = [
  {
    label: "Nam",
    value: "Nam",
  },
  {
    label: "Nữ",
    value: "Nữ",
  },
];

export const timeTables = [
  {
    label: "09/2023",
    value: "09/2023",
  },
  {
    label: "10/2023",
    value: "10/2023",
  },
  {
    label: "11/2023",
    value: "11/2023",
  },
  {
    label: "12/2023",
    value: "12/2023",
  },
];
