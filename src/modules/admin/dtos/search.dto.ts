import { STATUS, GENDER } from "src/constants";

export const userListSelect = {
  id: {
    search: '=',
  },
  name: {
    search: 'contain',
  },
  phone: {
    search: 'contain',
  },
  email: {
    search: 'contain',
  },
  status: {
    search: '=',
    options: STATUS
  },
};

export const userEditFieldList = [
  {
    key: 'name',
    required: true,
  },
  {
    key: 'phone',
  },
  {
    key: 'email',
    type: 'email',
  },
  {
    key: 'address',
    type: 'textarea',
  },
  {
    key: 'gender',
    type: 'select',
    options: GENDER,
  },
  {
    key: 'birth',
    title: 'birthday',
    type: 'date',
  },
  {
    key: 'favorite',
    type: 'textarea',
  },
  {
    key: 'refCode',
  },
  {
    key: 'refFrom',
    title: 'RefFrom',
  },
  {
    key: 'status',
    type: 'select',
    options: STATUS,
  },
];

export const configListSelect = {
  id: {
    search: '=',
  },
  key: {
    search: 'contain',
  },
  value: {
    search: 'contain',
  },
};

export const configEditFieldList = [
  {
    key: 'key',
    required: true,
  },
  {
    key: 'value',
    required: true,
  },
];

export const bannerListSelect = {
  id: {
    search: '=',
  },
  title: {
    search: 'contain',
  },
  image: {
    type: 'image',
  },
  status: {
    search: '=',
    options: STATUS
  },
};

export const bannerEditFieldList = [
  {
    key: 'title',
    required: true,
  },
  {
    key: 'desc',
    type: 'textarea',
  },
  {
    key: 'image',
    type: 'image',
    required: true,
  },
  {
    key: 'status',
    type: 'select',
    options: STATUS,
  },
];

export const vacxinListSelect = {
  id: {
    search: '=',
  },
  name: {
    search: 'contain',
  },
  status: {
    search: '=',
    options: STATUS
  },
};

export const vacxinEditFieldList = [
  {
    key: 'name',
    required: true,
  },
  {
    key: 'status',
    type: 'select',
    options: STATUS
  },
];

export const timelineListSelect = {
  id: {
    search: '=',
  },
  title: {
    search: 'contain',
  },
  date: {
    search: 'contain',
  },
  image: {
    type: 'image'
  },
  userId: {
    search: '='
  },
  status: {
    search: '=',
    options: STATUS
  },
};

export const timelineEditFieldList = [
  {
    key: 'title',
    required: true,
  },
  {
    key: 'desc',
    type: 'textarea',
  },
  {
    key: 'date',
    type: 'date',
    required: true,
  },
  {
    key: 'image',
    type: 'image',
    required: true,
  },
  {
    key: 'userId',
    required: true,
  },
  {
    key: 'status',
    type: 'select',
    options: STATUS
  },
];

export const childListSelect = {
  id: {
    search: '=',
  },
  userId: {
    search: '=',
  },
  name: {
    search: 'contain',
  },
  status: {
    search: '=',
    options: STATUS
  },
};

export const childEditFieldList = [
  {
    key: 'userId',
    title: 'Child of (user id)',
    required: true,
  },
  {
    key: 'name',
    required: true,
  },
  {
    key: 'nick',
  },
  {
    key: 'gender',
    type: 'select',
    options: GENDER,
  },
  {
    key: 'birth',
    title: 'birthday',
    type: 'date',
  },
  {
    key: 'duebirth',
    title: 'Due Birthday',
    type: 'date',
  },
  {
    key: 'placebirth',
  },
  {
    key: 'favorite',
    type: 'textarea',
  },
  {
    key: 'status',
    type: 'select',
    options: STATUS,
  },
];

export const notificationListSelect = {
  id: {
    search: '=',
  },
  title: {
    search: 'contain',
  },
  device: {
    search: 'contain',
  },
  status: {
    search: '=',
    options: STATUS
  },
};

export const notificationEditFieldList = [
  {
    key: 'title',
    required: true,
  },
  {
    key: 'desc',
    type: 'textarea',
  },
  {
    key: 'image',
    type: 'image'
  },
  {
    key: 'device',
    type: 'textarea',
  },
  {
    key: 'status',
    type: 'select',
    options: STATUS,
  },
];

export const ibListSelect = {
  id: {
    search: '=',
  },
  vacId: {
    search: '=',
    title: 'vacxin id',
  },
  vacDate: {
    search: 'contain',
    title: 'vacxin date'
  },
  userId: {
    search: '=',
  },
  childId: {
    search: '=',
  }
};

export const ibEditFieldList = [
  {
    key: 'userId',
    title: 'user ID',
  },
  {
    key: 'childId',
    title: 'child ID',
  },
  {
    key: 'vacId',
    title: 'vacxin Id',
    required: true
  },
  {
    key: 'vacDate',
    title: 'vacxin date',
    type: 'date',
    time: true,
    required: true
  },
  {
    key: 'address',
    required: true,
  },
  {
    key: 'note',
    type: 'textarea',
  },
];