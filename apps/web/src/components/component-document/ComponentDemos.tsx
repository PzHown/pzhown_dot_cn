'use client'

import * as React from 'react'
import * as UI from '@pzhown/ui/react'

const components = UI as unknown as Record<string, React.ElementType>

type PieceProps = {
  name: string
  children?: React.ReactNode
  [key: string]: unknown
}

function Piece({ name, children, ...props }: PieceProps) {
  const Component = components[name]
  if (!Component) {
    return (
      <span className="tw:inline-flex tw:rounded-md tw:border tw:border-destructive/30 tw:bg-destructive/10 tw:px-2 tw:py-1 tw:text-xs tw:text-destructive">
        未找到导出：{name}
      </span>
    )
  }
  return React.createElement(Component, props, children)
}

function DemoRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`tw:flex tw:flex-wrap tw:items-center tw:gap-3 ${className}`}>{children}</div>
}

function DemoStack({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`tw:grid tw:gap-3 ${className}`}>{children}</div>
}

function ClientMounted({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        data-client-mount-placeholder
        className="tw:grid tw:min-h-24 tw:place-items-center tw:rounded-xl tw:border tw:border-dashed tw:border-border tw:bg-muted/30 tw:text-xs tw:text-muted-foreground"
      >
        客户端组件加载中…
      </div>
    )
  }

  return <>{children}</>
}

function StateLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="tw:mb-1 tw:block tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.14em] tw:text-muted-foreground">
      {children}
    </span>
  )
}

type ForcedStateName = 'default' | 'hover' | 'pressed' | 'focus' | 'selected' | 'invalid' | 'disabled'

function ForcedState({
  label,
  state,
  children,
}: {
  label: string
  state: ForcedStateName
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (state === 'default') return
    const target = ref.current?.querySelector<HTMLElement>('[data-slot]')
    if (!target) return

    const attrs: Partial<Record<ForcedStateName, string>> = {
      hover: 'data-hovered',
      pressed: 'data-pressed',
      focus: 'data-focus-visible',
      selected: 'data-selected',
      invalid: 'data-invalid',
      disabled: 'data-disabled',
    }
    const attr = attrs[state]
    if (attr) target.setAttribute(attr, 'true')
    if (state === 'selected') {
      target.setAttribute('data-checked', 'true')
      target.setAttribute('aria-checked', 'true')
      target.setAttribute('aria-pressed', 'true')
    }
    if (state === 'invalid') target.setAttribute('aria-invalid', 'true')
    if (state === 'disabled' && ('disabled' in target)) {
      ;(target as HTMLButtonElement | HTMLInputElement).disabled = true
    }
  }, [state])

  return (
    <div
      ref={ref}
      data-lab-state={state}
      className="tw:min-w-[112px] tw:rounded-xl tw:border tw:border-border/70 tw:bg-background/55 tw:p-3"
    >
      <StateLabel>{label}</StateLabel>
      <div className="tw:flex tw:min-h-10 tw:items-center">{children}</div>
    </div>
  )
}

function ControlStateMatrix({
  render,
  selected = false,
  invalid = false,
}: {
  render: (state: ForcedStateName) => React.ReactNode
  selected?: boolean
  invalid?: boolean
}) {
  const states: Array<[string, ForcedStateName]> = [
    ['默认', 'default'],
    ['悬停', 'hover'],
    ['按下', 'pressed'],
    ['焦点', 'focus'],
    ['禁用', 'disabled'],
  ]
  if (selected) states.splice(4, 0, ['选中', 'selected'])
  if (invalid) states.splice(states.length - 1, 0, ['无效', 'invalid'])

  return (
    <div className="tw:grid tw:grid-cols-[repeat(auto-fit,minmax(112px,1fr))] tw:gap-2">
      {states.map(([label, state]) => (
        <ForcedState key={state} label={label} state={state}>
          {render(state)}
        </ForcedState>
      ))}
    </div>
  )
}

function LiveHint({ children = '此处保留真实交互，可直接点击、聚焦、拖动或展开。' }: { children?: React.ReactNode }) {
  return <p className="tw:m-0 tw:text-xs tw:leading-5 tw:text-muted-foreground">{children}</p>
}

function AccordionDemo() {
  return (
    <DemoStack>
      <Piece name="Accordion" defaultExpandedKeys={['a']}>
        <Piece name="AccordionItem" id="a">
          <Piece name="AccordionTrigger">已展开状态</Piece>
          <Piece name="AccordionContent">内容区域保持真实高度动画和键盘行为。</Piece>
        </Piece>
        <Piece name="AccordionItem" id="b">
          <Piece name="AccordionTrigger">收起状态</Piece>
          <Piece name="AccordionContent">展开后显示这段内容。</Piece>
        </Piece>
        <Piece name="AccordionItem" id="c" isDisabled>
          <Piece name="AccordionTrigger">禁用状态</Piece>
          <Piece name="AccordionContent">不可展开。</Piece>
        </Piece>
      </Piece>
    </DemoStack>
  )
}

function AlertDemo() {
  return (
    <DemoStack>
      <Piece name="Alert">
        <Piece name="AlertTitle">默认提示</Piece>
        <Piece name="AlertDescription">用于一般状态、说明或需要注意的信息。</Piece>
      </Piece>
      <Piece name="Alert" variant="destructive">
        <Piece name="AlertTitle">破坏性提示</Piece>
        <Piece name="AlertDescription">用于错误、风险或需要立即关注的问题。</Piece>
      </Piece>
      <Piece name="Alert">
        <Piece name="AlertTitle">带操作</Piece>
        <Piece name="AlertDescription">提示中也可以提供一个明确的恢复动作。</Piece>
        <Piece name="AlertAction"><Piece name="Button" size="sm" variant="outline">重试</Piece></Piece>
      </Piece>
    </DemoStack>
  )
}

