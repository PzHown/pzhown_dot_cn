"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarMonthPicker,
  CalendarYearPicker,
  type CalendarCellRenderProps,
  type CalendarProps,
  type DateValue,
  type RangeCalendarProps,
} from "react-aria-components"

import { cn } from "@pzhown/ui/lib/utils"
import { Button, buttonVariants } from "@pzhown/ui/components/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@pzhown/ui/components/select"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

const cellVariants = cva(
  "tw:group/day tw:relative tw:mt-2 tw:aspect-square tw:h-full tw:w-full tw:cursor-default tw:rounded-(--cell-radius) tw:p-0 tw:text-center tw:select-none tw:[&:is(:last-child>[data-selected=true])>div]:rounded-r-(--cell-radius)",
  {
    variants: {
      showWeekNumber: {
        false:
          "tw:[&:is(:first-child>[data-selected=true])>div]:rounded-l-(--cell-radius)",
        true: "tw:[&:is(:nth-child(2)>[data-selected=true])>div]:rounded-l-(--cell-radius)",
      },
      isToday: {
        true: "tw:rounded-(--cell-radius) tw:bg-muted tw:text-foreground tw:data-[selected=true]:rounded-none",
      },
      isSelectionStart: {
        true: "tw:relative tw:isolate tw:z-0 tw:rounded-l-(--cell-radius) tw:bg-muted tw:after:absolute tw:after:inset-y-0 tw:after:right-0 tw:after:w-4 tw:after:bg-muted",
      },
      isSelectionEnd: {
        true: "tw:relative tw:isolate tw:z-0 tw:rounded-r-(--cell-radius) tw:bg-muted tw:after:absolute tw:after:inset-y-0 tw:after:left-0 tw:after:w-4 tw:after:bg-muted",
      },
      isUnavailable: {
        true: "tw:text-muted-foreground tw:opacity-50 tw:[&>div]:line-through",
      },
      isDisabled: {
        true: "tw:text-muted-foreground tw:opacity-50",
      },
      isOutsideMonth: {
        true: "tw:text-muted-foreground tw:aria-selected:text-muted-foreground",
      },
    },
  }
)

function Calendar<
  T extends DateValue,
  M extends "single" | "multiple" = "single",
>(
  props: Omit<CalendarProps<T, M>, "visibleDuration"> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"]
    captionLayout?: "label" | "dropdown"
    numberOfMonths?: number
    showWeekNumber?: boolean
    headerFormat?: Intl.DateTimeFormatOptions
    renderCell?: (
      renderProps: CalendarCellRenderProps & {
        defaultChildren: React.ReactNode
      }
    ) => React.ReactNode
  }
) {
  return (
    <AriaCalendar
      {...props}
      data-slot="calendar"
      visibleDuration={{ months: props.numberOfMonths || 1 }}
      className={cn(
        "tw:group/calendar tw:w-fit tw:bg-background tw:p-2 tw:[--cell-radius:var(--radius-md)] tw:[--cell-size:--spacing(7)] tw:in-data-[slot=card-content]:bg-transparent tw:in-data-[slot=popover-content]:bg-transparent",
        props.className
      )}
    >
      <CalendarInner {...props} />
    </AriaCalendar>
  )
}

function RangeCalendar<T extends DateValue>(
  props: RangeCalendarProps<T> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"]
    captionLayout?: "label" | "dropdown"
    headerFormat?: Intl.DateTimeFormatOptions
    numberOfMonths?: number
    showWeekNumber?: boolean
    renderCell?: (
      renderProps: CalendarCellRenderProps & {
        defaultChildren: React.ReactNode
      }
    ) => React.ReactNode
  }
) {
  return (
    <AriaRangeCalendar
      {...props}
      data-slot="calendar"
      visibleDuration={{ months: props.numberOfMonths || 1 }}
      className={cn(
        "tw:group/calendar tw:w-fit tw:bg-background tw:p-2 tw:[--cell-radius:var(--radius-md)] tw:[--cell-size:--spacing(7)] tw:in-data-[slot=card-content]:bg-transparent tw:in-data-[slot=popover-content]:bg-transparent",
        props.className
      )}
    >
      <CalendarInner {...props} isRange />
    </AriaRangeCalendar>
  )
}

