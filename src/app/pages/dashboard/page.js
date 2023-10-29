'use client'

import AdminLayout from "@/app/components/dashboard/layout"
import { Spinner, Stack } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const Dashboard = () => {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "loading") {
            return
        }
    }, [status])

    if (status === "loading" || !session) {
        return <div className="flex justify-center min-h-screen">
            <Spinner size='xl' />
        </div>
    }

    return (
        <AdminLayout>
            <h1>Ini halaman dashboard, halo {session.user.name}</h1>
        </AdminLayout>
    )
}

export default Dashboard