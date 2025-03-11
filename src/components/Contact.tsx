import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { sendEmail } from '../utils/email';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      await sendEmail(formData);
      setFormData({ name: '', email: '', message: '' });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Get in <span className="text-teal-600 dark:text-teal-400">Touch</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">123 Fitness Street, Health City</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">contact@fittrack.com</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button 
              type="submit"
              disabled={status === 'sending'}
              className={`w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors ${
                status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && (
              <p className="text-green-500 text-center">Message sent successfully!</p>
            )}
            
            {status === 'error' && (
              <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}