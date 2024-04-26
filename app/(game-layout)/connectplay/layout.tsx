"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    if (session.status !== "authenticated") router.push("/");
  }, [session]);

  return children;
};

export default RootLayout;
