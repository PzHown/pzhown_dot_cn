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
  type LiquidGlassOpticalOverrides,
} from '@pzhown/ui/react'
import { ArrowLeft, House, MoreHorizontal, Plus, Search, UserRound } from '@pzhown/ui/icons'

const Card = ({ title, children, wide = false }: { title: string; children: React.ReactNode; wide?: boolean }) => (
  <section className={`demo-card${wide ? ' demo-card--wide' : ''}`}>
    <h2>{title}</h2>
    {children}
  </section>
)

export const PALLAV_TUNER_DEFAULTS: LiquidGlassOpticalOverrides = {
  strength: 0.02,
  chromaticAberration: 0.2,
  blur: 3.0,
  depth: 10,
  curvature: 0.65,
  splay: 1,
  glow: 0.1,
  glowSpread: 1,
  glowExponent: 1.5,
  edgeHighlight: 0.25,
  edgeWidth: 3,
  edgeExponent: 1.5,
  specular: 1,
  specularAngle: 45,
  quality: 512,
}

type PallavOptionKey = keyof LiquidGlassOpticalOverrides
type PallavSliderKey = Exclude<PallavOptionKey, 'quality'>

type PallavSliderConfig = {
  key: PallavSliderKey
  label: string
  min: number
  max: number
  step: number
  decimals: number
}

const PALLAV_SLIDERS: PallavSliderConfig[] = [
  { key: 'strength', label: 'Strength', min: 0, max: 0.25, step: 0.005, decimals: 3 },
  { key: 'chromaticAberration', label: 'Chromatic Aberration', min: 0, max: 1, step: 0.01, decimals: 2 },
  { key: 'blur', label: 'Blur', min: 0, max: 12, step: 0.25, decimals: 2 },
  { key: 'depth', label: 'Depth', min: 0, max: 60, step: 1, decimals: 0 },
  { key: 'curvature', label: 'Curvature', min: 0, max: 1, step: 0.01, decimals: 2 },
  { key: 'splay', label: 'Splay', min: 0, max: 1, step: 0.01, decimals: 2 },
  { key: 'glow', label: 'Glow', min: 0, max: 1, step: 0.01, decimals: 2 },
  { key: 'glowSpread', label: 'Glow Spread', min: 0, max: 1, step: 0.01, decimals: 2 },
  { key: 'glowExponent', label: 'Glow Exponent', min: 0.5, max: 4, step: 0.1, decimals: 1 },
  { key: 'edgeHighlight', label: 'Edge Highlight', min: 0, max: 1, step: 0.01, decimals: 2 },
  { key: 'edgeWidth', label: 'Edge Width', min: 0, max: 12, step: 0.25, decimals: 2 },
  { key: 'edgeExponent', label: 'Edge Exponent', min: 0.5, max: 4, step: 0.1, decimals: 1 },
  { key: 'specular', label: 'Specular', min: 0, max: 2, step: 0.05, decimals: 2 },
  { key: 'specularAngle', label: 'Specular Angle', min: 0, max: 360, step: 1, decimals: 0 },
]

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

function PallavAgTuner({
  values,
  onValuesChange,
  globalOverride,
  onGlobalOverrideChange,
}: {
  values: LiquidGlassOpticalOverrides
  onValuesChange: (values: LiquidGlassOpticalOverrides) => void
  globalOverride: boolean
  onGlobalOverrideChange: (enabled: boolean) => void
}) {
  const mergedValues = { ...PALLAV_TUNER_DEFAULTS, ...values }
  const setValue = (key: PallavOptionKey, value: number) => {
    onValuesChange({ ...values, [key]: value })
  }

  return (
    <div className="demo-pallav-tuner">
      <div className="demo-pallav-tuner__header">
        <div>
          <strong>实时参数</strong>
          <p className="demo-muted">拖动后立即更新 preview；打开全局 override 后，当前 active 的 Dialog / Sheet / external Glass Engine 也会同步更新。</p>
        </div>
        <div className="demo-pallav-tuner__actions">
          <span className="demo-pallav-tuner__mode">{globalOverride ? 'GLOBAL OVERRIDE' : 'PREVIEW ONLY'}</span>
          <Switch checked={globalOverride} onCheckedChange={onGlobalOverrideChange} label="应用到全部 Glass" />
          <Button size="small" variant="gray" onClick={() => onValuesChange({ ...PALLAV_TUNER_DEFAULTS })}>恢复基准</Button>
        </div>
      </div>

      <div className="demo-pallav-tuner__grid">
        {PALLAV_SLIDERS.map((config) => {
          const fallback = Number(PALLAV_TUNER_DEFAULTS[config.key] ?? 0)
          const value = Number(mergedValues[config.key] ?? fallback)
          return (
            <Slider
              key={config.key}
              min={config.min}
              max={config.max}
              step={config.step}
              value={value}
              onValueChange={(next) => setValue(config.key, next)}
              label={config.label}
              valueLabel={value.toFixed(config.decimals)}
            />
          )
        })}
        <Select
          label="Quality"
          value={String(Number(mergedValues.quality ?? 512))}
          onChange={(event) => setValue('quality', Number(event.currentTarget.value))}
        >
          <option value="128">128</option>
          <option value="256">256</option>
          <option value="512">512</option>
          <option value="1024">1024</option>
        </Select>
      </div>

      <pre className="demo-pallav-tuner__json">{JSON.stringify(mergedValues, null, 2)}</pre>
    </div>
  )
}

