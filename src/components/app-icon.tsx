import Image from "next/image";

export function AppIcon({
  size = "large",
}: {
	size?: "small" | "large";
}) {
  return (
    <Image src="/app-icon.png" alt="MediXplorer" width={size === "small" ? 32 : 64} height={size === "small" ? 32 : 64} />
  );
}
