"use client"

import {
  SliderFill,
  Slider as SliderPrimitive,
  SliderThumb,
  SliderTrack,
  type SliderProps as SliderPrimitiveProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"

type SliderValue = number | number[]
type SliderProps<T extends SliderValue = SliderValue> = Omit<
  SliderPrimitiveProps<T>,
  "className"
> & {
  className?: string
}

function Slider<T extends SliderValue = SliderValue>({
  className,
  ...props
}: SliderProps<T>) {
  return (
    <SliderPrimitive
      className={cn(
        "tw:group tw:relative tw:flex tw:w-full tw:touch-none tw:items-center tw:select-none tw:data-disabled:opacity-50 tw:data-vertical:h-full tw:data-vertical:min-h-40 tw:data-vertical:w-auto tw:data-vertical:flex-col",
        className
      )}
      data-slot="slider"
      {...props}
    >
      {({ state }) => {
        return (
          <>
            <SliderTrack
              data-slot="slider-track"
              className="tw:relative tw:grow tw:overflow-hidden tw:rounded-full tw:bg-muted tw:select-none tw:data-horizontal:h-1 tw:data-horizontal:w-full tw:data-vertical:h-full tw:data-vertical:w-1"
            >
              <SliderFill
                data-slot="slider-range"
                className="tw:absolute tw:bg-primary tw:select-none tw:data-horizontal:h-full tw:data-vertical:w-full"
              />
            </SliderTrack>
            {state.values.map((_, index) => (
              <SliderThumb
                data-slot="slider-thumb"
                key={index}
                index={index}
                className="tw:relative tw:block tw:size-3 tw:shrink-0 tw:rounded-full tw:border tw:border-ring tw:bg-white tw:ring-ring/50 tw:transition-[color,box-shadow] tw:select-none tw:group-data-horizontal:top-[50%] tw:group-data-vertical:left-[50%] tw:after:absolute tw:after:-inset-2 tw:hover:ring-3 tw:focus-visible:ring-3 tw:focus-visible:outline-hidden tw:active:ring-3 tw:disabled:pointer-events-none tw:disabled:opacity-50"
              />
            ))}
          </>
        )
      }}
    </SliderPrimitive>
  )
}

export { Slider }
