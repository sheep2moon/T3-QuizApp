import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    { title: "Stwórz quiz", href: "/create-quiz" },
    { title: "Stwórz kategorie", href: "/create-category" }
];

const Nav = ({ name, image, status }: NavProps) => {
    return (
        <header className="h-16 shadow-sm shadow-slate-50/20 flex justify-between items-center px-4">
            <div className="gap-2 hidden small:flex">
                {navLinks.map(link => (
                    <Link href={link.href} key={link.title}>
                        <a className="hover:text-secondary transition-all p-2">{link.title}</a>
                    </Link>
                ))}
            </div>
            {status === "loading" && <div>Loading...</div>}
            {status === "authenticated" && (
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center ">
                        <span className="text-lg font-semibold">{name}</span>
                        <button className="text-sm text-secondary" onClick={() => signOut()}>
                            Sign out
                        </button>
                    </div>
                    <Image src={image ?? ""} alt="awatar" width="40px" height="40px" className="rounded-lg" />
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
