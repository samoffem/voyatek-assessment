'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './sidebar.module.css'

const Sidebar = () => {
    const pathname = usePathname()
  return (
   <section className={`${styles['side-bar']}`}>
        <nav className={`${styles['side-nav']}`}>
            <h2>Settings</h2>
            <div className={styles['links-container']}>

                {sidebarLinks.map(item=>{
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return(
                    <Link 
                        key={item.label}
                        href={item.route}
                        className={styles['sidebar-link']}
                    >
                        <div className="relative size-6">
                            <Image 
                                src={item.imgURL}
                                alt={item.label}
                                fill
                                //className={cn({'brightness-[3] invert-0': isActive})}
                                className=''
                            />
                        </div>
                        <p 
                            //className={cn('sidebar-label text-nowrap', {'!text-white': isActive})}
                            className='sidebar-label'
                        >
                            {item.label}
                        </p>
                    </Link>
                    )
                })}
            </div>

            <div className='mt-auto flex items-center justify-center w-full'>
                <button className='flex gap-1 border-black-100 border p-3 rounded'>
                    <Image 
                        src='/icons/signout.svg'
                        width={20}
                        height={20}
                        alt='signout'
                    />
                    <span>Back to Dashboard</span>
                </button>
            </div>
        </nav>
   </section>
  )
}

export default Sidebar