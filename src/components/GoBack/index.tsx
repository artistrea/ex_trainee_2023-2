import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties } from "react";

export default function GoBack({
  className = "",
  style,
  to,
  text,
}: {
  className?: string;
  style?: CSSProperties;
  to?: string;
  text?: string;
}) {
  const router = useRouter();

  return to ? (
    <Link
      href={to}
      className={className}
      style={{
        cursor: "pointer",
        display: "flex",
        padding: "0.5rem 1rem",
        color: "var(--clr-accent)",
        ...style,
      }}
    >
      <ArrowLeft size={24} /> {text ?? "Voltar"}
    </Link>
  ) : (
    <a
      className={className}
      style={{
        cursor: "pointer",
        display: "flex",
        padding: "0.5rem 1rem",
        color: "var(--clr-accent)",
        ...style,
      }}
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <ArrowLeft size={24} /> {text ?? "Voltar"}
    </a>
  );
}
