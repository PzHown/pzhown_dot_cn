'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@pzhown/ui/react'

export default function ComponentShowcase() {
  const [motionKey, setMotionKey] = useState(0)

  return (
    <TooltipProvider>
      <div className="pzhown-ui tw:grid tw:gap-5 tw:lg:grid-cols-2">
        <article className="tw:rounded-[28px] tw:border tw:border-black/8 tw:bg-white/72 tw:p-5 tw:shadow-[0_20px_70px_rgb(17_24_39/0.08)] tw:backdrop-blur-xl">
          <div className="tw:mb-5">
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-black/40">Buttons</p>
            <h3 className="tw:mt-1 tw:text-lg tw:font-semibold tw:tracking-[-0.02em]">Variants & sizing</h3>
          </div>
          <div className="tw:flex tw:flex-wrap tw:gap-2.5">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="tw:mt-4 tw:flex tw:flex-wrap tw:items-center tw:gap-2.5">
            <Button size="xs">XS</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </article>

        <article className="tw:rounded-[28px] tw:border tw:border-black/8 tw:bg-white/72 tw:p-5 tw:shadow-[0_20px_70px_rgb(17_24_39/0.08)] tw:backdrop-blur-xl">
          <div className="tw:mb-5">
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-black/40">Form controls</p>
            <h3 className="tw:mt-1 tw:text-lg tw:font-semibold tw:tracking-[-0.02em]">Input & switch</h3>
          </div>
          <div className="tw:grid tw:gap-4">
            <Input placeholder="Search components…" />
            <div className="tw:flex tw:items-center tw:justify-between tw:rounded-2xl tw:bg-black/[0.035] tw:px-4 tw:py-3">
              <div>
                <p className="tw:text-sm tw:font-medium">Motion effects</p>
                <p className="tw:mt-0.5 tw:text-xs tw:text-black/45">Spring, layout and gesture feedback</p>
              </div>
              <Switch defaultChecked aria-label="Enable motion effects" />
            </div>
          </div>
        </article>

        <article className="tw:rounded-[28px] tw:border tw:border-black/8 tw:bg-white/72 tw:p-5 tw:shadow-[0_20px_70px_rgb(17_24_39/0.08)] tw:backdrop-blur-xl">
          <div className="tw:mb-5">
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-black/40">Overlays</p>
            <h3 className="tw:mt-1 tw:text-lg tw:font-semibold tw:tracking-[-0.02em]">Dialog, popover, tooltip & menu</h3>
          </div>
          <div className="tw:flex tw:flex-wrap tw:gap-2.5">
            <Dialog>
              <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Shared component layer</DialogTitle>
                  <DialogDescription>
                    Base UI handles behavior and accessibility while the PzHown layer owns squircle, blur and visual tokens.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                  <DialogClose render={<Button />}>Looks good</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>Popover</PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Progressive surface</PopoverTitle>
                  <PopoverDescription>Translucent surface, squircle corner and a native Base UI positioner.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger render={<Button variant="secondary" />}>Hover me</TooltipTrigger>
              <TooltipContent>Base UI tooltip</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" />}>Menu</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Preview</DropdownMenuItem>
                <DropdownMenuItem>
                  Duplicate
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </article>

        <article className="tw:rounded-[28px] tw:border tw:border-black/8 tw:bg-white/72 tw:p-5 tw:shadow-[0_20px_70px_rgb(17_24_39/0.08)] tw:backdrop-blur-xl">
          <div className="tw:mb-5">
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-black/40">Tabs</p>
            <h3 className="tw:mt-1 tw:text-lg tw:font-semibold tw:tracking-[-0.02em]">Stateful navigation</h3>
          </div>
          <Tabs defaultValue="design">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="motion">Motion</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            <TabsContent value="design" className="tw:pt-4 tw:text-sm tw:leading-6 tw:text-black/55">
              Squircle corners, Oklab color interpolation and progressive blur form the visual foundation.
            </TabsContent>
            <TabsContent value="motion" className="tw:pt-4 tw:text-sm tw:leading-6 tw:text-black/55">
              Motion provides spring, gesture, layout and coordinated state transitions.
            </TabsContent>
            <TabsContent value="system" className="tw:pt-4 tw:text-sm tw:leading-6 tw:text-black/55">
              Base UI primitives keep keyboard navigation, focus management and ARIA behavior reliable.
            </TabsContent>
          </Tabs>
        </article>

        <article className="tw:rounded-[28px] tw:border tw:border-black/8 tw:bg-white/72 tw:p-5 tw:shadow-[0_20px_70px_rgb(17_24_39/0.08)] tw:backdrop-blur-xl tw:lg:col-span-2">
          <div className="tw:flex tw:flex-col tw:gap-5 tw:md:flex-row tw:md:items-center tw:md:justify-between">
            <div>
              <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-black/40">Motion / React</p>
              <h3 className="tw:mt-1 tw:text-lg tw:font-semibold tw:tracking-[-0.02em]">Spring interaction</h3>
              <p className="tw:mt-2 tw:max-w-xl tw:text-sm tw:leading-6 tw:text-black/50">
                Hover the object for a spring-driven transform, or replay its entrance animation.
              </p>
            </div>
            <Button variant="outline" onClick={() => setMotionKey((value) => value + 1)}>
              Replay
            </Button>
          </div>
          <div className="tw:mt-5 tw:flex tw:min-h-44 tw:items-center tw:justify-center tw:overflow-hidden tw:rounded-[24px] tw:bg-[radial-gradient(circle_at_50%_0%,oklch(0.9_0.12_260),transparent_54%),linear-gradient(135deg,oklch(0.98_0.01_260),oklch(0.94_0.02_300))]">
            <motion.div
              key={motionKey}
              initial={{ opacity: 0, y: 26, scale: 0.88, rotate: -7 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.12, rotate: 5, y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="tw:grid tw:size-24 tw:place-items-center tw:rounded-[28px] tw:border tw:border-white/55 tw:bg-white/48 tw:shadow-[0_24px_70px_rgb(68_79_140/0.22)] tw:backdrop-blur-xl"
            >
              <span className="tw:text-sm tw:font-semibold tw:tracking-[-0.02em]">Motion</span>
            </motion.div>
          </div>
        </article>
      </div>
    </TooltipProvider>
  )
}
