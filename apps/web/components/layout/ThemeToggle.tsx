"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  // Start with undefined to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined);

  // Handle initial theme detection after component mounts
  useEffect(() => {
    // Check for theme in localStorage
    const storedTheme = localStorage.getItem("theme");
    // Check if dark class is present on document
    const documentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    // Use stored theme, document class, or system preference
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    // Priority: Stored > Document > System
    const currentTheme = storedTheme || documentTheme || systemTheme;
    setTheme(currentTheme as "light" | "dark");

    // Apply the theme to document
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Mark as mounted
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Update state
    setTheme(newTheme);

    // Apply to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Store for persistence
    localStorage.setItem("theme", newTheme);

    // Also set cookie for server-side rendering
    document.cookie = `theme=${newTheme};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="h-5 w-5 opacity-50" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
