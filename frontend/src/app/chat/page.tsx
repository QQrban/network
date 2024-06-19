"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Chat() {
  const id = useSelector((state: any) => state.authReducer.value.id);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      router.push(`/chat/${id}`);
    }
  }, [id, router]);

  return null;
}
