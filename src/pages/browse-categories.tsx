import Image from "next/image";
import React, { useEffect } from "react";
import Container from "../modules/common/Container";
import { getCategoryImageUrl } from "../utils/getImageUrl";
import { trpc } from "../utils/trpc";

const BrowseCategories = () => {
    const categories = trpc.useQuery(["quizzes.getCategories"]);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    return (
        <Container>
            <h2 className="text-2xl my-2 text-center">Przeglądaj kategorie</h2>
            <div className="grid gap-1 small:gap-2 grid-cols-2 small:grid-cols-4">
                {categories.isSuccess &&
                    categories.data.map(category => (
                        <div key={category.id} className="flex flex-col items-center bg-light/10 rounded-md p-4 justify-between">
                            <span className="text-light text-center text- font-semibold text-sm small:text-lg mb-1">{category.name}</span>
                            <Image src={getCategoryImageUrl(category.imageId)} width="200px" height="200px" alt="kategoria" className="rounded-b-md" />
                        </div>
                    ))}
            </div>
        </Container>
    );
};

export default BrowseCategories;
