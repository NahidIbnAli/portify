import { MapPinHouse, Phone, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="mt-6 lg:mt-10 mb-16">
      <div className="container px-5">
        <h2 className="text-4xl font-bold text-center mb-10">Get In Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Contact Info Section */}
          <div>
            <h3 className="text-2xl font-bold mb-3 text-accent">
              Want to Connect?
            </h3>
            <p className="mb-4">
              I'd Love to hear from you. Whether you have a question or just
              want to say Hi, feel free to drop a message. I'll try my best to
              get back to you!
            </p>
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-2">
                <Phone size={20} /> +88001744741009
              </p>
              <p className="flex items-center gap-2">
                <Send size={20} /> nahidibnali7@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <MapPinHouse size={20} /> Chuadanga, Bangladesh
              </p>
            </div>
          </div>
          {/* Contact Form */}
          <form>
            <div className="mb-4">
              <label className="label">
                <span className="text-lg font-medium">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full focus:outline-primary"
              />
            </div>

            <div className="mb-4">
              <label className="label">
                <span className="text-lg font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:outline-primary"
              />
            </div>

            <div className="mb-4">
              <label className="label">
                <span className="text-lg font-medium">Message</span>
              </label>
              <textarea
                placeholder="Enter your message"
                className="textarea textarea-bordered w-full focus:outline-primary"
                rows="4"
              ></textarea>
            </div>

            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
