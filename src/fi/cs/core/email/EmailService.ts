import {EmailMessage} from './types/EmailMessage';

export interface EmailService {
  /**
   * Set default email from address
   * @param from
   */
  setDefaultFrom(from: string): void;

  /**
   * Initialize the service
   *
   * @param config
   */
  initialize(config?: string): void;

  /**
   * Send email message
   *
   * @param message
   */
  sendEmailMessage(message: EmailMessage): Promise<void>;
}
