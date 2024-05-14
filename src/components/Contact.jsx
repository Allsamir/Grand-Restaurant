const Contact = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-28 gap-12">
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58406.76855051234!2d90.30141704863283!3d23.803551600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e939efef23%3A0x19ed8e7e2edf91b2!2sGrand%20Prince%20Chinese%20Restaurant!5e0!3m2!1sen!2sbd!4v1715621394152!5m2!1sen!2sbd"
          className="w-full"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div>
        <div className={``}>
          <div className="my-auto p-8">
            <h1 className="text-5xl font-bold uppercase text-gold">
              Grand Resturant
            </h1>
            <p className="py-6">
              We provide the best food experience and with us your dining
              becomes your life. Feel free to contact us anytime
            </p>
            <a href="tel:01863966821">
              <button
                className={`btn lg:btn-lg btn-outline uppercase text-black hover:bg-gold hover:border-gold hover:text-white hover:scale-110`}
              >
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
