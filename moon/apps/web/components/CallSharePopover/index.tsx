import React, { useState } from 'react'

import { Call } from '@gitmono/types'
import { CONTAINER_STYLES, Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@gitmono/ui'
import { cn } from '@gitmono/ui/src/utils'

import { CallShareContent } from '@/components/CallSharePopover/CallShareContent'

interface CallSharePopoverProps extends React.PropsWithChildren {
  call: Call
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  modal?: boolean
}

export function CallSharePopover({
  call,
  children,
  side = 'bottom',
  align = 'end',
  modal = true
}: CallSharePopoverProps) {
  const [open, onOpenChange] = useState(false)

  return (
    <Popover open={open} onOpenChange={(val) => onOpenChange(val)} modal={modal}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          avoidCollisions
          asChild
          side={side}
          align={align}
          sideOffset={8}
          className={cn(
            'w-[440px]',
            CONTAINER_STYLES.base,
            CONTAINER_STYLES.shadows,
            'bg-elevated rounded-lg border bg-clip-border'
          )}
          onKeyDownCapture={(evt) => {
            // Temporary fix: prevent close when focused on react-select input
            if (evt.key === 'Escape' && document.activeElement instanceof HTMLInputElement) {
              evt.preventDefault()
            }
          }}
          onBlurCapture={(evt) => evt.preventDefault()}
        >
          <CallShareContent call={call} onOpenChange={onOpenChange} />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}
