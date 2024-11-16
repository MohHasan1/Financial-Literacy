import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumInputType, number_input } from "@/lib/zod/validation";
import useStore from "@/store/store";
import { logInfo } from "@/utils/log";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

const FixedIncome = () => {
  const setFixedExpenses = useStore((state) => state.setFixedExpenses);
  const form = useForm<NumInputType>({
    resolver: zodResolver(number_input),
    defaultValues: {
      userInput: undefined,
    },
  });

  function onSubmit(values: NumInputType) {
    logInfo(values);
    setFixedExpenses(values.userInput);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-lg min-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Fixed Expenses
          </CardTitle>
          <motion.p 
            className="text-sm text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Tell us about your regular monthly expenses like rent, utilities, and bills.
          </motion.p>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <motion.form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fixed Monthly Expenses</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your fixed expenses"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || undefined)
                        }
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription>
                      Include all recurring monthly expenses in CAD.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit
                </Button>
              </motion.div>
            </motion.form>
          </FormProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FixedIncome;