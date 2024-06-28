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
        <div className={`border border-[#e4e7ec] ${styles['inner-wrap']}`}>
            <nav className={`${styles['side-nav']}`}>
                <h2>Settings</h2>
                <div className={styles['links-container']}>

                    {sidebarLinks.map(item=>{
                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                        return(
                        <Link 
                            key={item.label}
                            href={item.route}
                            className={`cursor-pointer text-[#94a3b8] text-[12px] hover:text-blue-600 font-semibold ${styles['sidebar-link']}`}
                        >
                            <div className="relative size-6">
                                <Image 
                                    src={item.imgURL}
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                    //className={cn({' invert-0': isActive})}
                                   
                                    
                                />
                            </div>
                            <p 
                                //className={cn('sidebar-label text-nowrap', {'!text-white': isActive})}
                                className=''
                            >
                                {item.label}
                            </p>
                        </Link>
                        )
                    })}
                </div>

                <div className='mt-auto w-full'>
                    <button className='flex gap-1 border-[#475569] border p-3 rounded'>
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
        </div>
   </section>
  )
}

export default Sidebar