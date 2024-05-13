import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const Testimonial = () => {
  return (
    <div>
      <OwlCarousel
        className="owl-theme"
        loop
        margin={50}
        items={3}
        dots={false}
        responsive={{
          0: {
            items: 1, // Display 1 item on mobile devices
          },
          768: {
            items: 2, // Display 2 items on tablets
          },
          1024: {
            items: 3, // Display 3 items on desktops
          },
        }}
        autoplay={true}
        autoplayTimeout={1000}
        autoplayHoverPause={true}
      >
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Allsamir
          </h2>
          <p className="italic">
            &quot;Amazing food and fantastic service! The ambiance was perfect
            for a cozy dinner with friends. Will definitely be back!&quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Rafi
          </h2>
          <p className="italic">
            &quot;Hands down the best restaurant in town! Every dish is bursting
            with flavor and made with fresh, high-quality ingredients. &quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Raiyan
          </h2>
          <p className="italic">
            &quot;Had a wonderful dining experience here. The staff was
            attentive, and the food exceeded our expectations. Highly
            recommend!&quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Sifat
          </h2>
          <p className="italic">
            &quot;A hidden gem! The menu offers a great variety, and everything
            we tried was absolutely delicious. Can&apos;t wait to try more!
            &quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Siam
          </h2>
          <p className="italic">
            &quot;Visited for brunch and was blown away by the creative dishes
            and attention to detail. 10/10 would recommend to anyone! &quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Asif
          </h2>
          <p className="italic">
            &quot;Impressive wine selection and a menu that caters to all
            tastes. Whether you&apos;re a meat lover or vegetarian, there&apos;s
            something for everyone here. &quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Rafid
          </h2>
          <p className="italic">
            &quot;From the moment we walked in, we were greeted with warmth and
            hospitality. The food was exceptional, and the atmosphere was
            inviting. Will definitely become regulars! &quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Raja
          </h2>
          <p className="italic">
            &quot;Tried their tasting menu and was thoroughly impressed with the
            chef&apos;s creativity and skill. Each course was a delightful
            surprise!&quot;
          </p>
        </div>
        <div className="item p-8 bg-gold text-white">
          <h2 className="font-bold text-2xl pb-4 uppercase text-navi-blue italic">
            Ohidul
          </h2>
          <p className="italic">
            &quot;Absolutely divine desserts! Even if you&apos;re too full from
            the main course, make sure to save room for dessert. You won&apos;t
            regret it!&quot;
          </p>
        </div>
      </OwlCarousel>
      ;
    </div>
  );
};

export default Testimonial;
