"use client";

import Link from "next/link";

interface HomeButtonProps {
  gradientFrom: string;
  gradientTo: string;
  gradientVia?: string;
  className?: string;
}

export default function HomeButton({
  gradientFrom,
  gradientTo,
  gradientVia,
  className = "",
}: HomeButtonProps) {
  const gradientClass = gradientVia
    ? `from-${gradientFrom} via-${gradientVia} to-${gradientTo} hover:from-${gradientFrom.replace(
        "600",
        "700"
      )} hover:via-${gradientVia.replace(
        "600",
        "700"
      )} hover:to-${gradientTo.replace("600", "700")}`
    : `from-${gradientFrom} to-${gradientTo} hover:from-${gradientFrom.replace(
        "600",
        "700"
      )} hover:to-${gradientTo.replace("600", "700")}`;

  return (
    <Link
      href="/"
      className={`absolute top-4 right-4 bg-gradient-to-r ${gradientClass} text-white px-4 py-2 rounded-xl transition-all shadow-lg ${className}`}
    >
      Home
    </Link>
  );
}
