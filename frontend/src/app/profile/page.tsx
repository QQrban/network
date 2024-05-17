"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const id = useSelector((state: any) => state.authReducer.value.id);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      router.push(`/profile/${id}`);
    }
  }, [id, router]);

  return null;
}
