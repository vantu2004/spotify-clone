// Cho phép truyền nhiều loại giá trị class (string, object, array…) và gộp chúng thành một string hợp lệ.
import { clsx, type ClassValue } from "clsx";
// Dùng để merge class của Tailwind, nếu có class trùng thì dùng class sau cùng.
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
