export const metadata = {
    title: "Sign In - Open PRO",
    description: "Page description",
  };
  
import LoginIn from "@/components/login";
  import Link from "next/link";
  
  export default function SignIn() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoginIn/>
      </div>
    );
  }
  