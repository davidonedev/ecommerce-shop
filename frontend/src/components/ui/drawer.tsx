'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconButton } from './icon-button'
import { cx, dialogOverlayClass, drawerContentClass, type DrawerSide } from './variants'

/**
 * Drawer lateral ou inferior (Radix Dialog). Serve ao menu mobile (side="left") e ao mini-carrinho (side="right").
 */
export const Drawer = DialogPrimitive.Root
export const DrawerTrigger = DialogPrimitive.Trigger
export const DrawerClose = DialogPrimitive.Close

export interface DrawerContentProps {
  title: string
  description?: string
  side?: DrawerSide
  hideTitle?: boolean
  className?: string
  children?: ReactNode
}

export function DrawerContent({
  title,
  description,
  side = 'right',
  hideTitle,
  className,
  children,
}: DrawerContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlayClass} />
      <DialogPrimitive.Content
        className={drawerContentClass({ side, className })}
        {...(description ? {} : { 'aria-describedby': undefined })}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-3">
          <DialogPrimitive.Title className={hideTitle ? 'sr-only' : 'text-section-title text-graphite'}>
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Close asChild>
            <IconButton label="Fechar" size="sm">
              <X aria-hidden className="size-5" />
            </IconButton>
          </DialogPrimitive.Close>
        </div>
        {description ? (
          <DialogPrimitive.Description className="px-6 pt-4 text-text-muted">{description}</DialogPrimitive.Description>
        ) : null}
        <div className={cx('flex-1 overflow-y-auto px-6 py-4')}>{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
