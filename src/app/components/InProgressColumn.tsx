import React from "react";
export default function InProgressColumn() {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData('text/plain');
        const item = document.getElementById(itemId);
        if (item) {
            e.currentTarget.appendChild(item);
        }
    };

    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            In Progress
        </div>
    );
};