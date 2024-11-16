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
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg">
          Enter Your Non-Essential Expenses
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Provide details of your non-essential monthly expenses for better
          financial planning.
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
                  <FormLabel>Non-Essential Expenses</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your non-essential expenses"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || undefined)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter the total of your non-essential monthly
                    expenses in CAD.
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

export default NonEssentialExp;