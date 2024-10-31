"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props) {
  const pathName = usePathname();
  const active = pathName === props.path;

  return (
    <Link
      href={props.path}
      className={`${
        active ? "opacity-100 border-b-2 border-green-500" : "opacity-50 hover:opacity-65"
      }`}
    >
      {props.text}
    </Link>
  );
}
