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
