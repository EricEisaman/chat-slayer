import {Language} from '../types/Language';

export interface EmailAuthMessageService {
  sendAuthenticationCode(
    lang: Language,
    email: string,
    code: string,
  ): Promise<void>;
}
