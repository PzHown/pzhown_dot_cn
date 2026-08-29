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

export default function ComponentShowcase() {
  const [segment, setSegment] = React.useState('all')
  const [tab, setTab] = React.useState('home')
  const [slider, setSlider] = React.useState(64)
  const [search, setSearch] = React.useState('')

  return (
    <div className="pzhown-ios27 ios27-demo-grid">
      <Card title="Buttons">
        <div className="demo-row">
          <Button>继续</Button>
          <Button variant="gray">次要操作</Button>
          <Button variant="tinted">Tinted</Button>
          <Button variant="glass">Liquid Glass</Button>
          <Button variant="plain">文字操作</Button>
          <Button variant="destructive">删除</Button>
        </div>
        <div className="demo-row demo-row--sizes">
          <Button size="small">Small 28</Button>
          <Button size="medium">Medium 36</Button>
          <Button size="large">Large 50</Button>
          <Button variant="glass" size="medium" iconOnly aria-label="添加">＋</Button>
        </div>
      </Card>

      <Card title="Real Optical Glass">
        <div className="demo-glass-stage">
          {refractionBackdrop}
          <LiquidGlassSurface
            material="large"
            refract={refractionBackdrop}
            behind="#5842d6"
            width={260}
            height={112}
            radius={28}
            className="demo-real-glass"
          >
            <strong>真实折射</strong>
            <span>SVG displacement + chromatic dispersion</span>
          </LiquidGlassSurface>
        </div>
        <p className="demo-muted">这个示例使用显式 refract 副本，因此 Safari / Firefox 也能看到位移折射；普通浮动组件在 Chrome / Edge 可直接折射 live DOM。</p>
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
              <DialogHeader><DialogTitle>确认操作</DialogTitle><DialogDescription>这是从零实现并接入真实折射引擎的 iOS 27 大型 Liquid Glass 对话框。</DialogDescription></DialogHeader>
              <DialogFooter><DialogClose><Button variant="gray">取消</Button></DialogClose><DialogClose><Button>确认</Button></DialogClose></DialogFooter>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger><Button variant="glass">Sheet</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>底部工作表</SheetTitle><SheetDescription>34px 顶部圆角、系统 Grabber 与真实光学材质层。</SheetDescription></SheetHeader>
              <ListSection><ListRow disclosure>编辑资料</ListRow><ListRow disclosure>通知设置</ListRow></ListSection>
              <SheetFooter><SheetClose><Button>完成</Button></SheetClose></SheetFooter>
            </SheetContent>
          </Sheet>
          <Popover>
            <PopoverTrigger><Button variant="glass">Popover</Button></PopoverTrigger>
            <PopoverContent><strong>Popover</strong><p className="demo-muted">Medium Liquid Glass + displacement engine。</p></PopoverContent>
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
          <Toolbar><ToolbarGroup><Button variant="plain" size="small">返回</Button></ToolbarGroup><ToolbarTitle>图库</ToolbarTitle><ToolbarGroup><Button variant="glass" size="small" iconOnly aria-label="更多">•••</Button></ToolbarGroup></Toolbar>
          <div className="demo-phone__content"><p>Toolbar 54px</p><p>Tab Bar 总高度 95px</p><p>Chrome / Edge：live DOM refraction</p></div>
          <TabBar value={tab} onValueChange={setTab}>
            <TabBarItem value="home" icon="⌂">首页</TabBarItem>
            <TabBarItem value="search" icon="⌕">搜索</TabBarItem>
            <TabBarItem value="profile" icon="◎" badge="3">我的</TabBarItem>
          </TabBar>
        </div>
      </Card>
    </div>
  )
}