function CalendarInner({
  captionLayout = "label",
  buttonVariant = "ghost",
  numberOfMonths = 1,
  showWeekNumber = false,
  headerFormat,
  renderCell,
  isRange,
}: {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  captionLayout?: "label" | "dropdown"
  numberOfMonths?: number
  showWeekNumber?: boolean
  headerFormat?: Intl.DateTimeFormatOptions
  renderCell?: (
    renderProps: CalendarCellRenderProps & { defaultChildren: React.ReactNode }
  ) => React.ReactNode
  isRange?: boolean
}) {
  return (
    <div className="tw:relative tw:flex tw:flex-col tw:gap-4 tw:md:flex-row">
      <header className="tw:absolute tw:inset-x-0 tw:top-0 tw:flex tw:w-full tw:items-center tw:justify-between tw:gap-1">
        <Button
          variant={buttonVariant}
          slot="previous"
          className="tw:size-(--cell-size) tw:p-0 tw:select-none tw:aria-disabled:opacity-50"
        >
          <ChevronLeftIcon className="tw:size-4" />
        </Button>
        <Button
          variant={buttonVariant}
          slot="next"
          className="tw:size-(--cell-size) tw:p-0 tw:select-none tw:aria-disabled:opacity-50"
        >
          <ChevronRightIcon className="tw:size-4" />
        </Button>
      </header>
      {Array.from({ length: numberOfMonths }, (_, i) => (
        <div key={i} className="tw:flex tw:w-full tw:flex-col tw:gap-4">
          <div className="tw:flex tw:h-(--cell-size) tw:w-full tw:items-center tw:justify-center tw:gap-1 tw:px-(--cell-size)">
            {captionLayout === "dropdown" ? (
              <>
                <MonthDropdown format={headerFormat} />
                <YearDropdown format={headerFormat} />
              </>
            ) : (
              <CalendarHeading
                offset={{ months: i }}
                format={headerFormat}
                className="tw:text-sm tw:font-medium tw:select-none"
              />
            )}
          </div>
          <CalendarGrid
            className="tw:w-full tw:border-collapse"
            offset={{ months: i }}
          >
            <AriaCalendarGridHeader>
              {(day) => (
                <CalendarHeaderCell className="tw:rounded-(--cell-radius) tw:text-[0.8rem] tw:font-normal tw:text-muted-foreground tw:select-none">
                  {day}
                </CalendarHeaderCell>
              )}
            </AriaCalendarGridHeader>
            <CalendarGridBody>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={(renderProps) =>
                    cellVariants({ ...renderProps, showWeekNumber })
                  }
                >
                  {(renderProps) => (
                    <div
                      data-selected-single={renderProps.isSelected && !isRange}
                      data-range-start={renderProps.isSelectionStart && isRange}
                      data-range-end={renderProps.isSelectionEnd && isRange}
                      data-range-middle={
                        renderProps.isSelected &&
                        !renderProps.isSelectionStart &&
                        !renderProps.isSelectionEnd &&
                        isRange
                      }
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "tw:relative tw:isolate tw:z-10 tw:flex tw:aspect-square tw:h-full tw:w-full tw:min-w-(--cell-size) tw:flex-col tw:gap-1 tw:border-0 tw:leading-none tw:font-normal tw:group-data-[focused=true]/day:relative tw:group-data-[focused=true]/day:z-10 tw:group-data-[focused=true]/day:border-ring tw:group-data-[focused=true]/day:ring-[3px] tw:group-data-[focused=true]/day:ring-ring/50 tw:data-[range-end=true]:rounded-(--cell-radius) tw:data-[range-end=true]:rounded-r-(--cell-radius) tw:data-[range-end=true]:bg-primary tw:data-[range-end=true]:text-primary-foreground tw:data-[range-middle=true]:rounded-none tw:data-[range-middle=true]:bg-muted tw:data-[range-middle=true]:text-foreground tw:data-[range-start=true]:rounded-(--cell-radius) tw:data-[range-start=true]:rounded-l-(--cell-radius) tw:data-[range-start=true]:bg-primary tw:data-[range-start=true]:text-primary-foreground tw:data-[selected-single=true]:bg-primary tw:data-[selected-single=true]:text-primary-foreground tw:dark:hover:text-foreground tw:[&>span]:text-xs tw:[&>span]:opacity-70"
                      )}
                    >
                      {renderCell
                        ? renderCell(renderProps)
                        : renderProps.defaultChildren}
                    </div>
                  )}
                </CalendarCell>
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      ))}
    </div>
  )
}

function MonthDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
  return (
    <CalendarMonthPicker format={format?.month}>
      {(props) => (
        <Select {...props} className="tw:relative">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="tw:min-w-0">
            <SelectGroup>
              {props.items.map((item) => (
                <SelectItem key={item.id} id={item.id}>
                  {item.formatted}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </CalendarMonthPicker>
  )
}

function YearDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
  return (
    <CalendarYearPicker format={format}>
      {(props) => (
        <Select {...props} className="tw:relative">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="tw:min-w-0">
            {props.items.map((item) => (
              <SelectItem key={item.id} id={item.id}>
                {item.formatted}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </CalendarYearPicker>
  )
}

export { Calendar, RangeCalendar }
