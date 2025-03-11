import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/whatsapp';

const WHATSAPP_NUMBER = '+1234567890'; // Replace with your actual WhatsApp number

export function WhatsAppButton() {
  return (
    <motion.a
      href={getWhatsAppUrl(WHATSAPP_NUMBER)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}