export interface ComponentShowcaseProps {
  glassEnabled: boolean
  onGlassEnabledChange: (enabled: boolean) => void
  pallavOptions: LiquidGlassOpticalOverrides
  onPallavOptionsChange: (values: LiquidGlassOpticalOverrides) => void
  pallavGlobalOverride: boolean
  onPallavGlobalOverrideChange: (enabled: boolean) => void
}

export default function ComponentShowcase({
  glassEnabled,
  onGlassEnabledChange,
  pallavOptions,
  onPallavOptionsChange,
  pallavGlobalOverride,
  onPallavGlobalOverrideChange,
}: ComponentShowcaseProps) {
  const [segment, setSegment] = React.useState('all')
  const [tab, setTab] = React.useState('home')
  const [slider, setSlider] = React.useState(64)
  const [search, setSearch] = React.useState('')

  return (
    <div className="pzhown-ios27 ios27-demo-grid">
      <Card title="Appearance">
        <div className="demo-stack">
          <Switch
            checked={glassEnabled}
            onCheckedChange={onGlassEnabledChange}
            label="全局 Liquid Glass"
          />
          <p className="demo-muted">整个组件文档现在运行在 LiquidGlassViewport 中：source layer 与 Dialog / Sheet portal layer 同尺寸、同坐标系，但彼此是 sibling，浮层不会被自己的 SVG filter 再次折射。</p>
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

      <Card title="PallavAg Optical Lens · Live Tuner" wide>
        <div className="demo-pallav-layout">
          <div>
            <div className="demo-glass-stage">
              <LiquidGlassSurface
                material="large"
                {...pallavOptions}
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
            <p className="demo-muted">Preview 直接使用当前参数。默认基准以 PallavAg upstream 参数为基础，并保留项目当前 blur 3.0；几何 width / height / radius 不进入全局 override。</p>
          </div>
          <PallavAgTuner
            values={pallavOptions}
            onValuesChange={onPallavOptionsChange}
            globalOverride={pallavGlobalOverride}
            onGlobalOverrideChange={onPallavGlobalOverrideChange}
          />
        </div>
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
              <DialogHeader><DialogTitle>确认操作</DialogTitle><DialogDescription>Dialog 使用 viewport-sized external live DOM；打开 PallavAg Live Tuner 的全局 override 后，可以边开 Dialog 边实时调全部 optical 参数。</DialogDescription></DialogHeader>
              <DialogFooter><DialogClose><Button variant="gray">取消</Button></DialogClose><DialogClose><Button>确认</Button></DialogClose></DialogFooter>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger><Button variant="glass">Sheet</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>底部工作表</SheetTitle><SheetDescription>Sheet 与 source 共用同一个 viewport 坐标根；实时调参会直接调用当前 external Engine 的 setOptions。</SheetDescription></SheetHeader>
              <ListSection><ListRow disclosure>编辑资料</ListRow><ListRow disclosure>通知设置</ListRow></ListSection>
              <SheetFooter><SheetClose><Button>完成</Button></SheetClose></SheetFooter>
            </SheetContent>
          </Sheet>
          <Popover>
            <PopoverTrigger><Button variant="glass">Popover</Button></PopoverTrigger>
            <PopoverContent><strong>Popover</strong><p className="demo-muted">Popover 位于 source tree 内，使用 iOS 材质而不自我过滤。</p></PopoverContent>
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
  )
}
