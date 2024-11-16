import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserInfoIntro = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CardHeader>
            <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Welcome!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.p 
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for starting this journey with us! To provide you with the
              best experience, we'll kindly ask for some basic information about
              you. Don't worry—your details are safe with us, and we'll only ask
              what's necessary. Let's get started!
            </motion.p>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default UserInfoIntro;