export const AUTH = {
  SIGNIN: "/owners/login",
  SIGNUP: "/owners/register",
  CONFIRM_MAIL: "/owners/final-register",
  RESET_PASSWORD: "/owners/reset-password",
  SEND_MAIL_RESET_PASSWORD: "/owners/send-mail-reset-password",
};

export const USER = {
  GET_ONE_USER: "/owners/get-info-owner",
  UPDATE_USER: "/owners/update-owner",
};

export const ADMINISTRATIVE = {
  GET_ALL_PROVINCES: "/provinces/getAll",
  GET_ALL_DISTRICT: "/districts/getAll",
  GET_DISTRICTS_BY_PROVINCE: "/districts/getByProvince",
  GET_WARDS_BY_DISTRICT: "/wards/getByDistrict",
};

export const MOTELS = {
  GET_LIST_MOTELS: "/motels/get-all-motel",
  GET_ONE_MOTELS: "/motels/get-one-motel",
  CREATE_MOTEL: "/motels/create-new-motel",
  UPDATE_MOTEL: "/motels/update-motel",
  DELETE_MOTEL: "/motels/delete-motel",
};

export const ROOM = {
  GET_LIST_ROOM: "/rooms/get-all-room-in-motel",
  GET_ONE_ROOM: "/rooms/get-one-room",
  GET_ALL_ROOM_OF_OWNER: "/rooms/get-all-room",
  ROOM_STATISTICAL: "/rooms/statistical",
  CREATE_ROOM: "/rooms/create-new-room",
  UPDATE_ROOM: "/rooms/update-room-info",
  MOVE_MEMBER_ROOM: "/rooms/move-member-in-room",
  DELETE_ROOM: "/rooms/delete-room",
  RETURN_ROOM: "/rooms/return-room",
};

export const MEMBERS = {
  GET_ROOM_OWNERS: "/members/get-all-host-member",
  GET_ALL_MEMBER_IN_ROOM: "/members/get-all-member-in-room",
  GET_ONE_MEMBER_IN_ROOM: "/members/get-one-member",
  DELETE_ONE_MEMBER_IN_ROOM: "/members/delete-member",
  CREATE_ROOM_OWNER: "/members/create-new-host-member",
  CREATE_ROOM_MEMBER: "/members/create-new-room-normal-member",
  UPDATE_ROOM_OWNER: "/members/update-host-member-info",
  UPDATE_MEMBER: "/members/update-room-normal-member",
};

export const SERVICES = {
  GET_SERVICES: "/services/get-all-service",
  GET_ONE_SERVICE: "/services/get-one-service",
  CREATE_SERVICES: "/services/create-new-service",
  UPDATE_SERVICES: "/services/update-service",
  DELETE_SERVICES: "/services/delete-service",
  ADD_SERVICE_TO_ROOM: "/add-services-room",
  DELETE_SERVICE_FROM_ROOM: "/delete-services-one-room",
  DELETE_SERVICE_ALL_ROOM: "/delete-services-all-room",
};

export const ELECTRICITY = {
  GET_ELECTRICITY: "/electricity-usages/get-all-electricity-usage",
  UPDATE_ELECTRICITY: "/electricity-usages/calculate-electricity-usage",
};

export const WATER = {
  GET_WATER: "/water-usages/get-all-water-usage",
  UPDATE_WATER: "/water-usages/calculate-water-usage",
};

export const CONTRACT = {
  GET_SAMPLE_CONTRACT: "/contracts/get-one-samplecontract",
  CREATE_SAMPLE_CONTRACT: "/contracts/create-new-samplecontract",
  UPDATE_SAMPLE_CONTRACT: "/contracts/update-samplecontract",
  CREATE_NEW_CONTRACT_BY_ROOM: "/contracts/create-new-contract",
  UPDATE_CONTRACT_IN_ROOM: "/contracts/update-member-info-in-contract",
};

