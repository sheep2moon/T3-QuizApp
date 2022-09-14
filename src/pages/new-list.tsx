import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../modules/common/Button";
import InputText from "../modules/common/InputText";
import Tabs from "../modules/common/Tabs";
import { trpc } from "../utils/trpc";

const NewList = () => {
    // const listMutation = trpc.useMutation(["tasks.createList"]);
    // const router = useRouter();
    // const [listName, setListName] = useState("");
    // const [listType, setListType] = useState("");

    // const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     // const { value, name } = e.target;
    //     // setNewList(prev => ({ ...prev, [name]: value }));
    //     setListName(e.target.value);
    // };

    // const handleCreateList = async () => {
    //     const res = await listMutation.mutateAsync({ name: listName, type: listType });
    //     if (res.id) {
    //         router.push(`/lists/${res.id}`);
    //     }
    // };

    return (
        <div className="flex flex-col gap-4">
            {/* <InputText placeholder="Study" label="New list name" onChange={onInputChange} value={listName} />
            <Tabs
                value={listType}
                setValue={setListType}
                options={[
                    { name: "Simple", value: "simple" },
                    { name: "Routine", value: "routine" }
                ]}
                label="Type"
            />
            <Button onClick={handleCreateList} disabled={listMutation.isLoading}>
                Create
            </Button> */}
        </div>
    );
};

export default NewList;
