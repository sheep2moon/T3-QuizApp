import Image from "next/image";
import React, { useEffect } from "react";
import { getCategoryImageUrl } from "../utils/getImageUrl";
import { trpc } from "../utils/trpc";

const BrowseCategories = () => {
    const categories = trpc.useQuery(["quizzes.getCategories"]);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    return (
        <div className="shadow-lg small:p-4 shadow-black rounded-lg">
            <h2 className="text-2xl mb-6 text-center">Przeglądaj kategorie</h2>
            <div className="grid gap-1 small:gap-2 grid-cols-2 small:grid-cols-4">
                {categories.isSuccess &&
                    categories.data.map(category => (
                        <div key={category.id} className="flex flex-col items-center bg-light rounded-md p-1 justify-between">
                            <span className="text-primary text-center text- font-semibold text-sm small:text-lg">{category.name}</span>
                            <Image src={getCategoryImageUrl(category.imageId)} width="200px" height="200px" alt="kategoria" className="rounded-b-md" />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BrowseCategories;
