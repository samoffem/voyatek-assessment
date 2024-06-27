
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from './layout.module.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = {
    firstName: 'Samuel',
    lastName: 'Offem'
  }
  return (
   <main className={styles['container']}>
        <section className={styles['header-section']}>
            <Header />
        </section>
        <section className={styles['bottom']}>
            <Sidebar  />
            <div className={styles['children']}>
                {children}
            </div>
        </section>
   </main>
  );
}