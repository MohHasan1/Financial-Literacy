import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Animation variants for text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for button
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 25px rgba(96, 165, 250, 0.5)"
    },
    tap: { scale: 0.95 }
  };

  // Background circle animations
  const circleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-[#0A0F1C] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background circles */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"
        variants={circleVariants}
        animate="animate"
        style={{ top: '10%', left: '20%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl"
        variants={circleVariants}
        animate="animate"
        style={{ bottom: '10%', right: '20%' }}
      />

      <div className="text-center p-12 relative z-10">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#60A5FA] via-[#7DD3FC] to-[#38BDF8] bg-clip-text text-transparent drop-shadow-lg mb-2"
        >
          Shape Your Financial
        </motion.h1>
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#60A5FA] via-[#7DD3FC] to-[#38BDF8] bg-clip-text text-transparent drop-shadow-lg"
        >
          Future Today
        </motion.h1>
        
        <motion.button
          onClick={() => navigate('/user-info')}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="mt-12 px-8 py-4 text-lg bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] text-white rounded-lg shadow-lg transition-all duration-300"
        >
          Start Your Journey
        </motion.button>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-[-50%] left-[-50%] w-full h-full"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-blue-500/10 to-transparent blur-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};