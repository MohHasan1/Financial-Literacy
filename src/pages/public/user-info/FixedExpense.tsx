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
    <Card className="w-full max-w-lg  min-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg">
          Enter Your Fixed Income
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Provide your fixed income details to calculate benefits and plans.
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
                  <FormLabel>Fixed Income</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your fixed income amount"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || undefined)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your fixed monthly income in CAD.
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

export default FixedIncome;
