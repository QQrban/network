"use server";

import { cookies } from "next/headers";

export const getCookie = async () => {
  const cookieVal = cookies().get("sonesess")?.value;
  return cookieVal;
};
