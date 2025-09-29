import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { memo } from 'react'

interface BreadcrumbHeaderProps {
  title: string
  items: string[]
}

const BreadcrumbHeader = ({ title, items }: BreadcrumbHeaderProps) => {
  return (
    <Stack spacing={1.5} className='text-slate-900'>
      <Typography variant='h5' fontWeight={700} className='text-slate-900'>
        {title}
      </Typography>
      <Breadcrumbs separator='/' aria-label='breadcrumb' className='text-sm text-slate-500' classes={{ separator: 'text-slate-300' }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          if (isLast) {
            return (
              <Typography key={item} className='font-medium text-slate-700'>
                {item}
              </Typography>
            )
          }
          return (
            <Link key={item} color='inherit' underline='hover' href='#' className='text-slate-500'>
              {item}
            </Link>
          )
        })}
      </Breadcrumbs>
    </Stack>
  )
}

export default memo(BreadcrumbHeader)

