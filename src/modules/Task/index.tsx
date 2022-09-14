import { Task } from "@prisma/client";
import React from "react";

const SingleTask = ({ task }: { task: Task }) => {
    return (
        <div>
            <span>{task.title}</span>
        </div>
    );
};

export default SingleTask;
