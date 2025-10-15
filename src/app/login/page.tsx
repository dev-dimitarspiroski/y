import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./from";

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
