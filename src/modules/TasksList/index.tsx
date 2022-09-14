import { List } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Button from "../common/Button";

type ListProps = {
    list: List;
    deleteList: (id: string) => void;
};

const TasksList = ({ list, deleteList }: ListProps) => {
    console.log(list);

    return (
        <div className="grid grid-cols-[4fr_1fr_1fr] gap-1">
            <Link href={`/lists/${list.id}`}>
                <a>{list.name}</a>
            </Link>
            <Button>Edit</Button>
            <Button onClick={() => deleteList(list.id)}>Delete</Button>
        </div>
    );
};

export default TasksList;