function AlertDialogDemo() {
  return (
    <DemoStack>
      <Piece name="AlertDialogTrigger">
        <Piece name="Button" variant="destructive">打开确认对话框</Piece>
        <Piece name="AlertDialogContent">
          <Piece name="AlertDialogHeader">
            <Piece name="AlertDialogTitle">删除这条记录？</Piece>
            <Piece name="AlertDialogDescription">此操作用于展示高风险确认状态。</Piece>
          </Piece>
          <Piece name="AlertDialogFooter">
            <Piece name="AlertDialogCancel">取消</Piece>
            <Piece name="AlertDialogAction" variant="destructive">确认删除</Piece>
          </Piece>
        </Piece>
      </Piece>
      <LiveHint>关闭状态常驻；点击按钮检查打开、焦点圈、取消与确认状态。</LiveHint>
    </DemoStack>
  )
}

function AspectRatioDemo() {
  return (
    <div className="tw:grid tw:grid-cols-3 tw:gap-3">
      {[['16:9', 16 / 9], ['4:3', 4 / 3], ['1:1', 1]].map(([label, ratio]) => (
        <div key={String(label)}>
          <StateLabel>{label}</StateLabel>
          <Piece name="AspectRatio" ratio={ratio} className="tw:grid tw:place-items-center tw:rounded-xl tw:bg-muted tw:text-xs tw:text-muted-foreground">
            {label}
          </Piece>
        </div>
      ))}
    </div>
  )
}

function AttachmentDemo() {
  const states = [
    ['idle', '待上传'],
    ['uploading', '上传中'],
    ['processing', '处理中'],
    ['error', '失败'],
    ['done', '完成'],
  ]
  return (
    <DemoStack>
      <DemoRow>
        {states.map(([state, label]) => (
          <Piece key={state} name="Attachment" state={state}>
            <Piece name="AttachmentMedia">{state === 'error' ? '!' : 'PDF'}</Piece>
            <Piece name="AttachmentContent">
              <Piece name="AttachmentTitle">{label}</Piece>
              <Piece name="AttachmentDescription">design-system.pdf</Piece>
            </Piece>
          </Piece>
        ))}
      </DemoRow>
      <Piece name="Attachment" orientation="vertical" state="done">
        <Piece name="AttachmentMedia">IMG</Piece>
        <Piece name="AttachmentContent">
          <Piece name="AttachmentTitle">纵向附件</Piece>
          <Piece name="AttachmentDescription">image.png</Piece>
        </Piece>
      </Piece>
    </DemoStack>
  )
}

function AvatarDemo() {
  return (
    <DemoRow>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Piece key={size} name="Avatar" size={size}>
          <Piece name="AvatarFallback">PZ</Piece>
        </Piece>
      ))}
      <Piece name="Avatar">
        <Piece name="AvatarImage" src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22 viewBox=%220 0 64 64%22%3E%3Crect width=%2264%22 height=%2264%22 rx=%2218%22 fill=%22%2312171f%22/%3E%3Ctext x=%2232%22 y=%2240%22 text-anchor=%22middle%22 font-size=%2222%22 font-family=%22sans-serif%22 fill=%22white%22%3EPH%3C/text%3E%3C/svg%3E" alt="PzHown" />
        <Piece name="AvatarFallback">PH</Piece>
      </Piece>
      <Piece name="AvatarGroup">
        <Piece name="Avatar"><Piece name="AvatarFallback">A</Piece></Piece>
        <Piece name="Avatar"><Piece name="AvatarFallback">B</Piece></Piece>
        <Piece name="AvatarGroupCount">+3</Piece>
      </Piece>
    </DemoRow>
  )
}

function BadgeDemo() {
  return (
    <DemoRow>
      {['default', 'secondary', 'outline', 'destructive'].map((variant) => (
        <Piece key={variant} name="Badge" variant={variant}>{variant}</Piece>
      ))}
    </DemoRow>
  )
}

function BreadcrumbDemo() {
  return (
    <Piece name="Breadcrumb">
      <Piece name="BreadcrumbList">
        <Piece name="BreadcrumbItem"><Piece name="BreadcrumbLink" href="#breadcrumb">首页</Piece></Piece>
        <Piece name="BreadcrumbItem"><Piece name="BreadcrumbLink" href="#breadcrumb">设计系统</Piece></Piece>
        <Piece name="BreadcrumbItem"><Piece name="BreadcrumbEllipsis" /></Piece>
        <Piece name="BreadcrumbItem"><Piece name="BreadcrumbPage">组件文档</Piece></Piece>
      </Piece>
    </Piece>
  )
}

function BubbleDemo() {
  return (
    <DemoStack>
      {['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'].map((variant, index) => (
        <Piece key={variant} name="Bubble" variant={variant} align={index % 2 ? 'end' : 'start'}>
          <Piece name="BubbleContent">{variant} · {index % 2 ? '右对齐' : '左对齐'}</Piece>
        </Piece>
      ))}
    </DemoStack>
  )
}

function ButtonDemo() {
  return (
    <DemoStack>
      <ControlStateMatrix render={(state) => <Piece name="Button" isDisabled={state === 'disabled'}>按钮</Piece>} />
      <DemoRow>
        {['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'].map((variant) => (
          <Piece key={variant} name="Button" variant={variant}>{variant}</Piece>
        ))}
      </DemoRow>
      <DemoRow>
        {['xs', 'sm', 'default', 'lg'].map((size) => <Piece key={size} name="Button" size={size}>{size}</Piece>)}
      </DemoRow>
    </DemoStack>
  )
}

function ButtonGroupDemo() {
  return (
    <DemoStack>
      <Piece name="ButtonGroup">
        <Piece name="Button" variant="outline">左</Piece>
        <Piece name="ButtonGroupSeparator" />
        <Piece name="Button" variant="outline">中</Piece>
        <Piece name="ButtonGroupSeparator" />
        <Piece name="Button" variant="outline" isDisabled>禁用</Piece>
      </Piece>
      <Piece name="ButtonGroup" orientation="vertical">
        <Piece name="Button" variant="outline">上</Piece>
        <Piece name="Button" variant="outline">下</Piece>
      </Piece>
    </DemoStack>
  )
}

