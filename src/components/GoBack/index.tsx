import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { CSSProperties } from "react";

export default function GoBack({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const router = useRouter();

  return (
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
      <ArrowLeft size={24} /> Voltar
    </a>
  );
}
