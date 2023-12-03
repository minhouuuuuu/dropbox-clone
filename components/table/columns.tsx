"use client"

import { COLOR_EXTENSION_MAP } from "@/constants"
import { FileType } from "@/typing"
import { ColumnDef } from "@tanstack/react-table"
import { FileIcon, defaultStyles } from "react-file-icon"
import prettyBytes from "pretty-bytes"
import { DownloadIcon } from "lucide-react"
import { Button } from "../ui/button"

export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extension: string = type.split("/")[1];
            return(
                <div className="w-10">
                    <FileIcon 
                        extension={extension}
                        labelColor={COLOR_EXTENSION_MAP[extension]}
                        // @ts-ignore
                        {...defaultStyles[extension]}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "filename",
        header: "Filename",
    },
    {
        accessorKey: "timestamp",
        header: "Date Added",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>;
        }
    },
    {
        accessorKey: "downloadURL", 
        header: "Download",
        cell: ({ renderValue, ...props }) => (
            <a href={renderValue() as string} target="_blank">
                <Button variant="blue" className="mx-auto w-fit ml-2">
                    <DownloadIcon />
                </Button>
            </a>
        )
    },
]
