'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { accordionContentClass, accordionItemClass, accordionTriggerClass, cx } from './variants'

/**
 * Acordeão (Radix): teclado completo (setas, Home/End, Enter/Espaço) e aria-expanded automáticos.
 * Uso: <Accordion type="single" collapsible> <AccordionItem value="a"> <AccordionTrigger/> <AccordionContent/> ...
 */
export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cx(accordionItemClass, className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className={cx(accordionTriggerClass, className)} {...props}>
        {children}
        <ChevronDown aria-hidden className="size-5" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className={accordionContentClass} {...props}>
      <div className={cx('pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