function CalendarDemo() {
  return (
    <DemoStack className="tw:max-w-sm">
      <Piece name="Calendar" aria-label="日期选择" />
      <LiveHint>日历保留真实今天、选中、不可用和键盘焦点状态；可直接点击日期检查。</LiveHint>
    </DemoStack>
  )
}

function CardDemo() {
  const card = (size: string, title: string) => (
    <Piece name="Card" size={size} className="tw:min-w-56">
      <Piece name="CardHeader">
        <Piece name="CardTitle">{title}</Piece>
        <Piece name="CardDescription">标题、说明、正文和操作保持统一结构。</Piece>
        <Piece name="CardAction"><Piece name="Badge" variant="secondary">状态</Piece></Piece>
      </Piece>
      <Piece name="CardContent">卡片正文内容。</Piece>
      <Piece name="CardFooter"><Piece name="Button" size="sm">操作</Piece></Piece>
    </Piece>
  )
  return <DemoRow className="tw:items-stretch">{card('default', '默认 Card')}{card('sm', 'Small Card')}</DemoRow>
}

function CarouselDemo() {
  return (
    <div className="tw:px-12">
      <Piece name="Carousel" opts={{ align: 'start' }}>
        <Piece name="CarouselContent">
          {[1, 2, 3].map((item) => (
            <Piece key={item} name="CarouselItem" className="tw:basis-1/2">
              <div className="tw:grid tw:h-24 tw:place-items-center tw:rounded-xl tw:bg-muted tw:text-sm">Slide {item}</div>
            </Piece>
          ))}
        </Piece>
        <Piece name="CarouselPrevious" />
        <Piece name="CarouselNext" />
      </Piece>
    </div>
  )
}

function ChartDemo() {
  return (
    <DemoStack>
      <Piece
        name="ChartContainer"
        config={{ alpha: { label: 'Alpha', color: 'var(--chart-1)' }, beta: { label: 'Beta', color: 'var(--chart-2)' } }}
        className="tw:max-h-44 tw:w-full"
      >
        <div className="tw:grid tw:h-full tw:w-full tw:grid-cols-6 tw:items-end tw:gap-2 tw:p-4">
          {[35, 62, 48, 82, 58, 92].map((value, index) => (
            <div key={index} className="tw:rounded-t-md tw:bg-primary/70" style={{ height: `${value}%` }} />
          ))}
        </div>
      </Piece>
      <LiveHint>ChartContainer、主题变量、Tooltip/Legend API 已加载；此处用轻量柱形占位便于先调整容器与配色。</LiveHint>
    </DemoStack>
  )
}

function CheckboxDemo() {
  return (
    <DemoStack>
      <ControlStateMatrix selected invalid render={(state) => (
        <Piece
          name="Checkbox"
          isSelected={state === 'selected'}
          isDisabled={state === 'disabled'}
          isInvalid={state === 'invalid'}
          aria-label={state}
        />
      )} />
      <DemoRow>
        <Piece name="Checkbox" aria-label="未选" /> <span className="tw:text-sm">未选</span>
        <Piece name="Checkbox" defaultSelected aria-label="已选" /> <span className="tw:text-sm">已选</span>
        <Piece name="Checkbox" isIndeterminate aria-label="混合" /> <span className="tw:text-sm">混合</span>
      </DemoRow>
    </DemoStack>
  )
}

function CollapsibleDemo() {
  return (
    <DemoRow className="tw:items-start">
      <Piece name="Collapsible" defaultExpanded>
        <Piece name="CollapsibleTrigger" className="tw:inline-flex tw:h-9 tw:items-center tw:rounded-xl tw:border tw:border-input tw:bg-background tw:px-3 tw:text-sm tw:font-medium tw:outline-none tw:hover:bg-muted tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50">展开状态</Piece>
        <Piece name="CollapsibleContent"><div className="tw:mt-2 tw:rounded-lg tw:bg-muted tw:p-3 tw:text-sm">已展开内容</div></Piece>
      </Piece>
      <Piece name="Collapsible">
        <Piece name="CollapsibleTrigger" className="tw:inline-flex tw:h-9 tw:items-center tw:rounded-xl tw:border tw:border-input tw:bg-background tw:px-3 tw:text-sm tw:font-medium tw:outline-none tw:hover:bg-muted tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50">收起状态</Piece>
        <Piece name="CollapsibleContent">收起内容</Piece>
      </Piece>
    </DemoRow>
  )
}

function ComboboxDemo() {
  return (
    <DemoStack className="tw:max-w-sm">
      <Piece name="Combobox" defaultItems={[{ id: 'astro', name: 'Astro' }, { id: 'react', name: 'React Aria' }, { id: 'motion', name: 'Motion' }]}> 
        <Piece name="ComboboxInput" placeholder="搜索技术…" />
        <Piece name="ComboboxTrigger" />
        <Piece name="ComboboxContent">
          <Piece name="ComboboxList">
            <Piece name="ComboboxItem" id="astro" textValue="Astro">Astro</Piece>
            <Piece name="ComboboxItem" id="react" textValue="React Aria">React Aria</Piece>
            <Piece name="ComboboxItem" id="motion" textValue="Motion">Motion</Piece>
          </Piece>
          <Piece name="ComboboxEmpty">没有匹配结果</Piece>
        </Piece>
      </Piece>
      <Piece name="Combobox" isDisabled>
        <Piece name="ComboboxInput" placeholder="禁用状态" />
      </Piece>
      <LiveHint>输入、展开、选中、无结果、键盘导航均保留真实交互。</LiveHint>
    </DemoStack>
  )
}

function CommandDemo() {
  return (
    <div className="tw:rounded-xl tw:border tw:border-border tw:bg-popover tw:p-2">
      <Piece name="Command">
        <Piece name="CommandInput" placeholder="搜索命令…" />
        <Piece name="CommandList">
          <Piece name="CommandGroup" heading="导航">
            <Piece name="CommandItem" id="home" textValue="首页">首页</Piece>
            <Piece name="CommandItem" id="components" textValue="组件">组件</Piece>
            <Piece name="CommandItem" id="disabled" textValue="禁用" isDisabled>禁用命令</Piece>
          </Piece>
          <Piece name="CommandEmpty">没有结果</Piece>
        </Piece>
      </Piece>
    </div>
  )
}

