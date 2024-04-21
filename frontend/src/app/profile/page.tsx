"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  let id: number = 10561654311;

  const router = useRouter();

  router.push(`/profile/${id}`);
}
