import Image from 'next/image'
import styles from './Header.module.css'
import { Input } from "@/components/ui/input"
import Link from 'next/link'


const Header = () => {
  return (
    <section className={`flex justify-between items-center px-5 ${styles['container']}`}>

      <div className={`flex w-1/2 gap-3 items-center ${styles["left"]}`}>
        <Image 
          src='/icons/logo.svg'
          width={50}
          height={50}
          alt="logo"
        />
        <div className={`flex flex-1 gap-2 px-3 rounded bg-[#F0F2F5] ${styles['input-wrap']}`}>
          <Image 
            src='/icons/searchIcon.svg'
            width={20}
            height={20}
            alt='search'
          />
          <Input  type="text" placeholder="Search here" className={`border-none flex-1 bg-inherit ${styles['input']}`} />
        </div>
      </div>

      <div className={`flex gap-3 ${styles['right-nav']}`}>

        <Link href='/' className={`header-right-nav-link styles['navigation']`}>
          <Image 
            src='/icons/notification.svg'
            width={20}
            height={20}
            alt="notification"
          />
          <p className='header-text'>Notifications</p>
        </Link>
        <Link href='/' className='header-right-nav-link'>
          <Image 
            src='/icons/wallet.svg'
            width={20}
            height={20}
            alt="notification"
          />
          <p className='header-text'>Wallet</p>
        </Link>
        <Link href='/' className='header-right-nav-link'>
          <Image 
            src='/icons/inquiries.svg'
            width={20}
            height={20}
            alt="notification"
          />
          <p className='header-text'>Inquiries</p>
        </Link>
        <Link href='/' className='header-right-nav-link'>
          <Image 
            src='/icons/gear.svg'
            width={20}
            height={20}
            alt="notification"
          />
          <p className='header-text'>Settings</p>
        </Link>

        <div className={styles['profile-img']}>
            
        </div>

      </div>

    </section>
  )
}

export default Header