function ContextMenuDemo() {
  return (
    <DemoStack>
      <Piece name="ContextMenuTrigger">
        <div className="tw:grid tw:h-28 tw:place-items-center tw:rounded-xl tw:border tw:border-dashed tw:border-border tw:bg-muted/50 tw:text-sm tw:text-muted-foreground">在这里右键</div>
        <Piece name="ContextMenu">
          <Piece name="ContextMenuItem">复制</Piece>
          <Piece name="ContextMenuItem" isDisabled>禁用项</Piece>
          <Piece name="ContextMenuSeparator" />
          <Piece name="ContextMenuItem" variant="destructive">删除</Piece>
        </Piece>
      </Piece>
      <LiveHint>右键打开真实 Context Menu，检查 focused / disabled / destructive 状态。</LiveHint>
    </DemoStack>
  )
}

function DialogDemo() {
  return (
    <Piece name="Dialog">
      <Piece name="DialogTrigger" render={<Piece name="Button" />}>打开 Dialog</Piece>
      <Piece name="DialogContent">
        <Piece name="DialogHeader">
          <Piece name="DialogTitle">组件调试对话框</Piece>
          <Piece name="DialogDescription">用于检查 overlay、surface、标题、说明、焦点与关闭状态。</Piece>
        </Piece>
        <Piece name="DialogFooter">
          <Piece name="DialogClose" render={<Piece name="Button" variant="outline" />}>取消</Piece>
          <Piece name="DialogClose" render={<Piece name="Button" />}>完成</Piece>
        </Piece>
      </Piece>
    </Piece>
  )
}

function DirectionDemo() {
  return (
    <div className="tw:grid tw:grid-cols-2 tw:gap-3">
      <Piece name="DirectionProvider" direction="ltr">
        <div dir="ltr" className="tw:rounded-xl tw:border tw:border-border tw:p-3 tw:text-sm">LTR · 开始 → 结束</div>
      </Piece>
      <Piece name="DirectionProvider" direction="rtl">
        <div dir="rtl" className="tw:rounded-xl tw:border tw:border-border tw:p-3 tw:text-sm">RTL · البداية ← النهاية</div>
      </Piece>
    </div>
  )
}

function DrawerDemo() {
  return (
    <DemoStack>
      <DemoRow>
        {(['down', 'up', 'left', 'right'] as const).map((direction) => (
          <Piece key={direction} name="Drawer" swipeDirection={direction}>
            <Piece name="DrawerTrigger" render={<Piece name="Button" variant="outline" />}>{direction}</Piece>
            <Piece name="DrawerContent">
              <Piece name="DrawerHeader">
                <Piece name="DrawerTitle">Drawer · {direction}</Piece>
                <Piece name="DrawerDescription">检查进入方向、拖动与关闭状态。</Piece>
              </Piece>
              <Piece name="DrawerFooter"><Piece name="DrawerClose" render={<Piece name="Button" />}>关闭</Piece></Piece>
            </Piece>
          </Piece>
        ))}
      </DemoRow>
      <LiveHint>四个方向通过真实 Drawer 展示，点击对应按钮检查。</LiveHint>
    </DemoStack>
  )
}

function DropdownMenuDemo() {
  return (
    <Piece name="DropdownMenu">
      <Piece name="DropdownMenuTrigger" render={<Piece name="Button" variant="outline" />}>打开菜单</Piece>
      <Piece name="DropdownMenuContent">
        <Piece name="DropdownMenuLabel">操作</Piece>
        <Piece name="DropdownMenuItem">普通项</Piece>
        <Piece name="DropdownMenuItem" isDisabled>禁用项</Piece>
        <Piece name="DropdownMenuCheckboxItem" checked>复选项</Piece>
        <Piece name="DropdownMenuSeparator" />
        <Piece name="DropdownMenuItem" variant="destructive">破坏性项</Piece>
      </Piece>
    </Piece>
  )
}

function EmptyDemo() {
  return (
    <Piece name="Empty" className="tw:min-h-48 tw:rounded-xl tw:border tw:border-dashed tw:border-border">
      <Piece name="EmptyHeader">
        <Piece name="EmptyMedia">∅</Piece>
        <Piece name="EmptyTitle">暂时没有内容</Piece>
        <Piece name="EmptyDescription">创建第一项后，内容会出现在这里。</Piece>
      </Piece>
      <Piece name="EmptyContent"><Piece name="Button" size="sm">新建内容</Piece></Piece>
    </Piece>
  )
}

function FieldDemo() {
  return (
    <DemoStack>
      <Piece name="FieldGroup">
        <Piece name="Field">
          <Piece name="FieldLabel">默认字段</Piece>
          <Piece name="Input" placeholder="输入内容" />
          <Piece name="FieldDescription">辅助说明与控件保持紧密关系。</Piece>
        </Piece>
        <Piece name="Field" data-invalid="true">
          <Piece name="FieldLabel">无效字段</Piece>
          <Piece name="Input" aria-invalid="true" defaultValue="错误值" />
          <Piece name="FieldError">请输入有效内容。</Piece>
        </Piece>
        <Piece name="Field" orientation="horizontal">
          <Piece name="FieldLabel">横向</Piece>
          <Piece name="Input" defaultValue="Horizontal" />
        </Piece>
      </Piece>
    </DemoStack>
  )
}

function HoverCardDemo() {
  return (
    <Piece name="HoverCardTrigger">
      <Piece name="Button" variant="link">悬停 / 聚焦查看 Hover Card</Piece>
      <Piece name="HoverCard">
        <div className="tw:grid tw:gap-1">
          <strong className="tw:text-sm">PzHown UI</strong>
          <span className="tw:text-xs tw:text-muted-foreground">补充信息，不承载关键操作。</span>
        </div>
      </Piece>
    </Piece>
  )
}

