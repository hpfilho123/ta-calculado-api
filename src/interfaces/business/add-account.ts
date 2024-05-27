import { AccountModel } from '@/interfaces/business/model/account';

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(account: AddAccountModel): AccountModel;
}
