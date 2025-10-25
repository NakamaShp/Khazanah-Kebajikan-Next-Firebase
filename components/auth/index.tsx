import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export const Auth = () => {
  return (
    <div className="flex justify-items-center ">
      <Input placeholder="email..." type="email" />
      <Input placeholder="password..." type="password" />

      <Button> SignIn </Button>
    </div>
  );
};
