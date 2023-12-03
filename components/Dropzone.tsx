"use client"

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Cloud } from "lucide-react";
import { useState } from "react";
import DropzoneComponent from "react-dropzone"

function Dropzone() {
    const [loading, setLoading] = useState<boolean>(false);
    const {isLoaded, isSignedIn, user } = useUser();

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = async () => {
                await uploadPost(file);
            }
            reader.readAsArrayBuffer(file);
        });
    }

    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if(!user) return;

        setLoading(true);

        const docRef = await addDoc(collection(db,"users", user.id, "files"), {
            userId: user.id,
            filename: selectedFile.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timestamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size,
        })

        const imageRef = ref(storage,`users/${user.id}/files/${docRef.id}/file`);

        uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL: downloadURL,
            });
        })

        setLoading(false);
    }

    const maxSize = 20971520;

    return (
        <DropzoneComponent 
            minSize={0}
            maxSize={maxSize}
            onDrop={onDrop}
        >
            {({
                getRootProps, 
                getInputProps, 
                isDragReject, 
                isDragActive, 
                fileRejections,
            }) => {
                const isFileTooLarge = 
                    fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

                return (
                    <section className="p-10">
                        <div 
                            {...getRootProps()}
                            className={cn(
                                "mx-auto max-w-7xl h-52 flex flex-col text-zinc-700 gap-1 justify-center items-center border border-dashed rounded-lg text-center text-xl hover:bg-slate-100 cursor-pointer",
                                isDragActive 
                                    ? "bg-[#4581e8] text-white"
                                    : "bg-slate-100/50 dark:bg-slate-800/80 font-semibold text-zinc-700 dark:text-zinc-100" 
                            )}
                        >
                            <Cloud className={cn("w-7 h-7", 
                                isDragActive 
                                    ? "hidden" 
                                    : "text-zinc-700 dark:text-zinc-100/95"
                                )} 
                            />
                            <input {...getInputProps()} />
                            {!isDragActive && 'Drop a file to upload!'}
                            {isDragActive && !isDragReject && "Drop it like it's hot! 🥵"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {isFileTooLarge && (
                                <div className="text-danger mt-2">
                                    File is too large.
                                </div> 
                            )}
                            <p 
                                className={cn("text-sm",
                                    isDragActive 
                                        ? "hidden" 
                                        : "text-zinc-500 font-normal dark:text-zinc-200"
                                )}
                            >
                                All files (up to 20MB)
                            </p>
                        </div>
                    </section>
                )
            }}
        </DropzoneComponent>
    )
}

export default Dropzone