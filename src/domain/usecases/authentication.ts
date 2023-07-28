import { type AccountModel } from 'domain/models/account.model';

interface AuthenticationParams {
  username: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
