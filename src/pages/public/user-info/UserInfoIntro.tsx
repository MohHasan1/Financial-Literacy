import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserInfoIntro = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg">Welcome!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Thank you for starting this journey with us! To provide you with the
          best experience, we’ll kindly ask for some basic information about
          you. Don’t worry—your details are safe with us, and we’ll only ask
          what’s necessary. Let’s get started!
        </p>
      </CardContent>
    </Card>
  );
};

export default UserInfoIntro;
