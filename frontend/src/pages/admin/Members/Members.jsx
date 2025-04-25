import { useState, useEffect } from "react"
import AdminLayout from "@/layouts/AdminLayout"
import AdminPadding from "@/layouts/AdminPadding"
import { getMembers, searchMember, createMember, deleteMember, editMember, getUnits } from "@/services/api/apiEndpoints"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Loader2,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertCircle,
  CheckCircle2,
  Users,
  CalendarIcon,
  User,
  Mail,
  Phone,
  Home,
  Layers,
  GraduationCap,
  CalendarDays,
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

// Form schema for member
const memberFormSchema = z.object({
  firstname: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastname: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  address: z.string().optional(),
  level: z.string({ required_error: "Please select a level" }),
  unit: z.array(z.string()).optional(),
  birthday: z.date().optional(),
})

const levelOptions = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "JUBEP",
  "PRE-DEGREE",
  "CHILDREN",
  "ALUMNI",
  "PARENT",
]

const Members = () => {
  // State
  const [members, setMembers] = useState([])
  const [units, setUnits] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 20,
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [showCalendar, setShowCalendar] = useState(false)
  const [showEditCalendar, setShowEditCalendar] = useState(false)

  // Forms
  const addForm = useForm({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      level: "",
      unit: [],
      birthday: undefined,
    },
  })

  const editForm = useForm({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      level: "",
      unit: [],
      birthday: undefined,
    },
  })

  // Fetch members
  const fetchMembers = async (page = 1) => {
    try {
      setLoading(true)
      const response = await getMembers()
      setMembers(response.data)
      setPagination(response.pagination)
      setLoading(false)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to fetch members" })
      setLoading(false)
    }
  }

  // Fetch units
  const fetchUnits = async () => {
    try {
      const response = await getUnits()
      setUnits(response.data)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to fetch units" })
    }
  }

  // Search members
  const handleSearch = async () => {
    if (searchQuery.length < 3 && searchQuery.length > 0) {
      setMessage({ type: "error", text: "Please provide at least 3 characters for search" })
      return
    }

    try {
      setLoading(true)
      if (searchQuery.length === 0) {
        await fetchMembers()
      } else {
        const response = await searchMember(`?query=${searchQuery}`)
        setMembers(response.data)
        setPagination(response.pagination)
      }
      setLoading(false)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to search members" })
      setLoading(false)
    }
  }

  // Handle pagination
  const handlePageChange = (page) => {
    fetchMembers(page)
  }

  // Add member
  const onAddMember = async (data) => {
    try {
      setLoading(true)
      const response = await createMember({
        ...data,
        birthday: data.birthday ? format(data.birthday, "yyyy-MM-dd") : undefined,
      })
      setMessage({ type: "success", text: "Member added successfully" })
      setIsAddDialogOpen(false)
      addForm.reset()
      fetchMembers()
      setLoading(false)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add member" })
      setLoading(false)
    }
  }

  // Edit member
  const onEditMember = async (data) => {
    if (!selectedMember) return

    try {
      setLoading(true)
      const response = await editMember(
        {
          ...data,
          birthday: data.birthday ? format(data.birthday, "yyyy-MM-dd") : undefined,
        },
        selectedMember._id,
      )
      setMessage({ type: "success", text: "Member updated successfully" })
      setIsEditDialogOpen(false)
      editForm.reset()
      fetchMembers()
      setLoading(false)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update member" })
      setLoading(false)
    }
  }

  // Delete member
  const onDeleteMember = async () => {
    if (!selectedMember) return

    try {
      setLoading(true)
      const response = await deleteMember(selectedMember._id)
      setMessage({ type: "success", text: "Member deleted successfully" })
      setIsDeleteDialogOpen(false)
      fetchMembers()
      setLoading(false)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete member" })
      setLoading(false)
    }
  }

  // Open edit dialog
  const openEditDialog = (member) => {
    setSelectedMember(member)
    editForm.reset({
      firstname: member.firstname,
      lastname: member.lastname,
      email: member.email,
      phone: member.phone,
      address: member.address || "",
      level: member.level,
      unit: member.unit || [],
      birthday: member.birthday ? new Date(member.birthday) : undefined,
    })
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (member) => {
    setSelectedMember(member)
    setIsDeleteDialogOpen(true)
  }

  // Get unit titles by IDs
  const getUnitTitles = (unitIds) => {
    return units.filter((unit) => unitIds.includes(unit._id)).map((unit) => unit.title)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Toggle unit selection
  const toggleUnitSelection = (unitId, formType) => {
    if (formType === "add") {
      const currentUnits = addForm.getValues("unit") || []
      const newUnits = currentUnits.includes(unitId)
        ? currentUnits.filter((id) => id !== unitId)
        : [...currentUnits, unitId]
      addForm.setValue("unit", newUnits, { shouldValidate: true })
    } else {
      const currentUnits = editForm.getValues("unit") || []
      const newUnits = currentUnits.includes(unitId)
        ? currentUnits.filter((id) => id !== unitId)
        : [...currentUnits, unitId]
      editForm.setValue("unit", newUnits, { shouldValidate: true })
    }
  }

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Fetch members and units on component mount
  useEffect(() => {
    fetchMembers()
    fetchUnits()
  }, [])

  return (
    <AdminLayout>
      <AdminPadding className={"bg-white h-full"}>
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2 text-primary">
                <Users className="h-8 w-8" /> Members Management
              </h1>
              <p className="text-muted-foreground mt-1">Manage all members in the system</p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="px-4 py-2 bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </div>

          {/* {message.text && (
            <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-6">
              {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              <AlertTitle>{message.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )} */}

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>All Members</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search members..."
                      className="w-[250px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <Button variant="outline" size="icon" onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSearchQuery("")
                      fetchMembers()
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Email</TableHead>
                          <TableHead className="font-semibold">Phone</TableHead>
                          <TableHead className="font-semibold">Level</TableHead>
                          <TableHead className="font-semibold">Units</TableHead>
                          <TableHead className="font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.length > 0 ? (
                          members.map((member) => (
                            <TableRow key={member._id} className="hover:bg-muted/20 transition-colors">
                              <TableCell className="font-medium">
                                {member.firstname} {member.lastname}
                              </TableCell>
                              <TableCell>{member.email}</TableCell>
                              <TableCell>{member.phone}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                  {member.level}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {member.unit && member.unit.length > 0 ? (
                                    getUnitTitles(member.unit).map((title, index) => (
                                      <Badge key={index} variant="secondary" className="capitalize">
                                        {title}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-muted-foreground text-sm">No units</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-primary"
                                    onClick={() => openEditDialog(member)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-destructive border-destructive/20 hover:bg-destructive/10"
                                    onClick={() => openDeleteDialog(member)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-10">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <Users className="h-10 w-10 mb-2 opacity-20" />
                                <p>No members found</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={pagination.currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Showing {members.length} of {pagination.total} members
              </div>
            </CardFooter>
          </Card>

          {/* Add Member Dialog - Completely Redesigned */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
              <DialogHeader className="px-6 pt-6 pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
                <DialogTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <User className="h-5 w-5" /> Add New Member
                </DialogTitle>
                <DialogDescription>Fill in the details to add a new member to the system.</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basic" className="w-full">
                <div className="px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="additional">Additional Details</TabsTrigger>
                  </TabsList>
                </div>

                <Form {...addForm}>
                  <form onSubmit={addForm.handleSubmit(onAddMember)} className="space-y-6">
                    <TabsContent value="basic" className="px-6 pt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={addForm.control}
                            name="firstname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" /> First Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addForm.control}
                            name="lastname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" /> Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={addForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" /> Email
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5" /> Phone
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="08012345678" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addForm.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <GraduationCap className="h-3.5 w-3.5" /> Level
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {levelOptions.map((level) => (
                                    <SelectItem key={level} value={level}>
                                      {level}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="additional" className="px-6 pt-4">
                      <div className="space-y-4">
                        <FormField
                          control={addForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Home className="h-3.5 w-3.5" /> Address (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St, City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addForm.control}
                          name="birthday"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" /> Birthday (Optional)
                              </FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <div className="flex">
                                    <Button
                                      variant="outline"
                                      className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                        }`}
                                      type="button"
                                      onClick={() => setShowCalendar(!showCalendar)}
                                    >
                                      {field.value ? format(field.value, "PPP") : "Select birthday"}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </div>
                                </FormControl>
                                {showCalendar && (
                                  <div className="absolute z-10 mt-1 bg-background border rounded-md shadow-md">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={(date) => {
                                        field.onChange(date)
                                        setShowCalendar(false)
                                      }}
                                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                      initialFocus
                                    />
                                  </div>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addForm.control}
                          name="unit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Layers className="h-3.5 w-3.5" /> Units (Optional)
                              </FormLabel>
                              <FormControl>
                                <div className="border rounded-md p-4">
                                  <div className="mb-2 flex justify-between items-center">
                                    <span className="text-sm font-medium">
                                      {field.value?.length || 0} unit(s) selected
                                    </span>
                                  </div>
                                  <ScrollArea className="h-[200px] rounded-md border">
                                    <div className="p-4 space-y-2">
                                      {units.map((unit) => (
                                        <div key={unit._id} className="flex items-center space-x-2">
                                          <Checkbox
                                            id={`add-unit-${unit._id}`}
                                            checked={(field.value || []).includes(unit._id)}
                                            onCheckedChange={() => toggleUnitSelection(unit._id, "add")}
                                          />
                                          <label
                                            htmlFor={`add-unit-${unit._id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                                          >
                                            {unit.title}
                                          </label>
                                        </div>
                                      ))}
                                      {units.length === 0 && (
                                        <div className="text-center py-4 text-muted-foreground">No units available</div>
                                      )}
                                    </div>
                                  </ScrollArea>
                                </div>
                              </FormControl>
                              <FormDescription>Select one or more units for this member.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </form>
                </Form>
              </Tabs>

              <DialogFooter className="px-6 py-4 bg-muted/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    addForm.reset()
                    setIsAddDialogOpen(false)
                    setShowCalendar(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={addForm.handleSubmit(onAddMember)}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Member Dialog - Completely Redesigned */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
              <DialogHeader className="px-6 pt-6 pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
                <DialogTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Pencil className="h-5 w-5" /> Edit Member
                </DialogTitle>
                <DialogDescription>Update the member's information.</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basic" className="w-full">
                <div className="px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="additional">Additional Details</TabsTrigger>
                  </TabsList>
                </div>

                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(onEditMember)} className="space-y-6">
                    <TabsContent value="basic" className="px-6 pt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={editForm.control}
                            name="firstname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" /> First Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={editForm.control}
                            name="lastname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" /> Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={editForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" /> Email
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5" /> Phone
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="08012345678" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editForm.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <GraduationCap className="h-3.5 w-3.5" /> Level
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {levelOptions.map((level) => (
                                    <SelectItem key={level} value={level}>
                                      {level}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="additional" className="px-6 pt-4">
                      <div className="space-y-4">
                        <FormField
                          control={editForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Home className="h-3.5 w-3.5" /> Address (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St, City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editForm.control}
                          name="birthday"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" /> Birthday (Optional)
                              </FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <div className="flex">
                                    <Button
                                      variant="outline"
                                      className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                        }`}
                                      type="button"
                                      onClick={() => setShowEditCalendar(!showEditCalendar)}
                                    >
                                      {field.value ? format(field.value, "PPP") : "Select birthday"}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </div>
                                </FormControl>
                                {showEditCalendar && (
                                  <div className="absolute z-10 mt-1 bg-background border rounded-md shadow-md">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={(date) => {
                                        field.onChange(date)
                                        setShowEditCalendar(false)
                                      }}
                                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                      initialFocus
                                    />
                                  </div>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editForm.control}
                          name="unit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Layers className="h-3.5 w-3.5" /> Units (Optional)
                              </FormLabel>
                              <FormControl>
                                <div className="border rounded-md p-4">
                                  <div className="mb-2 flex justify-between items-center">
                                    <span className="text-sm font-medium">
                                      {field.value?.length || 0} unit(s) selected
                                    </span>
                                  </div>
                                  <ScrollArea className="h-[200px] rounded-md border">
                                    <div className="p-4 space-y-2">
                                      {units.map((unit) => (
                                        <div key={unit._id} className="flex items-center space-x-2">
                                          <Checkbox
                                            id={`edit-unit-${unit._id}`}
                                            checked={(field.value || []).includes(unit._id)}
                                            onCheckedChange={() => toggleUnitSelection(unit._id, "edit")}
                                          />
                                          <label
                                            htmlFor={`edit-unit-${unit._id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                                          >
                                            {unit.title}
                                          </label>
                                        </div>
                                      ))}
                                      {units.length === 0 && (
                                        <div className="text-center py-4 text-muted-foreground">No units available</div>
                                      )}
                                    </div>
                                  </ScrollArea>
                                </div>
                              </FormControl>
                              <FormDescription>Select one or more units for this member.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </form>
                </Form>
              </Tabs>

              <DialogFooter className="px-6 py-4 bg-muted/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    editForm.reset()
                    setIsEditDialogOpen(false)
                    setShowEditCalendar(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={editForm.handleSubmit(onEditMember)}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the member
                  {selectedMember && ` "${selectedMember.firstname} ${selectedMember.lastname}"`} and remove their data
                  from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteMember} className="bg-destructive text-destructive-foreground">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AdminPadding>
    </AdminLayout>
  )
}

export default Members







































// import List from '@/components/Admin/Members/List/List'
// import Navbar from '@/components/Admin/Members/Navbar/Navbar'
// import AdminLayout from '@/layouts/AdminLayout'
// import AdminPadding from '@/layouts/AdminPadding'
// import React from 'react'
// import { useSearchParams } from 'react-router-dom'

// const Members = () => {
//   const [searchParams] = useSearchParams()
//   const tab = searchParams.get("tab")
//   return (
//     <AdminLayout>
//       <Navbar />
//       <AdminPadding className={"bg-white h-full"}>
//         {
//           tab === "overview" ? <List /> : ""
//         }
//       </AdminPadding>
//     </AdminLayout>
//   )
// }

// export default Members
