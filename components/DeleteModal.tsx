"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export function DeleteModal() {
    const { user } = useUser();

    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = 
        useAppStore((state) => [
            state.isDeleteModalOpen,
            state.setIsDeleteModalOpen,
            state.fileId,
            state.setFileId,
        ])

    async function deleteFile() {
        if (!user || !fileId) return;

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        try {
            deleteObject(fileRef).then(async () => {
                deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                    console.log("Document successfully deleted!");
                });
            });
        } catch (error) {
            console.log(error);
        }

        setIsDeleteModalOpen(false);
    }
    
    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen)
            }}
        >
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Are you sure to delete? </DialogTitle>
            <DialogDescription>
                Minh is kinda suck at Google Firebase 😵<br/>
                This action can not be done, sorry for that 😃
            </DialogDescription>
            </DialogHeader>
            
            <div className="flex space-x-2 py-3">
                <Button
                    size="sm"
                    className="px-3 flex-1 border border-solid"
                    variant={"ghost"}
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    <span className="sr-only">Cancel</span>
                    <span>Cancel</span>
                </Button>
                <Button
                    type="submit"
                    size="sm"
                    className="px-3 flex-1"
                    onClick = {() => deleteFile()}
                >
                    <span className="sr-only">Delete</span>
                    <span>Delete</span>
                </Button>
            </div>
        </DialogContent>
        </Dialog>
    )
}
