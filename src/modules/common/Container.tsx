import React from "react";

type ContainerProps = {
    children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return <div className="flex flex-col items-center h-full mt-16 w-full mb-2">{children}</div>;
};

export default Container;
