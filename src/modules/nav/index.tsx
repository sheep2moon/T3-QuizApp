import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Hamburger from "./components/Hamburger";
import MobileMenu from "./components/MobileMenu";

type NavProps = {
    name: string | undefined | null;
    image: string | undefined | null;
    status: string;
};

type navLink = {
    title: string;
    href: string;
};

const navLinks: navLink[] = [
    { title: "Kategorie", href: "/browse-categories" },
    { title: "Konto", href: "/" },
    { title: "Stwórz quiz", href: "/create-quiz" },
    { title: "Stwórz kategorie", href: "/create-category" },
    { title: "Quizy", href: "/quizzes" },
    { title: "Moje quizy", href: "/my-quizzes" }
];

const Nav = ({ name, image, status }: NavProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobile = () => setMobileOpen(false);
    return (
        <header className="fixed top-0 inset-x-0 h-16 shadow-sm bg-primary text-light shadow-slate-50/20 z-50 flex justify-between items-center px-4">
            <button className="small:hidden" onClick={() => setMobileOpen(o => !o)}>
                <Hamburger isOpen={mobileOpen} />
            </button>
            <div className="flex">
                <Link href="/">
                    <a>LOGO</a>
                </Link>
            </div>
            <div className="gap-2 hidden small:flex">
                {navLinks.map(link => (
                    <Link href={link.href} key={link.title}>
                        <a className="hover:text-secondary transition-all p-2">{link.title}</a>
                    </Link>
                ))}
            </div>
            <MobileMenu navLinks={navLinks} isOpen={mobileOpen} close={closeMobile} />
            {status === "loading" && <div>Loading...</div>}
            {status === "authenticated" && (
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center ">
                        <span className="text-lg font-semibold">{name}</span>
                        <button className="text-sm text-secondary" onClick={() => signOut()}>
                            Sign out
                        </button>
                    </div>
                    <div className=" relative w-10 h-10">
                        <div className="absolute inset-0 ring-1 ring-secondary  rounded-md" />
                        <Image src={image ?? ""} alt="awatar" layout="fill" className="rounded-lg " />
                    </div>
                </div>
            )}
            {status === "unauthenticated" && (
                <button className="border p-2 px-4 font-semibold hover:border-secondary rounded-md border-light" onClick={() => signIn()}>
                    Sign In
                </button>
            )}
        </header>
    );
};

export default Nav;