function InputDemo() {
  return (
    <DemoStack>
      <ControlStateMatrix invalid render={(state) => (
        <Piece name="Input" placeholder={state === 'default' ? 'Placeholder' : state} disabled={state === 'disabled'} aria-invalid={state === 'invalid' || undefined} />
      )} />
      <DemoRow>
        <Piece name="Input" placeholder="空值" />
        <Piece name="Input" defaultValue="已有内容" />
      </DemoRow>
    </DemoStack>
  )
}

function InputGroupDemo() {
  return (
    <DemoStack>
      <Piece name="InputGroup">
        <Piece name="InputGroupAddon">https://</Piece>
        <Piece name="InputGroupInput" placeholder="example.com" />
      </Piece>
      <Piece name="InputGroup">
        <Piece name="InputGroupInput" placeholder="搜索…" />
        <Piece name="InputGroupAddon" align="inline-end"><Piece name="InputGroupButton">⌘K</Piece></Piece>
      </Piece>
      <Piece name="InputGroup" data-invalid="true">
        <Piece name="InputGroupAddon">@</Piece>
        <Piece name="InputGroupInput" aria-invalid="true" defaultValue="invalid" />
      </Piece>
    </DemoStack>
  )
}

function InputOTPDemo() {
  const [value, setValue] = React.useState('1263')

  return (
    <DemoStack>
      <Piece name="InputOTP" maxLength={6} value={value} onChange={setValue}>
        <Piece name="InputOTPGroup">
          {[0, 1, 2].map((index) => <Piece key={index} name="InputOTPSlot" index={index} />)}
        </Piece>
        <Piece name="InputOTPSeparator" />
        <Piece name="InputOTPGroup">
          {[3, 4, 5].map((index) => <Piece key={index} name="InputOTPSlot" index={index} />)}
        </Piece>
      </Piece>
      <Piece name="InputOTP" maxLength={4} disabled>
        <Piece name="InputOTPGroup">{[0, 1, 2, 3].map((index) => <Piece key={index} name="InputOTPSlot" index={index} />)}</Piece>
      </Piece>
    </DemoStack>
  )
}

function ItemDemo() {
  return (
    <DemoStack>
      {['default', 'outline', 'muted'].map((variant) => (
        <Piece key={variant} name="Item" variant={variant}>
          <Piece name="ItemMedia" variant="icon">●</Piece>
          <Piece name="ItemContent">
            <Piece name="ItemTitle">{variant} Item</Piece>
            <Piece name="ItemDescription">用于列表、设置项和紧凑内容单元。</Piece>
          </Piece>
          <Piece name="ItemActions"><Piece name="Button" size="sm" variant="ghost">操作</Piece></Piece>
        </Piece>
      ))}
    </DemoStack>
  )
}

function KbdDemo() {
  return (
    <DemoRow>
      <Piece name="Kbd">⌘</Piece>
      <Piece name="Kbd">K</Piece>
      <Piece name="KbdGroup"><Piece name="Kbd">⌘</Piece><span>+</span><Piece name="Kbd">⇧</Piece><span>+</span><Piece name="Kbd">P</Piece></Piece>
    </DemoRow>
  )
}

function LabelDemo() {
  return (
    <DemoStack className="tw:max-w-sm">
      <Piece name="Label" htmlFor="lab-label-input">默认 Label</Piece>
      <Piece name="Input" id="lab-label-input" placeholder="点击 Label 聚焦" />
      <div data-disabled="true" className="tw:opacity-50"><Piece name="Label">禁用关联状态</Piece></div>
    </DemoStack>
  )
}

function MarkerDemo() {
  return (
    <DemoStack>
      <Piece name="Marker"><Piece name="MarkerContent">默认标记 · 今天</Piece></Piece>
      <Piece name="Marker" variant="separator"><Piece name="MarkerContent">分隔标记</Piece></Piece>
      <Piece name="Marker" variant="border"><Piece name="MarkerContent">底边框标记</Piece></Piece>
    </DemoStack>
  )
}

function MessageDemo() {
  return (
    <Piece name="MessageGroup">
      <Piece name="Message" align="start">
        <Piece name="MessageAvatar">A</Piece>
        <Piece name="MessageContent">
          <Piece name="MessageHeader">Assistant · 10:32</Piece>
          <Piece name="Bubble" variant="secondary"><Piece name="BubbleContent">接收消息状态</Piece></Piece>
          <Piece name="MessageFooter">已读取</Piece>
        </Piece>
      </Piece>
      <Piece name="Message" align="end">
        <Piece name="MessageAvatar">U</Piece>
        <Piece name="MessageContent">
          <Piece name="MessageHeader">You · 10:33</Piece>
          <Piece name="Bubble"><Piece name="BubbleContent">发送消息状态</Piece></Piece>
          <Piece name="MessageFooter">已发送</Piece>
        </Piece>
      </Piece>
    </Piece>
  )
}

function MessageScrollerDemo() {
  return (
    <Piece name="MessageScrollerProvider">
      <Piece name="MessageScroller" className="tw:h-52 tw:rounded-xl tw:border tw:border-border">
        <Piece name="MessageScrollerViewport">
          <Piece name="MessageScrollerContent" className="tw:p-4">
            {Array.from({ length: 8 }, (_, index) => (
              <Piece key={index} name="MessageScrollerItem" scrollAnchor={index === 7}>
                <Piece name="Bubble" variant={index % 2 ? 'secondary' : 'muted'} align={index % 2 ? 'end' : 'start'}>
                  <Piece name="BubbleContent">消息 {index + 1}</Piece>
                </Piece>
              </Piece>
            ))}
          </Piece>
        </Piece>
        <Piece name="MessageScrollerButton" />
      </Piece>
    </Piece>
  )
}