export const BILL = {
  CREATE_MONTHLY_BILL: "/bills/create-monthly-bill",
  GET_ALL_BILLS: "/bills/get-all-bill",
  GET_ONE_BILL: "/bills/get-one-bill",
  UPDATE_BILL_PAID_AMOUNT: "/bills/update-bill-paid-amount",
  DELETE_BILL: "/bills/delete-bill",
  SEND_MAIL_MONTHLY_BILL: "/bills/send-mail-monthly-bill",
  GENERATE_BILL_PDF: "/bills/generate-bill-pdf",
};

export const UPLOAD_IMAGES = {
  UPLOAD_IMAGES: "/images/upload",
};

export const PROVINCES = {
  GET_PROVINCES: "/provinces",
  GET_DISTRICT: "/province",
};

export const DEPOSITS = {
  CREATE_DEPOSIT: "/deposits/create-new-deposit",
  GET_ONE_DEPOSITS: "/deposits/get-one-deposit",
  GET_ALL_DEPOSITS: "/deposits/get-all-deposit",
  UPDATE_DEPOSITS: "/deposits/update-deposit",
  DELETE_DEPOSITS: "/deposits/delete-deposit",
};

export const ARISES = {
  CREATE_ARISES: "/arises/create-new-arise",
  GET_ALL_ARISES: "/arises/get-all-arise",
  GET_ONE_ARISES: "/arises",
  UPDATE_ARISES: "/arises/update-arise",
  DELETE_ARISES: "/arises/delete-arise",
};

export const LIQUIDATE_BILL = {
  CREATE_LIQUIDATE_BILL: "/bills/create-liquidate-bill",
  GET_ALL_LIQUIDATE_BILL: "/bills/get-all-liquidate-bill",
  GET_ONE_LIQUIDATE_BILL: "/bills/get-one-liquidate-bill",
  SEND_LIQUIDATE_BILL_MAIL: "/bills/send-mail-liquidate-bill",
};

export const ASSETS = {
  CREATE_ASSET: "/interiors/create-new-interior",
  UPDATE_ASSET: "/interiors/update-new-interior",
  DELETE_ASSET: "/interiors/delete-interior",
  GET_ALL_ASSETS: "/interiors/get-all-interior",
  GET_ONE_ASSET: "/interiors/get-one-interior",
  ADD_ASSET_TO_ROOM: "/interiors/add-interior-to-room",
  DELETE_ASSET_FROM_ROOM: "/interiors/remove-interior-to-room",
};

export const GUEST = {
  SIGN_IN: "/users/signin",
  GET_INFO_ROOM: "/users/get-info-room",
  GET_INFO_ELECTRICITY: "/users/get-info-electricity",
  GET_INFO_WATER: "/users/get-info-water",
  GET_INFO_BILL: "/users/get-info-bill",
};

export const NOTIFICATIONS = {
  GET_ALL_NOTI: "/notifications/get-all-notification",
  GET_ONE_NOTI: "/notifications/get-one-notification",
  CREATE_NOTI: "/notifications/create-notification",
  UPDATE_NOTI: "/notifications/update-notification",
  DELETE_NOTI: "/notifications/delete-notification",
  GET_ALL_NOTI_OF_OWNER: "/notifications/get-all-notification-for-owner",
  GET_ONE_NOTI_OF_OWNER: "/notifications/get-one-notification-for-owner",
  UPDATE_STATUS_NOTI_FOR_OWNER:
    "/notifications/update-status-notification-for-owner",
  DELETE_NOTI_FOR_OWNER: "/notifications/delete-notification-for-owner",
};

export const STATISTICAL = {
  REVENUE_STATISTICAL: "/statistical/statistical-revenue",
};

export const MAILS = {
  CREATE_MAIL: "/mails/create-new-mail",
  GET_ALL_MAIL: "/mails/get-all-mail",
  GET_ONE_MAIL: "/mails/get-one-mail/",
};

export const PAYMENT = {
  CREATE_PAYMENT: "/payment-methods/create-new-payment-method",
  GET_ALL_PAYMENT: "/payment-methods/get-all-payment-methods",
  GET_ONE_PAYMENT: "/payment-methods/get-one-payment-method",
  UPDATE_PAYMENT: "/payment-methods/update-payment-method",
  DELETE_PAYMENT: "/payment-methods/delete-payment-method",
};
