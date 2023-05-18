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