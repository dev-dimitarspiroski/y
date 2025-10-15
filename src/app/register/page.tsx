import registerUser from "@/actions/register-user.action";
import { Input } from "@/components/ui/input";

export default function Register() {
  return (
    <form
      className="flex flex-col gap-4 items-center p-4"
      action={registerUser}
    >
      <h1 className="text-2xl font-bold">Register</h1>
      <Input placeholder="John Doe" type="text" name="name" className="w-72" />
      <Input
        placeholder="@username"
        type="text"
        name="username"
        className="w-72"
      />
      <Input
        placeholder="Please enter a password..."
        type="password"
        name="password"
        className="w-72"
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-blue-500 rounded-md px-4 py-2 text-white w-24 cursor-pointer"
      >
        Register
      </button>
    </form>
  );
}
