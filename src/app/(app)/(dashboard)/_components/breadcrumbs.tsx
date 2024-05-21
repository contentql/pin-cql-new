'use client'

import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import { HomeIcon } from '@/app/(app)/(dashboard)/_components/icons'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  maxLength?: number
  dropdownRoutes?: { route: string; items: { id: string; name: string }[] }[]
  includeSegments?: string[]
  excludeSegmentsLinks?: string[]
}

const Breadcrumbs: React.FC<Props> = props => {
  const {
    maxLength = 3,
    dropdownRoutes,
    includeSegments,
    excludeSegmentsLinks,
  } = props

  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)

  const getDropdownItems = (segment: string, href: string) => {
    const dropdownRoute = dropdownRoutes?.find(dr => dr.route === segment)
    return dropdownRoute?.items.map((item, index) => (
      <Link
        key={`${segment}-${item.id}`}
        href={`${href}/${item.id}`}
        className='hover:underline'>
        <DropdownMenuItem className='capitalize'>{item.name}</DropdownMenuItem>
      </Link>
    ))
  }

  const breadcrumbItems = segments
    .map((segment, index) => {
      const isLast = index === segments.length - 1
      const href = `/${segments.slice(0, index + 1).join('/')}`
      const dropdownItems = getDropdownItems(segment, href)

      return (
        <BreadcrumbItem key={segment} className='capitalize'>
          {isLast ? (
            <BreadcrumbPage>{segment}</BreadcrumbPage>
          ) : excludeSegmentsLinks?.includes(segment) ? (
            <p className='cursor-not-allowed'>{segment}</p>
          ) : dropdownItems?.length ? (
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center gap-1.5 capitalize'>
                {segment}
                <ChevronDownIcon className='h-5 w-5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-fit'>
                {dropdownItems}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <BreadcrumbLink href={href} className='hover:underline'>
              {segment}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      )
    })
    ?.filter(breadcrumbItem =>
      includeSegments?.length
        ? includeSegments?.includes(breadcrumbItem?.key || '')
        : true,
    )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/dashboard'>
            <HomeIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbItems.length > maxLength && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  <BreadcrumbEllipsis className='h-4 w-4' />
                  <span className='sr-only'>Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {breadcrumbItems
                    .splice(0, breadcrumbItems.length - maxLength)
                    .map(breadcrumbItem => (
                      <DropdownMenuItem key={breadcrumbItem.key}>
                        {breadcrumbItem}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {breadcrumbItems.map((breadcrumbItem, index) => {
          return (
            <Fragment key={breadcrumbItem.key}>
              {breadcrumbItem}
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
