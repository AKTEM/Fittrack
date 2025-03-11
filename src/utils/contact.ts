export async function saveContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  const content = `
Contact Form Submission
----------------------
Date: ${new Date().toLocaleString()}
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `contact-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}