import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export async function getTheme(): Promise<Theme> {
  const cookieStore = cookies();
  const themeCookie = (await cookieStore).get("theme");
  return themeCookie?.value === "dark" ? "dark" : "light";
}
