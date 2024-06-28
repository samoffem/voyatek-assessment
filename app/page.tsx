import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Link href='/users-and-roles'>
        <Button className="bg-green-950 text-white">Go To Dashboard</Button>
      </Link>
    </main>
  );
}
