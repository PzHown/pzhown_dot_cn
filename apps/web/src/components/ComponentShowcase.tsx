'use client'

import * as React from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  ContextMenu,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  IconButton,
  LiquidGlassProvider,
  LiquidGlassSurface,
  ListRow,
  ListSection,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  SearchBar,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  TabBar,
  TabBarItem,
  Textarea,
  TextField,
  Toggle,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from '@pzhown/ui/react'
import { ArrowLeft, House, MoreHorizontal, Plus, Search, UserRound } from '@pzhown/ui/icons'

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="demo-card">
    <h2>{title}</h2>
    {children}
  </section>
)

const refractionBackdrop = (
  <div className="demo-refraction-source" aria-hidden="true">
    <span>LIQUID</span>
    <i />
    <span>GLASS</span>
  </div>
)

function ExternalGlassControlsDemo({ enabled }: { enabled: boolean }) {
  const sourceRef = React.useRef<HTMLDivElement>(null)
  return (
    <LiquidGlassProvider enabled={enabled} sourceRef={sourceRef}>
      <div className="demo-external-glass-controls">
        <div ref={sourceRef} className="demo-external-glass-controls__source" aria-hidden="true">
          <span>LIVE DOM</span>
          <i />
          <b>REFRACTION</b>
        </div>
        <div className="demo-external-glass-controls__layer">
          <Button variant="glass">External Glass</Button>
          <IconButton icon={MoreHorizontal} label="更多" variant="glass" />
        </div>
      </div>
    </LiquidGlassProvider>
  )
}

