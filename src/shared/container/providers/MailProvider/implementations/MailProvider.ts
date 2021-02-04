import IMailProvider from '../models/IMailProvider';

class MailProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(to, body);
  }
}

export default MailProvider;
