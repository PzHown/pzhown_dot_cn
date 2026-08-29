'use client'

import * as React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Combobox,
  CommandPalette,
  DataTable,
  DateRangePicker,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  FormField,
  Pagination,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToastProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useToast,
  type DataTableColumn,
} from '@pzhown/ui/react'

type DemoRow = { id: number; name: string; status: string; owner: string }

const rows: DemoRow[] = [
  { id: 1, name: '日本签证内容页', status: '已发布', owner: 'PzHown' },
  { id: 2, name: '首页 Hero', status: '草稿', owner: 'Editor' },
  { id: 3, name: '媒体资源库', status: '已发布', owner: 'PzHown' },
]

const columns: DataTableColumn<DemoRow>[] = [
  { id: 'name', header: '名称', sortable: true, cell: (row) => <strong>{row.name}</strong> },
  { id: 'status', header: '状态', cell: (row) => row.status },
  { id: 'owner', header: '负责人', cell: (row) => row.owner },
]

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="demo-card"><h2>{title}</h2>{children}</section>
}

function FoundationDemoInner() {
  const { toast } = useToast()
  const [tab, setTab] = React.useState('overview')
  const [page, setPage] = React.useState(1)
  const [selected, setSelected] = React.useState<Set<React.Key>>(new Set([1]))
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [compact, setCompact] = React.useState(false)

  return (
    <div className="pzhown-ios27 ios27-demo-grid">
      <Card title="Tooltip · Dropdown · Tabs">
        <div className="demo-stack">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">后台</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>
              <BreadcrumbItem><BreadcrumbLink href="#">内容</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>
              <BreadcrumbItem><BreadcrumbPage>文章</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="demo-row">
            <Tooltip>
              <TooltipTrigger><Button variant="glass" iconOnly aria-label="更多操作">•••</Button></TooltipTrigger>
              <TooltipContent>更多操作</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger><Button variant="glass">操作菜单</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>文章</DropdownMenuLabel>
                <DropdownMenuItem shortcut="⌘E">编辑</DropdownMenuItem>
                <DropdownMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>紧凑模式</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>删除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="activity">活动</TabsTrigger>
              <TabsTrigger value="settings">设置</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><p className="demo-muted">Tabs 使用系统 Surface 和 selected state，不叠加 Liquid Glass。</p></TabsContent>
            <TabsContent value="activity"><p className="demo-muted">活动视图。</p></TabsContent>
            <TabsContent value="settings"><p className="demo-muted">设置视图。</p></TabsContent>
          </Tabs>
        </div>
      </Card>

      <Card title="Toast · AlertDialog · Command">
        <div className="demo-row">
          <Button onClick={() => toast({ title: '已保存', description: '更改已同步到服务器。', variant: 'success', actionLabel: '撤销' })}>显示 Toast</Button>
          <AlertDialog>
            <AlertDialogTrigger><Button variant="destructive">删除内容</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>永久删除这条内容？</AlertDialogTitle>
                <AlertDialogDescription>删除后无法恢复。相关草稿和引用不会自动重建。</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel><Button variant="gray">取消</Button></AlertDialogCancel>
                <AlertDialogAction onAction={() => toast({ title: '已删除', variant: 'destructive' })}><Button variant="destructive">永久删除</Button></AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="glass" onClick={() => setCommandOpen(true)}>打开 Command Palette</Button>
        </div>
        <CommandPalette
          open={commandOpen}
          onOpenChange={setCommandOpen}
          items={[
            { id: 'home', label: '前往首页', description: '打开公开站首页', shortcut: 'G H', icon: '⌂', onSelect: () => toast({ title: '命令已执行', description: '前往首页' }) },
            { id: 'content', label: '新建内容', description: '创建新的 CMS 条目', shortcut: 'N', icon: '＋', onSelect: () => toast({ title: '准备新建内容' }) },
            { id: 'media', label: '打开媒体库', description: '浏览图片和附件', icon: '▧' },
          ]}
        />
      </Card>

      <Card title="FormField · Combobox · Date Range">
        <div className="demo-stack">
          <FormField label="内部标题" description="只用于后台识别，不显示在公开页面。" required>
            <input className="ios27-date-input" placeholder="输入标题" />
          </FormField>
          <FormField label="分类">
            <Combobox
              clearable
              options={[
                { value: 'visa', label: '签证', description: '签证与出入境内容' },
                { value: 'travel', label: '旅行', description: '目的地与攻略' },
                { value: 'tech', label: '技术', description: '开发与工程记录' },
              ]}
            />
          </FormField>
          <DateRangePicker />
        </div>
      </Card>

      <Card title="DataTable · Pagination">
        <div className="demo-stack">
          <DataTable
            columns={columns}
            data={rows}
            getRowKey={(row) => row.id}
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectedKeysChange={setSelected}
            stickyHeader
          />
          <Pagination page={page} totalPages={12} onPageChange={setPage} />
        </div>
      </Card>

      <Card title="Sidebar">
        <div style={{ height: 360, overflow: 'hidden', borderRadius: 18, border: '.5px solid var(--separator)', display: 'flex' }}>
          <Sidebar compact={compact}>
            <SidebarHeader><strong>PzHown Admin</strong></SidebarHeader>
            <SidebarContent>
              <SidebarSection title="工作区">
                <SidebarItem icon="⌂" current>概览</SidebarItem>
                <SidebarItem icon="▤" trailing="12">内容</SidebarItem>
                <SidebarItem icon="▧">媒体</SidebarItem>
              </SidebarSection>
              <SidebarSection title="系统">
                <SidebarItem icon="⚙">设置</SidebarItem>
              </SidebarSection>
            </SidebarContent>
            <SidebarFooter><Button size="small" variant="plain" onClick={() => setCompact((value) => !value)}>{compact ? '展开' : '收起'}</Button></SidebarFooter>
          </Sidebar>
          <div style={{ flex: 1, padding: 24, color: 'var(--label-secondary)' }}>Sidebar 使用普通系统 Material，而不是强折射玻璃。</div>
        </div>
      </Card>

      <Card title="Empty State">
        <EmptyState
          icon="⌕"
          title="没有匹配的内容"
          description="调整筛选条件，或创建新的内容条目。"
          action={<Button>新建内容</Button>}
          secondaryAction={<Button variant="plain">清除筛选</Button>}
        />
      </Card>
    </div>
  )
}

export default function FoundationShowcase() {
  return <ToastProvider><FoundationDemoInner /></ToastProvider>
}
