import { useState, useEffect } from "react"
// import { useRouter, useParams } from "use "
import AdminLayout from "@/layouts/AdminLayout"
import AdminPadding from "@/layouts/AdminPadding"
import { getMember, deleteMember } from "@/services/api/apiEndpoints"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Loader2,
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  Clock,
  ArrowLeft,
  Pencil,
  Trash2,
  GraduationCap,
  Users,
  AlertCircle,
  CheckCircle2,
  Layers,
} from "lucide-react"
import { format } from "date-fns"
import { useNavigate, useParams, } from "react-router-dom"

const MemberDetails = () => {
  const router = useNavigate()
  const params = useParams()
  const memberId = params.id

  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  // Fetch member details
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true)
        const response = await getMember(memberId)
        setMember(response.data)
        setLoading(false)
      } catch (error) {
        setError("Failed to load member details. Please try again.")
        setLoading(false)
      }
    }

    if (memberId) {
      fetchMemberDetails()
    }
  }, [memberId])

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified"
    const date = new Date(dateString)
    return format(date, "PPP")
  }

  // Format time
  const formatDateTime = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return format(date, "PPP 'at' p")
  }

  // Handle delete
  const handleDelete = async () => {
    try {
      setDeleteLoading(true)
      await deleteMember(memberId)
      setMessage({ type: "success", text: "Member deleted successfully" })
      setDeleteLoading(false)
      setIsDeleteDialogOpen(false)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/members")
      }, 1500)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete member" })
      setDeleteLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <AdminPadding>
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading member details...</p>
          </div>
        </AdminPadding>
      </AdminLayout>
    )
  }

  // if (error) {
  //   return (
  //     <AdminLayout>
  //       <AdminPadding>
  //         <Alert variant="destructive" className="mb-6">
  //           <AlertCircle className="h-4 w-4" />
  //           <AlertTitle>Error</AlertTitle>
  //           <AlertDescription>{error}</AlertDescription>
  //         </Alert>
  //         <Button onClick={() => router.push("/members")} variant="outline">
  //           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Members
  //         </Button>
  //       </AdminPadding>
  //     </AdminLayout>
  //   )
  // }

  return (
    <AdminLayout>
      <AdminPadding className="bg-white h-full">
        <div className="space-y-6">
          {/* Header with navigation and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Button variant="outline" size="sm" onClick={() => router(-1)} className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Members
              </Button>
              <h1 className="text-3xl font-bold flex items-center gap-2 text-primary">
                <User className="h-8 w-8" /> Member Profile
              </h1>
              <p className="text-muted-foreground mt-1">
                Detailed information about {member?.firstname} {member?.lastname}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10"
                onClick={() => router.push(`/members/edit/${memberId}`)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                variant="outline"
                className="border-destructive/20 text-destructive hover:bg-destructive/10"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>

          {/* {message.text && (
            <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-6">
              {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              <AlertTitle>{message.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )} */}

          {/* Member Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <Card className="md:col-span-1">
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-primary">
                      {member?.firstname?.[0]}
                      {member?.lastname?.[0]}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-center">
                    {member?.firstname} {member?.lastname}
                  </h2>
                  <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/20">
                    <GraduationCap className="mr-1 h-3 w-3" /> {member?.level}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground break-all">{member?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{member?.phone || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{member?.address || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Birthday</p>
                      <p className="text-sm text-muted-foreground">
                        {member?.birthday ? formatDate(member.birthday) : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Additional Info */}
            <Card className="md:col-span-2">
              <Tabs defaultValue="units">
                <CardHeader className="pb-0">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="units" className="text-sm">
                      <Layers className="mr-2 h-4 w-4" /> Units
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="text-sm">
                      <Clock className="mr-2 h-4 w-4" /> Activity
                    </TabsTrigger>
                    <TabsTrigger value="system" className="text-sm">
                      <Users className="mr-2 h-4 w-4" /> System Info
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-6">
                  <TabsContent value="units" className="mt-0">
                    <h3 className="text-lg font-medium mb-4">Member Units</h3>
                    {member?.unit && member.unit.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {member.unit.map((unit) => (
                          <Card key={unit._id} className="overflow-hidden">
                            <CardHeader className="bg-primary/5 py-3">
                              <CardTitle className="text-base flex items-center">
                                <Layers className="mr-2 h-4 w-4 text-primary" />
                                <span className="capitalize">{unit.title}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-3 text-sm">
                              <p className="text-muted-foreground">Added on {formatDate(unit.createdAt)}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Layers className="h-12 w-12 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground">This member is not assigned to any units</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="activity" className="mt-0">
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 border-l-2 border-primary pl-4 py-1">
                        <div>
                          <p className="text-sm font-medium">Profile Updated</p>
                          <p className="text-xs text-muted-foreground">{formatDateTime(member?.updatedAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 border-l-2 border-primary/60 pl-4 py-1">
                        <div>
                          <p className="text-sm font-medium">Member Created</p>
                          <p className="text-xs text-muted-foreground">{formatDateTime(member?.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="system" className="mt-0">
                    <h3 className="text-lg font-medium mb-4">System Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-md border bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Member ID</p>
                          <p className="text-sm font-mono">{member?._id}</p>
                        </div>
                        <div className="p-4 rounded-md border bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Created At</p>
                          <p className="text-sm">{formatDateTime(member?.createdAt)}</p>
                        </div>
                        <div className="p-4 rounded-md border bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                          <p className="text-sm">{formatDateTime(member?.updatedAt)}</p>
                        </div>
                        <div className="p-4 rounded-md border bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Version</p>
                          <p className="text-sm">v{member?.__v}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the member
                {member && ` "${member.firstname} ${member.lastname}"`} and remove their data from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                {deleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminPadding>
    </AdminLayout>
  )
}

export default MemberDetails
