export function formatDate(value: string): string {
  if (!value || value === "0") {
    return "-";
  }
  return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
}