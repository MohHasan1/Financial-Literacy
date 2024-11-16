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

const MonthlyIncome = () => {
  const setMonthlyIncome = useStore((state) => state.setMonthlyIncome);
  const form = useForm<NumInputType>({
    resolver: zodResolver(number_input),
    defaultValues: {
      userInput: undefined,
    },
  });

  function onSubmit(values: NumInputType) {
    console.log(values);

    setMonthlyIncome(values.userInput);
  }

  return (
    <Card className="w-full max-w-lg min-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg">
          Enter Your Monthly Income
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          This information helps us provide better insights.
        </p>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || undefined)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your monthly income in CAD.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default MonthlyIncome;


// import { motion } from "framer-motion";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { NumInputType, number_input } from "@/lib/zod/validation";
// import useStore from "@/store/store";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, FormProvider } from "react-hook-form";
// import { useEffect } from "react";

// interface MonthlyIncomeProps {
//   onValidChange: (isValid: boolean) => void;
// }

// const MonthlyIncome = ({ onValidChange }: MonthlyIncomeProps) => {
//   const setMonthlyIncome = useStore((state) => state.setMonthlyIncome);
//   const monthlyIncome = useStore((state) => state.monthlyIncome);

//   const form = useForm<NumInputType>({
//     resolver: zodResolver(number_input),
//     defaultValues: {
//       userInput: monthlyIncome,
//     },
//   });

//   const { formState: { isValid, errors }, watch } = form;
//   const userInput = watch("userInput");

//   useEffect(() => {
//     onValidChange(isValid && userInput !== undefined);
//   }, [isValid, userInput, onValidChange]);

//   function onSubmit(values: NumInputType) {
//     setMonthlyIncome(values.userInput);
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="text-white"
//     >
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-center mb-4">Monthly Income</h2>
//         <p className="text-[#87939f] text-center">
//           Let's start with your monthly income to help create an accurate financial plan.
//         </p>
//       </div>

//       <FormProvider {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="userInput"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-lg">Monthly Income (CAD)</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter your monthly income"
//                     type="number"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e.target.valueAsNumber || undefined);
//                       form.handleSubmit(onSubmit)(); // Auto-submit on change
//                     }}
//                     className="h-14 text-lg bg-[#2a3447] border-[#4287f5] focus:border-[#4287f5] focus:ring-2 focus:ring-[#4287f5]"
//                   />
//                 </FormControl>
//                 <FormDescription className="text-[#87939f]">
//                   Include your salary, investments, and other regular income sources.
//                 </FormDescription>
//                 {errors.userInput && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-red-400 mt-2"
//                   >
//                     Please enter a valid amount
//                   </motion.div>
//                 )}
//               </FormItem>
//             )}
//           />
//         </form>
//       </FormProvider>
//     </motion.div>
//   );
// };

// export default MonthlyIncome;