function NativeSelectDemo() {
  return (
    <DemoRow>
      <Piece name="NativeSelect" defaultValue="">
        <Piece name="NativeSelectOption" value="" disabled>请选择</Piece>
        <Piece name="NativeSelectOption" value="a">选项 A</Piece>
        <Piece name="NativeSelectOption" value="b">选项 B</Piece>
      </Piece>
      <Piece name="NativeSelect" defaultValue="b">
        <Piece name="NativeSelectOption" value="a">A</Piece>
        <Piece name="NativeSelectOption" value="b">已选择 B</Piece>
      </Piece>
      <Piece name="NativeSelect" disabled><Piece name="NativeSelectOption">禁用</Piece></Piece>
      <Piece name="NativeSelect" aria-invalid="true"><Piece name="NativeSelectOption">无效</Piece></Piece>
    </DemoRow>
  )
}

function PaginationDemo() {
  return (
    <Piece name="Pagination">
      <Piece name="PaginationContent">
        <Piece name="PaginationItem"><Piece name="PaginationPrevious" href="#pagination" /></Piece>
        <Piece name="PaginationItem"><Piece name="PaginationLink" href="#pagination">1</Piece></Piece>
        <Piece name="PaginationItem"><Piece name="PaginationLink" href="#pagination" isActive>2</Piece></Piece>
        <Piece name="PaginationItem"><Piece name="PaginationEllipsis" /></Piece>
        <Piece name="PaginationItem"><Piece name="PaginationLink" href="#pagination">8</Piece></Piece>
        <Piece name="PaginationItem"><Piece name="PaginationNext" href="#pagination" /></Piece>
      </Piece>
    </Piece>
  )
}

function PopoverDemo() {
  return (
    <Piece name="Popover">
      <Piece name="PopoverTrigger" render={<Piece name="Button" variant="outline" />}>打开 Popover</Piece>
      <Piece name="PopoverContent">
        <Piece name="PopoverHeader">
          <Piece name="PopoverTitle">Popover 标题</Piece>
          <Piece name="PopoverDescription">检查不同 placement、进入与退出状态。</Piece>
        </Piece>
      </Piece>
    </Piece>
  )
}

function ProgressDemo() {
  return (
    <DemoStack>
      {[0, 42, 86, 100].map((value) => (
        <Piece key={value} name="Progress" value={value} minValue={0} maxValue={100}>
          <Piece name="ProgressLabel">进度</Piece>
          <Piece name="ProgressValue" />
        </Piece>
      ))}
      <Piece name="Progress" isIndeterminate><Piece name="ProgressLabel">不确定进度</Piece></Piece>
    </DemoStack>
  )
}

function QuestionnaireDemo() {
  return (
    <DemoStack>
      <div className="tw:rounded-xl tw:border tw:border-border tw:p-4">
        <Piece name="Questionnaire" defaultValue={{ question: 'a' }}>
          <Piece name="QuestionnaireProgress">1 / 3</Piece>
          <Piece name="QuestionnaireItem" id="question">
            <Piece name="QuestionnaireTitle">你更常使用哪种设备？</Piece>
            <Piece name="QuestionnaireDescription">用于检查 choice 的选中、焦点和禁用状态。</Piece>
            <Piece name="QuestionnaireChoices" type="radio">
              <Piece name="QuestionnaireChoice" value="a">桌面端</Piece>
              <Piece name="QuestionnaireChoice" value="b">移动端</Piece>
              <Piece name="QuestionnaireChoice" value="c" disabled>禁用选项</Piece>
            </Piece>
          </Piece>
          <Piece name="QuestionnaireActions">
            <Piece name="QuestionnairePrevious" />
            <Piece name="QuestionnaireSkip" />
            <Piece name="QuestionnaireNext" />
          </Piece>
        </Piece>
      </div>
      <div className="tw:rounded-xl tw:border tw:border-border tw:p-4">
        <Piece name="Questionnaire">
          <Piece name="QuestionnaireItem" id="text">
            <Piece name="QuestionnaireTitle">自由输入</Piece>
            <Piece name="QuestionnaireDescription">单独展示文本输入与错误状态，避免把不同题型混进同一 Item。</Piece>
            <Piece name="QuestionnaireInput" aria-label="问卷文本输入" placeholder="文本输入状态" aria-invalid="true" />
            <Piece name="QuestionnaireError">示例错误信息</Piece>
          </Piece>
        </Piece>
      </div>
    </DemoStack>
  )
}

function RadioGroupDemo() {
  return (
    <DemoStack>
      <Piece name="RadioGroup" defaultValue="b" aria-label="单选示例">
        <DemoRow><Piece name="RadioGroupItem" value="a" /> <span className="tw:text-sm">未选</span></DemoRow>
        <DemoRow><Piece name="RadioGroupItem" value="b" /> <span className="tw:text-sm">已选</span></DemoRow>
        <DemoRow><Piece name="RadioGroupItem" value="c" isDisabled /> <span className="tw:text-sm">禁用</span></DemoRow>
        <DemoRow><Piece name="RadioGroupItem" value="d" isInvalid /> <span className="tw:text-sm">无效</span></DemoRow>
      </Piece>
    </DemoStack>
  )
}

function ResizableDemo() {
  return (
    <div className="tw:h-36 tw:overflow-hidden tw:rounded-xl tw:border tw:border-border">
      <Piece name="ResizablePanelGroup" orientation="horizontal">
        <Piece name="ResizablePanel" defaultSize={45}><div className="tw:grid tw:h-full tw:place-items-center tw:bg-muted/40 tw:text-sm">左面板</div></Piece>
        <Piece name="ResizableHandle" withHandle />
        <Piece name="ResizablePanel" defaultSize={55}><div className="tw:grid tw:h-full tw:place-items-center tw:text-sm">右面板</div></Piece>
      </Piece>
    </div>
  )
}

function ScrollAreaDemo() {
  return (
    <Piece name="ScrollArea" className="tw:h-44 tw:rounded-xl tw:border tw:border-border tw:p-3">
      <div className="tw:grid tw:gap-2">
        {Array.from({ length: 16 }, (_, index) => <div key={index} className="tw:rounded-lg tw:bg-muted tw:px-3 tw:py-2 tw:text-sm">可滚动条目 {index + 1}</div>)}
      </div>
    </Piece>
  )
}

