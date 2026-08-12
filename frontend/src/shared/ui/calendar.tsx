import { useState } from "react"
import { DayPicker, type DayPickerProps } from "react-day-picker"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/shared/lib/utils"

const DEFAULT_START_MONTH = new Date(new Date().getFullYear() - 5, 0)

const dayPickerClassNames = {
  months: "flex flex-col gap-2",
  month: "flex flex-col gap-2",
  month_caption: "hidden",
  nav: "hidden",
  month_grid: "w-full border-collapse",
  weekdays: "flex",
  weekday: "text-muted-foreground w-8 shrink-0 text-[0.65rem] font-medium",
  week: "flex w-full mt-1",
  day: "size-8 shrink-0 p-0 text-center text-xs",
  day_button:
    "size-8 rounded-md border border-transparent font-normal text-foreground hover:border-border hover:bg-muted transition-colors aria-selected:opacity-100",
  selected: "[&>button]:border-primary [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary/90",
  today: "[&>button]:border-primary [&>button]:font-semibold [&>button]:text-primary",
  outside: "[&>button]:text-muted-foreground/40",
  disabled: "[&>button]:text-muted-foreground/30 [&>button]:pointer-events-none [&>button]:hover:border-transparent",
  range_middle:
    "bg-primary/10 [&>button]:border-transparent [&>button]:bg-transparent [&>button]:text-foreground! [&>button]:rounded-none [&>button]:hover:bg-primary/20",
  range_start: "rounded-l-md [&>button]:rounded-r-none",
  range_end: "rounded-r-md [&>button]:rounded-l-none",
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const YEARS_PER_PAGE = 12
const navButtonClassName =
  "size-6 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
const gridButtonClassName =
  "rounded-md border border-transparent py-2 text-xs font-medium transition-colors hover:border-border hover:bg-muted"
const gridButtonActiveClassName = "border-primary bg-primary text-primary-foreground hover:bg-primary/90"

// Each button independently opens its own grid — clicking the year does NOT
// require going through the month grid first, and vice versa.
type View = 'days' | 'months' | 'years'

function Calendar({ className, startMonth = DEFAULT_START_MONTH, endMonth, month: monthProp, onMonthChange, ...props }: DayPickerProps) {
  const [view, setView] = useState<View>('days')
  const [month, setMonth] = useState(monthProp ?? new Date())
  const [yearPageStart, setYearPageStart] = useState(() => Math.floor(month.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE)

  const minYear = startMonth?.getFullYear() ?? month.getFullYear() - 100
  const maxYear = endMonth?.getFullYear() ?? month.getFullYear() + 100

  function goToMonth(next: Date) {
    setMonth(next)
    onMonthChange?.(next)
  }

  function openYears() {
    setYearPageStart(Math.floor(month.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE)
    setView('years')
  }

  return (
    <div className={cn("p-2", className)}>
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            view === 'years'
              ? setYearPageStart((y) => y - YEARS_PER_PAGE)
              : goToMonth(new Date(month.getFullYear(), month.getMonth() - 1))
          }
          disabled={view === 'years' ? yearPageStart <= minYear : Boolean(startMonth && month <= startMonth)}
          className={navButtonClassName}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" />
        </button>

        <div className="flex items-center gap-1">
          {view === 'years' ? (
            <span className="px-1.5 py-0.5 text-xs font-medium">
              {yearPageStart} – {yearPageStart + YEARS_PER_PAGE - 1}
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setView(view === 'months' ? 'days' : 'months')}
                className="rounded-md border border-transparent px-1.5 py-0.5 text-xs font-medium transition-colors hover:border-border hover:bg-muted"
              >
                {month.toLocaleString('en-US', { month: 'long' })}
              </button>
              <button
                type="button"
                onClick={openYears}
                className="rounded-md border border-transparent px-1.5 py-0.5 text-xs font-medium transition-colors hover:border-border hover:bg-muted"
              >
                {month.getFullYear()}
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            view === 'years'
              ? setYearPageStart((y) => y + YEARS_PER_PAGE)
              : goToMonth(new Date(month.getFullYear(), month.getMonth() + 1))
          }
          disabled={view === 'years' ? yearPageStart + YEARS_PER_PAGE > maxYear : Boolean(endMonth && month >= endMonth)}
          className={navButtonClassName}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
        </button>
      </div>

      {view === 'days' && (
        <DayPicker
          month={month}
          onMonthChange={goToMonth}
          startMonth={startMonth}
          endMonth={endMonth}
          classNames={dayPickerClassNames}
          {...props}
        />
      )}

      {view === 'months' && (
        <div className="grid grid-cols-3 gap-1.5">
          {MONTH_LABELS.map((label, i) => {
            const isDisabled =
              (startMonth && new Date(month.getFullYear(), i + 1, 0) < startMonth) ||
              (endMonth && new Date(month.getFullYear(), i, 1) > endMonth)
            return (
              <button
                key={label}
                type="button"
                disabled={Boolean(isDisabled)}
                onClick={() => {
                  goToMonth(new Date(month.getFullYear(), i))
                  setView('days')
                }}
                className={cn(gridButtonClassName, i === month.getMonth() && gridButtonActiveClassName, isDisabled && "pointer-events-none opacity-30")}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}

      {view === 'years' && (
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: YEARS_PER_PAGE }, (_, i) => yearPageStart + i).map((year) => {
            const isDisabled = year < minYear || year > maxYear
            return (
              <button
                key={year}
                type="button"
                disabled={isDisabled}
                onClick={() => {
                  goToMonth(new Date(year, month.getMonth()))
                  setView('days')
                }}
                className={cn(gridButtonClassName, year === month.getFullYear() && gridButtonActiveClassName, isDisabled && "pointer-events-none opacity-30")}
              >
                {year}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { Calendar }
