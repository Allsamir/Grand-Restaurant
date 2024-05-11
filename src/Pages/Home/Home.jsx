import { motion } from "framer-motion";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
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
        <h1 className="text-9xl font-bold uppercase">Grand</h1>
        <h3 className="text-6xl font-bold uppercase">Resturant</h3>
        <Link
          className=" btn btn-outline btn-lg text-white hover:bg-gold hover:text-navi-blue
           hover:border-gold transition"
          to={`/all-foods`}
        >
          All Foods
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
