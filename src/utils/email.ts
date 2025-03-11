import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_2kw1j4h';
const TEMPLATE_ID = 'template_qw8326g';
const PUBLIC_KEY = 'user_tK3nB5X9J7ZpL2QwY1mNx';

export async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: 'akintolasegunemmanuel@gmail.com',
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      },
      PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
}