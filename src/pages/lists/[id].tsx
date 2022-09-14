import { List, Prisma, Task } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../modules/common/Button";
import InputNumber from "../../modules/common/InputNumber";
import InputText from "../../modules/common/InputText";
import Modal from "../../modules/common/Modal";
import Tabs from "../../modules/common/Tabs";
import SingleTask from "../../modules/Task";
import { trpc } from "../../utils/trpc";

const SingleList = () => {
    const { query } = useRouter();
    const id = query.id as string;
    const list = trpc.useQuery(["tasks.getListById", { id }]);

    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [newTaskData, setNewTaskData] = useState({ title: "", listId: id, type: "checkbox", step: 1, target: 5 });
    const newTaskMutation = trpc.useMutation(["tasks.createTask"]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateTask = async () => {
        const { listId, title, type, step, target } = newTaskData;
        await newTaskMutation.mutateAsync({ listId, title, type, step, target });
        list.refetch();
        setTaskModalOpen(false);
    };

    useEffect(() => {
        console.log(list.data);
    }, [list]);

    if (list.isLoading) return <div>Loading</div>;
    return (
        <>
            {/* <div>
                <h1>List</h1>
                <div>{list.data?.name}</div>
                <Button variant="secondary" onClick={() => setTaskModalOpen(true)}>
                    Add Task
                </Button>
                <div className="flex">
                    {list.data?.tasks.map(task => (
                        <SingleTask key={task.id} task={task} />
                    ))}
                </div>
            </div> */}

            <Modal open={taskModalOpen} setIsOpen={setTaskModalOpen}>
                <div className="flex flex-col gap-2 w-full small:w-96 ">
                    <h1>task Modal content</h1>
                    <InputText name="title" label="Title" value={newTaskData.title} onChange={handleInputChange} />
                    <Tabs
                        label="Type"
                        options={[
                            { name: "Checkbox", value: "checkbox" },
                            { name: "Step", value: "step" }
                        ]}
                        value={newTaskData.type}
                        setValue={v => setNewTaskData(prev => ({ ...prev, type: v }))}
                    />
                    {newTaskData.type === "step" && (
                        <div className="gap-1 flex flex-col ">
                            <InputNumber name="target" label="Target" value={newTaskData.target} onChange={handleInputChange} />
                            <InputNumber name="step" label="Step by" value={newTaskData.step} onChange={handleInputChange} />
                        </div>
                    )}
                    <div className="flex w-full gap-1">
                        <Button onClick={() => setTaskModalOpen(false)} variant="secondary">
                            Close
                        </Button>
                        <Button onClick={handleCreateTask}>Save</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SingleList;
