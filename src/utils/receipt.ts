interface ReceiptData {
  customer: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  orderDate: string;
}

export function generateReceipt(data: ReceiptData) {
  // Create receipt content
  const receiptContent = `
FitTrack Order Receipt
----------------------

Order Date: ${new Date(data.orderDate).toLocaleDateString()}

Customer Details:
---------------
Name: ${data.customer.name}
Address: ${data.customer.address}
Phone: ${data.customer.phone}
Email: ${data.customer.email}

Items:
------
${data.items.map(item => `${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Total Amount: $${data.total.toFixed(2)}
`;

  // Create blob and download
  const blob = new Blob([receiptContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `receipt-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}