import { motion } from "framer-motion";
import "./Home.css";
import { Link } from "react-router-dom";
import TopFoodSection from "../../components/TopFoodSection";
import Testimonial from "../../components/Testimonial";
import Contact from "../../components/Contact";

const Home = () => {
  return (
    <>
      <div
        className="banner min-h-screen bg-no-repeat bg-cover bg-center bg-scroll"
        style={{
          backgroundImage:
            "url('https://themes.themegoods.com/grandrestaurantv6/demo3/wp-content/uploads/sites/3/2020/12/Mark_Lobo_Photography-Melbourne-Jam_Jar1.jpg')",
        }}
      >
        <motion.div
          animate={{ y: 100 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="content text-navi-blue flex flex-col items-center min-h-screen space-y-3"
        >
          <h2 className="sub-title text-gold mt-12">Welcome to</h2>
          <h1 className="lg:text-9xl md:text-7xl text-6xl font-bold uppercase">
            Grand
          </h1>
          <h3 className="lg:text-6xl md:text-4xl text-3xl font-bold uppercase pb-8">
            Resturant
          </h3>
          <Link
            className=" btn btn-outline lg:btn-lg text-white hover:bg-gold hover:text-navi-blue
           hover:border-gold transition uppercase"
            to={`/all-foods`}
          >
            All Foods
          </Link>
        </motion.div>
      </div>
      <div className="top-food-section">
        <motion.div
          animate={{ y: 100 }}
          transition={{ ease: "easeOut", duration: 2, delay: 1 }}
          className="text-center"
        >
          <h2 className="font-kristi lg:text-7xl text-5xl text-gold">
            Our Top Selling Food
          </h2>
          <p
            className="font-semibold uppercase lg:text-3xl text-2xl py-12"
            style={{ lineHeight: "50px" }}
          >
            These items are ordered more than 500 times <br />
            you may try one <span className="text-gold">today</span>
          </p>
        </motion.div>
        <div className="food-section mt-32">
          <TopFoodSection />
        </div>
      </div>

      <motion.div
        animate={{ y: 100 }}
        transition={{ ease: "easeOut", duration: 2, delay: 2 }}
        className="text-center"
      >
        <h2 className="font-kristi lg:text-7xl text-5xl text-gold">
          What People Say About Us
        </h2>
        <p
          className="font-semibold uppercase lg:text-3xl text-2xl py-12"
          style={{ lineHeight: "50px" }}
        >
          These People visited us and showed their experience <br />
          you may also <span className="text-gold">review</span> us
        </p>
      </motion.div>
      <div className="testimonial mt-32">
        <Testimonial />
      </div>

      <div className="contect mb-20">
        <motion.div
          animate={{ y: 100 }}
          transition={{ ease: "easeOut", duration: 2, delay: 3 }}
          className="text-center"
        >
          <h2 className="font-kristi lg:text-7xl text-5xl text-gold">
            Contact Us
          </h2>
          <p
            className="font-semibold uppercase lg:text-3xl text-2xl py-12"
            style={{ lineHeight: "50px" }}
          >
            Please don&apos;t hesitate to{" "}
            <span className="text-gold">contact</span> us <br />
          </p>
        </motion.div>
        <Contact />
      </div>
    </>
  );
};

export default Home;
