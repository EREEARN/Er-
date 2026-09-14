"use client"

import { useState } from "react"
import type { ReactElement } from "react"
import { AlertTriangle, FileText, UploadCloud } from "lucide-react"
import { AppModal } from "@/components/reuseables/app-modal"
import { AppButton } from "@/components/reuseables/app-button"
import { Text } from "@/components/reuseables/text"

type SubmitWorkModalProps = {
    trigger: ReactElement
    files: string[]
    posterName: string
    onConfirm: () => void
}

const SubmitWorkModal = ({ trigger, files, posterName, onConfirm }: SubmitWorkModalProps) => {
    const [open, setOpen] = useState(false)

    return (
        <AppModal trigger={trigger} open={open} onOpenChange={setOpen}>
            <div className="flex flex-col items-center text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-app-light-primary text-app-primary">
                    <UploadCloud className="size-6" />
                </span>
                <Text as="h2" className="mt-4 text-lg font-bold text-app-dark-purple">Submit Your Work?</Text>
                <Text as="p" className="mt-2 text-sm text-app-grey-light">
                    Once submitted, the poster ({posterName}) will review your work against the deliverable requirements.
                </Text>

                <div className="mt-5 w-full rounded-xl bg-gray-50 p-4 text-left">
                    <Text as="p" className="text-xs font-semibold uppercase tracking-wide text-app-grey-light">Attached Deliverables</Text>
                    <div className="mt-2 flex flex-col gap-2">
                        {files.map((file) => (
                            <div key={file} className="flex items-center gap-2 text-sm text-app-dark-purple">
                                <FileText className="size-4 text-app-grey-light" />
                                {file}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-left text-sm text-amber-700">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                    Make sure all test cases match and your scripts run smoothly. You cannot edit files while the review process is active.
                </div>

                <div className="mt-5 flex w-full gap-3">
                    <AppButton variant="outline" color="#111827" className="flex-1 justify-center" onClick={() => setOpen(false)}>
                        Go Back
                    </AppButton>
                    <AppButton
                        variant="primary"
                        className="flex-1 justify-center"
                        onClick={() => {
                            onConfirm()
                            setOpen(false)
                        }}
                    >
                        Confirm Submission
                    </AppButton>
                </div>
            </div>
        </AppModal>
    )
}

export { SubmitWorkModal }
export type { SubmitWorkModalProps }