export default function ComponentShowcase() {
  const [segment, setSegment] = React.useState('all')
  const [tab, setTab] = React.useState('home')
  const [slider, setSlider] = React.useState(64)
  const [search, setSearch] = React.useState('')
  const [glassEnabled, setGlassEnabled] = React.useState(true)
  const glassSourceRef = React.useRef<HTMLDivElement>(null)

  return (
    <LiquidGlassProvider
      enabled={glassEnabled}
      onEnabledChange={setGlassEnabled}
      sourceRef={glassSourceRef}
    >
      <div ref={glassSourceRef} className="pzhown-ios27 ios27-demo-source-shell" data-liquid-glass-source="demo">
        <div className="ios27-demo-grid">
          <Card title="Appearance">
            <div className="demo-stack">
              <Switch
                checked={glassEnabled}
                onCheckedChange={setGlassEnabled}
                label="全局 Liquid Glass"
              />
              <p className="demo-muted">开启时，Portal 浮层引用覆盖整个展示视口宽度的 live DOM source；只有 target 完整落在 source box 内才启动 PallavAg optical engine。</p>
            </div>
          </Card>

          <Card title="Buttons">
            <div className="demo-row">
              <Button>继续</Button>
              <Button variant="gray">次要操作</Button>
              <Button variant="tinted">Tinted</Button>
              <Button variant="glass">Small Glass fallback</Button>
              <Button variant="plain">文字操作</Button>
              <Button variant="destructive">删除</Button>
            </div>
            <div className="demo-row demo-row--sizes">
              <Button size="small">Small 28</Button>
              <Button size="medium">Medium 36</Button>
              <Button size="large">Large 50</Button>
            </div>
            <div className="demo-row">
              <IconButton icon={Plus} label="添加" size="small" />
              <IconButton icon={Search} label="搜索" variant="gray" />
              <IconButton icon={MoreHorizontal} label="更多" variant="glass" />
              <IconButton icon={UserRound} label="账户" size="large" variant="tinted" />
            </div>
            <ExternalGlassControlsDemo enabled={glassEnabled} />
            <p className="demo-muted">真正的 external Glass Button 必须位于 filtered source 之外：背景 live DOM 是 source layer，胶囊/圆形按钮在独立 control layer。按钮如果属于 source 自己，只使用 Small Glass fallback，绝不自我折射。</p>
          </Card>

          <Card title="PallavAg Optical Lens">
            <div className="demo-glass-stage">
              <LiquidGlassSurface
                material="large"
                x={0.5}
                y={0.5}
                width={230}
                height={110}
                radius={36}
                draggable
                style={{ minHeight: 250, overflow: 'hidden', borderRadius: 24 }}
              >
                <div style={{ position: 'relative', minHeight: 250 }}>
                  {refractionBackdrop}
                </div>
              </LiquidGlassSurface>
            </div>
            <p className="demo-muted">这个示例仍展示 PallavAg 的 local live-DOM lens；Dialog / Sheet / Context Menu 则使用 Provider 的 external live-DOM source。</p>
          </Card>

          <Card title="Fields">
            <div className="demo-stack">
              <TextField label="姓名" placeholder="输入姓名" description="标准 iOS 27 TextField 结构" />
              <TextField label="邮箱" defaultValue="hello@example.com" error="示例错误状态" />
              <Textarea label="备注" placeholder="输入更多内容" description="Textarea 与字段状态使用同一套系统语法" />
              <Select label="送达方式" defaultValue="express">
                <option value="express">快速送达</option>
                <option value="standard">标准送达</option>
                <option value="pickup">到店自取</option>
              </Select>
              <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索" onCancel={() => setSearch('')} />
            </div>
          </Card>

          <Card title="Selection">
            <div className="demo-stack">
              <div className="demo-row"><Switch defaultChecked label="自动更新" /><Toggle defaultPressed>粗体</Toggle></div>
              <Checkbox defaultChecked label="同步到 iCloud" description="使用原生 checkbox 语义" />
              <RadioGroup defaultValue="system" legend="外观">
                <Radio value="light" label="浅色" />
                <Radio value="dark" label="深色" />
                <Radio value="system" label="跟随系统" />
              </RadioGroup>
              <SegmentedControl value={segment} onValueChange={setSegment}>
                <SegmentedControlItem value="all">全部</SegmentedControlItem>
                <SegmentedControlItem value="photos">照片</SegmentedControlItem>
                <SegmentedControlItem value="files">文件</SegmentedControlItem>
              </SegmentedControl>
              <Slider min={0} max={100} value={slider} onValueChange={setSlider} label="透明度" valueLabel={`${slider}%`} />
            </div>
          </Card>

          <Card title="Identity & Status">
            <div className="demo-stack">
              <div className="demo-row">
                <Avatar fallback="P" />
                <Avatar size="large" fallback="HZ" />
                <Badge variant="blue">新功能</Badge>
                <Badge variant="green">已完成</Badge>
                <Badge variant="orange">待处理</Badge>
                <Badge variant="red">错误</Badge>
              </div>
              <Progress value={72} label="同步进度" valueLabel="72%" />
              <div className="demo-row"><Spinner size="small" /><Spinner /><Spinner size="large" /></div>
              <Skeleton shape="text" style={{ width: '74%' }} />
              <Skeleton style={{ height: 64 }} />
            </div>
          </Card>

          <Card title="Lists">
            <ListSection title="设置" footer="iOS 27 的常规 List Row 高度为 52px。">
              <ListRow leading="◉" trailing={<Switch defaultChecked aria-label="无线局域网" />}>无线局域网</ListRow>
              <ListRow leading="◌" detail="PzHown" disclosure>个人资料</ListRow>
              <ListRow leading="◇" trailing="12 GB">存储空间</ListRow>
            </ListSection>
          </Card>

          <Card title="Overlays">
            <div className="demo-row">
              <Dialog>
                <DialogTrigger><Button variant="glass">Dialog</Button></DialogTrigger>
                <DialogContent aria-label="确认操作">
                  <DialogHeader><DialogTitle>确认操作</DialogTitle><DialogDescription>折射源使用与浮层几何对齐的外部 live DOM；如果 source 无法完整覆盖 Dialog，会自动退回稳定 Glass，不再把 lens clamp 到边缘。</DialogDescription></DialogHeader>
                  <DialogFooter><DialogClose><Button variant="gray">取消</Button></DialogClose><DialogClose><Button>确认</Button></DialogClose></DialogFooter>
                </DialogContent>
              </Dialog>
              <Sheet>
                <SheetTrigger><Button variant="glass">Sheet</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader><SheetTitle>底部工作表</SheetTitle><SheetDescription>Sheet 同样由 external live DOM 驱动 optical refraction。</SheetDescription></SheetHeader>
                  <ListSection><ListRow disclosure>编辑资料</ListRow><ListRow disclosure>通知设置</ListRow></ListSection>
                  <SheetFooter><SheetClose><Button>完成</Button></SheetClose></SheetFooter>
                </SheetContent>
              </Sheet>
              <Popover>
                <PopoverTrigger><Button variant="glass">Popover</Button></PopoverTrigger>
                <PopoverContent><strong>Popover</strong><p className="demo-muted">Popover 仍位于 source tree 内，因此使用 iOS 材质而不自我过滤。</p></PopoverContent>
              </Popover>
            </div>
            <ContextMenu items={[{ label: '复制' }, { label: '分享…' }, { label: '删除', destructive: true }]}>
              <div className="demo-context-target">右键打开 Context Menu</div>
            </ContextMenu>
          </Card>

          <Card title="Feedback">
            <div className="demo-stack">
              <Alert title="同步完成" variant="success">所有内容已是最新状态。</Alert>
              <Alert title="需要注意" variant="warning">这个操作会改变当前布局。</Alert>
              <Alert title="无法保存" variant="destructive">请检查网络后重试。</Alert>
            </div>
          </Card>

          <Card title="iOS 27 Chrome">
            <div className="demo-phone">
              <Toolbar>
                <ToolbarGroup><IconButton icon={ArrowLeft} label="返回" variant="plain" size="small" /></ToolbarGroup>
                <ToolbarTitle>图库</ToolbarTitle>
                <ToolbarGroup><IconButton icon={MoreHorizontal} label="更多" variant="glass" size="small" /></ToolbarGroup>
              </Toolbar>
              <div className="demo-phone__content"><p>Toolbar 54px</p><p>Tab Bar 总高度 95px</p><p>全局/局部均可关闭 Liquid Glass</p></div>
              <TabBar value={tab} onValueChange={setTab}>
                <TabBarItem value="home" icon={<House size={22} />}>首页</TabBarItem>
                <TabBarItem value="search" icon={<Search size={22} />}>搜索</TabBarItem>
                <TabBarItem value="profile" icon={<UserRound size={22} />} badge="3">我的</TabBarItem>
              </TabBar>
            </div>
          </Card>
        </div>
      </div>
    </LiquidGlassProvider>
  )
}
