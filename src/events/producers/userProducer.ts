import { producer } from '../../config/kafka';
import { emailHelper } from '../../helpers/emailHelper';
import { emailTemplate } from '../../utils/emailTemplate';
import { KAFKA_TOPICS } from '../topics';

export async function sendEmailCreatedEvent(emailData: {name: string, email: string, otp: number}) {
    await producer.send({
        topic: KAFKA_TOPICS.SEND_EMAIL_OTP,
        messages: [
            {
                key: String(emailData.email),
                value: JSON.stringify(emailData),
            },
        ],
    });

    console.log("📤 Kafka Event Sent: user-created");
    const createAccountTemplate = emailTemplate.createAccount(emailData);
    emailHelper.sendEmail(createAccountTemplate);
}