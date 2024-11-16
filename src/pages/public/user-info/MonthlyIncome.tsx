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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
// Import Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MonthlyIncome = () => {
  const setMonthlyIncome = useStore((state) => state.setMonthlyIncome);
  const form = useForm<NumInputType>({
    resolver: zodResolver(number_input),
    defaultValues: {
      userInput: undefined,
    },
  });

  // Handle form submission
  function onSubmit(values: NumInputType) {
    setMonthlyIncome(values.userInput);

    // Show success toast notification
    toast.success("Monthly income saved successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-lg min-w-lg bg-[#0f172a] text-white border-0">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-500">
            Enter Your Monthly Income
          </CardTitle>
          <p className="text-sm text-[#64748b] text-center">
            This information helps us provide better insights.
          </p>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              onChange={() => {
                // Auto-submit the form whenever the input changes
                if (form.formState.isValid) {
                  const values = form.getValues();
                  setMonthlyIncome(values.userInput);
                }
              }}
            >
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">
                      Monthly Income
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber || undefined);
                        }}
                        className="h-12 text-lg bg-[#1e293b] border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-[#64748b]">
                      Please enter your monthly income in CAD.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12"
                >
                  Submit
                </Button>
              </motion.div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MonthlyIncome;
