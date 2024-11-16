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

const NonEssentialExp = () => {
  const nonEssentialExpenses = useStore((state) => state.nonEssentialExpenses);
  const fixedExpenses = useStore((state) => state.fixedExpenses);
  const monthIncome = useStore((state) => state.monthlyIncome);

  const setNonEssentialExpenses = useStore(
    (state) => state.setNonEssentialExpenses
  );

  function onSubmit(values: NumInputType) {
    logInfo(values);
    setNonEssentialExpenses(values.userInput);
    logInfo(monthIncome, fixedExpenses, nonEssentialExpenses);
  }

  const form = useForm<NumInputType>({
    resolver: zodResolver(number_input),
    defaultValues: {
      userInput: undefined,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Non-Essential Expenses
          </CardTitle>
          <motion.p 
            className="text-sm text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Help us understand your discretionary spending habits.
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
                    <FormLabel>Non-Essential Expenses</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your non-essential expenses"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || undefined)
                        }
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription>
                      Include entertainment, dining out, shopping, etc. in CAD.
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

export default NonEssentialExp;