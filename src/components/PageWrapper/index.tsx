import Head from 'next/head'
import styles from './PageWrapper.module.css'
import { ReactNode } from 'react';

type PageItem = {
    title: string
    description: string
    children: ReactNode
}
export default function PageWrapper({title, description, children}:PageItem) {
    return (
        <>
            <Head>
                <title>To Do App | {title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </main>

            <footer className={styles.footer}>
                
            </footer>
        </>
    );
}