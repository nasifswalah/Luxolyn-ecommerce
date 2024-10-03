import React from "react";
import { suggestions } from "../constatnts/constants";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";


const Home = () => {

  const { user } = useSelector((state) => state.user);

  return (
    <div className="relative xl:h-[97vh] h-screen xl:w-[95vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md p-7">
      <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
      <motion.p className="font-themeFont bg-clip-text text-transparent bg-gradient-to-b from-[#833991] to-[#CE5ED5] lg:text-5xl text-3xl  tracking-[-0.02em] font-medium" initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}>
        Hello, {user ? user.name : ""}
      </motion.p>
      <motion.p className="font-themeFont text-[#828282] lg:text-5xl text-3xl  tracking-[-0.02em] font-medium mt-4" initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}>
        How can i help you today?
      </motion.p>
      <div className="mt-8 flex gap-3 flex-wrap sm:justify-normal justify-center overflow-scroll h-[68vh] rounded-3xl pb-16">
        {suggestions.map((suggestion) => (
          <motion.div className="sm:w-[306px] w-[95%] h-48 rounded-3xl bg-[#292929] p-5 relative" key={suggestion.text} initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}>
            <h3 className="font-themeFont text-[#EDEDED] text-2xl font-medium">{suggestion.text}</h3>
            <img src={suggestion.icon} alt="icons" className="text-white w-8 h-8 p-2 bg-black rounded-full absolute bottom-4  right-4" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
