"use client";

import { FileType } from "@/typing";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
    const { user } = useUser();
    const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
    const [sort, setSort] = useState<"asc" | "desc">("desc");

    const [docs, loading, error] = useCollection(
        user &&
            query(
                collection(db, "users", user.id, "files"),
                orderBy("timestamp", sort)
            )
    );

    useEffect(() => {
        if (!docs) return;

        const files: FileType[] = docs.docs.map((doc) => ({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            timestamp:
                new Date(doc.data().timestamp?.seconds * 1000) || undefined,
            fullName: doc.data().fullName,
            downloadURL: doc.data().downloadURL,
            type: doc.data().type,
            size: doc.data().size,
        }));

        setInitialFiles(files);
    }, [docs]);

    if (docs?.docs.length === undefined)
        return (
            <div className="flex justify-between items-center pt-5 pb-5">
                <h2 className="font-bold text-4xl">All files</h2>

                <Button variant={"outline"} className="ml-auto w-36 h-10">
                    <Skeleton className="h-5 w-full" />
                </Button>

                <div></div>
            </div>
        );

    return (
        <div>
            <div className="flex justify-between items-center pt-5 pb-5">
                <h2 className="font-bold text-3xl">All files</h2>
                <Button
                    onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
                    variant="outline"
                    className="w-fit ml-auto"
                >
                    Sort by {sort === "desc" ? "newest" : "oldest"}
                </Button>
            </div>

            <DataTable columns={columns} data={initialFiles} />
        </div>
    );
}

export default TableWrapper;
