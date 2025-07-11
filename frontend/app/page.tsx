"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 my-16">
      <div className="text-center lg:text-left flex-1">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
          Developer <br /> stories & insights
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          A space to write, share, and grow as a developer. Read posts, publish
          code-rich content, and join the conversation.
        </p>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-full"
        >
          <Link href="/signup">Start reading</Link>
        </Button>
      </div>

      <div className="flex-1 w-full max-w-md lg:max-w-xl">
        <Image
          src="/Hero.png"
          alt="Developers collaborating"
          width={600}
          height={600}
          className="w-full h-auto object-cover rounded-xl"
          priority
        />
      </div>
    </div>
  );
}
