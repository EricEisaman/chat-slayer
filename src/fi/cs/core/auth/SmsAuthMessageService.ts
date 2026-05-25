import {Language} from '../types/Language';

export interface SmsAuthMessageService {
  sendAuthenticationCode(
    lang: Language,
    sms: string,
    code: string,
  ): Promise<void>;
}
