import { List } from "@prisma/client";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import TasksList from "../modules/TasksList";
import { trpc } from "../utils/trpc";

const TaskLists = () => {
    // const lists = trpc.useQuery(["tasks.getLists"]);
    // const deleteList = trpc.useMutation(["tasks.deleteList"]);

    // const handleListDelete = async (id: string) => {
    //     await deleteList.mutateAsync({ id });
    //     lists.refetch();
    // };

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Your lists</h1>
            {/* <div className="flex flex-col">
                {lists.isLoading && <div>Loading</div>}
                <div className="flex flex-col gap-1 items-start">{lists.isSuccess && lists.data.map(list => <TasksList key={list.id} list={list} deleteList={handleListDelete} />)}</div>
            </div> */}
        </div>
    );
};

export default TaskLists;
