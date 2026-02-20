import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";

export function ContactWindowContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white rounded-lg p-6 shadow-lg mb-6 border border-white/30">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-8 h-8" />
            <h2 className="text-3xl font-bold drop-shadow-lg">Contact Me</h2>
          </div>
          <p className="text-blue-100 drop-shadow-md">Let's connect and discuss opportunities</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Contact Information */}
          <div className="md:col-span-2 space-y-4">
            <div className="backdrop-blur-xl bg-white/20 rounded-lg shadow-md p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-md">
                Get In Touch
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 backdrop-blur-md bg-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/30">
                    <Mail className="w-5 h-5 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <p className="font-medium text-white drop-shadow-sm">john.doe@email.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 backdrop-blur-md bg-green-500/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/30">
                    <Phone className="w-5 h-5 text-green-200" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Phone</p>
                    <p className="font-medium text-white drop-shadow-sm">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 backdrop-blur-md bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/30">
                    <MapPin className="w-5 h-5 text-purple-200" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Location</p>
                    <p className="font-medium text-white drop-shadow-sm">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-semibold text-white mb-3 drop-shadow-sm">Social Media</h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 backdrop-blur-md bg-blue-500/40 text-white rounded-lg flex items-center justify-center hover:bg-blue-500/60 transition-colors border border-white/30"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 backdrop-blur-md bg-gray-700/40 text-white rounded-lg flex items-center justify-center hover:bg-gray-700/60 transition-colors border border-white/30"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="backdrop-blur-xl bg-white/20 rounded-lg shadow-md p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-md">
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1 drop-shadow-sm">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1 drop-shadow-sm">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1 drop-shadow-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/50"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1 drop-shadow-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-white placeholder-white/50"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full backdrop-blur-md bg-blue-500/40 text-white py-3 rounded-lg font-semibold hover:bg-blue-500/60 transition-colors flex items-center justify-center gap-2 border border-white/30"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}