function SelectDemo() {
  return (
    <DemoStack className="tw:max-w-sm">
      <Piece name="Select" placeholder="请选择">
        <Piece name="SelectTrigger"><Piece name="SelectValue" /></Piece>
        <Piece name="SelectContent">
          <Piece name="SelectList">
            <Piece name="SelectItem" id="a">选项 A</Piece>
            <Piece name="SelectItem" id="b">选项 B</Piece>
            <Piece name="SelectItem" id="c" isDisabled>禁用项</Piece>
          </Piece>
        </Piece>
      </Piece>
      <Piece name="Select" isDisabled placeholder="禁用选择框"><Piece name="SelectTrigger"><Piece name="SelectValue" /></Piece></Piece>
      <LiveHint>打开后可检查 focused、selected、disabled 与空列表状态。</LiveHint>
    </DemoStack>
  )
}

function SeparatorDemo() {
  return (
    <div className="tw:grid tw:grid-cols-[1fr_auto_1fr] tw:items-center tw:gap-4">
      <div className="tw:text-sm">左侧</div>
      <Piece name="Separator" orientation="vertical" className="tw:h-10" />
      <div className="tw:text-sm">右侧</div>
      <div className="tw:col-span-3"><Piece name="Separator" /></div>
    </div>
  )
}

function SheetDemo() {
  return (
    <DemoRow>
      {['left', 'right', 'top', 'bottom'].map((side) => (
        <Piece key={side} name="SheetTrigger">
          <Piece name="Button" variant="outline">{side}</Piece>
          <Piece name="SheetContent" side={side}>
            <Piece name="SheetHeader">
              <Piece name="SheetTitle">Sheet · {side}</Piece>
              <Piece name="SheetDescription">检查边缘进入、遮罩、焦点与关闭。</Piece>
            </Piece>
          </Piece>
        </Piece>
      ))}
    </DemoRow>
  )
}

function SidebarDemo() {
  return (
    <div className="tw:h-72 tw:overflow-hidden tw:rounded-xl tw:border tw:border-border">
      <Piece name="SidebarProvider" defaultOpen className="tw:min-h-0! tw:h-full">
        <Piece name="Sidebar" collapsible="icon" className="tw:absolute! tw:h-full!">
          <Piece name="SidebarHeader"><div className="tw:px-2 tw:text-sm tw:font-semibold">PzHown</div></Piece>
          <Piece name="SidebarContent">
            <Piece name="SidebarGroup">
              <Piece name="SidebarGroupLabel">导航</Piece>
              <Piece name="SidebarMenu">
                <Piece name="SidebarMenuItem"><Piece name="SidebarMenuButton" isActive>当前项</Piece></Piece>
                <Piece name="SidebarMenuItem"><Piece name="SidebarMenuButton">普通项</Piece></Piece>
                <Piece name="SidebarMenuItem"><Piece name="SidebarMenuButton" isDisabled>禁用项</Piece></Piece>
              </Piece>
            </Piece>
          </Piece>
          <Piece name="SidebarFooter"><Piece name="SidebarTrigger" /></Piece>
        </Piece>
      </Piece>
    </div>
  )
}

function SkeletonDemo() {
  return (
    <DemoStack>
      <DemoRow><Piece name="Skeleton" className="tw:size-10 tw:rounded-full" /><div className="tw:grid tw:flex-1 tw:gap-2"><Piece name="Skeleton" className="tw:h-4 tw:w-2/3" /><Piece name="Skeleton" className="tw:h-3 tw:w-1/2" /></div></DemoRow>
      <Piece name="Skeleton" className="tw:h-28 tw:w-full tw:rounded-xl" />
    </DemoStack>
  )
}

function SliderDemo() {
  return (
    <DemoStack>
      <Piece name="Slider" defaultValue={[0]} minValue={0} maxValue={100} aria-label="最小值" />
      <Piece name="Slider" defaultValue={[50]} minValue={0} maxValue={100} aria-label="中间值" />
      <Piece name="Slider" defaultValue={[25, 75]} minValue={0} maxValue={100} aria-label="范围" />
      <Piece name="Slider" defaultValue={[60]} isDisabled aria-label="禁用" />
    </DemoStack>
  )
}

function SpinnerDemo() {
  return (
    <DemoRow>
      <div className="tw:scale-75"><Piece name="Spinner" /></div>
      <Piece name="Spinner" />
      <div className="tw:scale-125"><Piece name="Spinner" /></div>
      <Piece name="Button" isDisabled><Piece name="Spinner" /> 加载中</Piece>
    </DemoRow>
  )
}

function SwitchDemo() {
  return (
    <DemoStack>
      <ControlStateMatrix selected render={(state) => (
        <Piece name="Switch" aria-label={state} defaultSelected={state === 'selected'} isDisabled={state === 'disabled'} />
      )} />
      <DemoRow>
        <Piece name="Switch" aria-label="关闭" /> <span className="tw:text-sm">关闭</span>
        <Piece name="Switch" defaultSelected aria-label="开启" /> <span className="tw:text-sm">开启</span>
      </DemoRow>
    </DemoStack>
  )
}

function TableDemo() {
  // React Aria Table collection currently triggers a recoverable React 19 SSR
  // hydration error in Astro. Keep the workaround scoped to this demo so the
  // other 57 components retain normal SSR + hydration.
  return (
    <ClientMounted>
      <DemoStack>
        <Piece name="Table" aria-label="组件状态表">
          <Piece name="TableHeader">
            <Piece name="TableHead" id="component" isRowHeader>组件</Piece>
            <Piece name="TableHead" id="state">状态</Piece>
            <Piece name="TableHead" id="note">备注</Piece>
          </Piece>
          <Piece name="TableBody">
            <Piece name="TableRow" id="button"><Piece name="TableCell">Button</Piece><Piece name="TableCell">Default</Piece><Piece name="TableCell">普通行</Piece></Piece>
            <Piece name="TableRow" id="switch" data-state="selected"><Piece name="TableCell">Switch</Piece><Piece name="TableCell">Selected</Piece><Piece name="TableCell">选中行</Piece></Piece>
            <Piece name="TableRow" id="input"><Piece name="TableCell">Input</Piece><Piece name="TableCell">Invalid</Piece><Piece name="TableCell">悬停检查</Piece></Piece>
          </Piece>
        </Piece>
        <Piece name="TableCaption">组件状态表</Piece>
      </DemoStack>
    </ClientMounted>
  )
}

