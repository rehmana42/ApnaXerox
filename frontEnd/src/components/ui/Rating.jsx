import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Rating({
  value = 0,
  max = 5,
  onChange,
  size = 15,
  readOnly = false,
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const ratingValue = i + 1
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "cursor-pointer transition-colors  ",
              ratingValue <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300",
              readOnly && "cursor-default"
            )}
            onClick={() =>
              !readOnly && onChange && onChange(ratingValue)
            }
          />
        )
      })}
    </div>
  )
}
