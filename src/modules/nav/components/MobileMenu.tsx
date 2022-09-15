import clsx from "clsx";
import Link from "next/link";
import React from "react";

type MobileMenuProps = {
    navLinks: { title: string; href: string }[];
    close: () => void;
    isOpen: boolean;
};

const MobileMenu = ({ navLinks, isOpen, close }: MobileMenuProps) => {
    return (
        <div className={clsx("fixed top-16 inset-x-0 bottom-0 bg-gradient-to-br from-primary to-indigo-900 z-50 p-2 transition", { "translate-x-0": isOpen, "translate-x-full": !isOpen })} onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-4 justify-center h-full">
                {navLinks.map(link => (
                    <Link href={link.href} key={link.title}>
                        <a onClick={close} className="text-2xl hover:border-b">
                            {link.title}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MobileMenu;