function TabsDemo() {
  return (
    <DemoStack>
      <Piece name="Tabs" defaultValue="a">
        <Piece name="TabsList">
          <Piece name="TabsTrigger" value="a">已选</Piece>
          <Piece name="TabsTrigger" value="b">未选</Piece>
          <Piece name="TabsTrigger" value="c" isDisabled>禁用</Piece>
        </Piece>
        <Piece name="TabsContent" value="a" className="tw:pt-3 tw:text-sm tw:text-muted-foreground">默认样式内容</Piece>
        <Piece name="TabsContent" value="b">第二页</Piece>
      </Piece>
      <Piece name="Tabs" defaultValue="a">
        <Piece name="TabsList" variant="line"><Piece name="TabsTrigger" value="a">Line A</Piece><Piece name="TabsTrigger" value="b">Line B</Piece></Piece>
        <Piece name="TabsContent" value="a" className="tw:pt-3 tw:text-sm tw:text-muted-foreground">线型 Tabs</Piece>
      </Piece>
    </DemoStack>
  )
}

function TextareaDemo() {
  return (
    <DemoStack>
      <Piece name="Textarea" placeholder="空值" />
      <Piece name="Textarea" defaultValue="已有多行内容。\n第二行用于检查行高。" />
      <Piece name="Textarea" disabled placeholder="禁用" />
      <Piece name="Textarea" aria-invalid="true" defaultValue="无效内容" />
    </DemoStack>
  )
}

function ToggleDemo() {
  return (
    <DemoStack>
      <ControlStateMatrix selected render={(state) => (
        <Piece name="Toggle" isSelected={state === 'selected'} isDisabled={state === 'disabled'} aria-label={state}>B</Piece>
      )} />
      <DemoRow>
        <Piece name="Toggle">默认</Piece>
        <Piece name="Toggle" defaultSelected>已选</Piece>
        <Piece name="Toggle" variant="outline">轮廓</Piece>
        <Piece name="Toggle" size="sm">SM</Piece>
        <Piece name="Toggle" size="lg">LG</Piece>
      </DemoRow>
    </DemoStack>
  )
}

function ToggleGroupDemo() {
  return (
    <DemoStack>
      <Piece name="ToggleGroup" selectionMode="single" defaultSelectedKeys={['center']} variant="outline" spacing={0}>
        <Piece name="ToggleGroupItem" id="left">左</Piece>
        <Piece name="ToggleGroupItem" id="center">中</Piece>
        <Piece name="ToggleGroupItem" id="right">右</Piece>
      </Piece>
      <Piece name="ToggleGroup" selectionMode="multiple" defaultSelectedKeys={['bold', 'underline']}>
        <Piece name="ToggleGroupItem" id="bold">B</Piece>
        <Piece name="ToggleGroupItem" id="italic">I</Piece>
        <Piece name="ToggleGroupItem" id="underline">U</Piece>
      </Piece>
    </DemoStack>
  )
}

function TooltipDemo() {
  return (
    <Piece name="TooltipProvider" delay={120}>
      <DemoRow>
        {['top', 'right', 'bottom', 'left'].map((side) => (
          <Piece key={side} name="Tooltip">
            <Piece name="TooltipTrigger" render={<Piece name="Button" variant="outline" />}>{side}</Piece>
            <Piece name="TooltipContent" side={side}>{side} tooltip</Piece>
          </Piece>
        ))}
      </DemoRow>
    </Piece>
  )
}

export const componentDemos: Record<string, React.ComponentType> = {
  accordion: AccordionDemo,
  alert: AlertDemo,
  'alert-dialog': AlertDialogDemo,
  'aspect-ratio': AspectRatioDemo,
  attachment: AttachmentDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  breadcrumb: BreadcrumbDemo,
  bubble: BubbleDemo,
  button: ButtonDemo,
  'button-group': ButtonGroupDemo,
  calendar: CalendarDemo,
  card: CardDemo,
  carousel: CarouselDemo,
  chart: ChartDemo,
  checkbox: CheckboxDemo,
  collapsible: CollapsibleDemo,
  combobox: ComboboxDemo,
  command: CommandDemo,
  'context-menu': ContextMenuDemo,
  dialog: DialogDemo,
  direction: DirectionDemo,
  drawer: DrawerDemo,
  'dropdown-menu': DropdownMenuDemo,
  empty: EmptyDemo,
  field: FieldDemo,
  'hover-card': HoverCardDemo,
  input: InputDemo,
  'input-group': InputGroupDemo,
  'input-otp': InputOTPDemo,
  item: ItemDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  marker: MarkerDemo,
  message: MessageDemo,
  'message-scroller': MessageScrollerDemo,
  'native-select': NativeSelectDemo,
  pagination: PaginationDemo,
  popover: PopoverDemo,
  progress: ProgressDemo,
  questionnaire: QuestionnaireDemo,
  'radio-group': RadioGroupDemo,
  resizable: ResizableDemo,
  'scroll-area': ScrollAreaDemo,
  select: SelectDemo,
  separator: SeparatorDemo,
  sheet: SheetDemo,
  sidebar: SidebarDemo,
  skeleton: SkeletonDemo,
  slider: SliderDemo,
  spinner: SpinnerDemo,
  switch: SwitchDemo,
  table: TableDemo,
  tabs: TabsDemo,
  textarea: TextareaDemo,
  toggle: ToggleDemo,
  'toggle-group': ToggleGroupDemo,
  tooltip: TooltipDemo,
}
