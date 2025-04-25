import React, { useState, useEffect } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import { Button } from '@/components/ui/button'
import { PlusIcon, Pencil, Trash2, ExternalLink, Loader2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { createSermon, getSermons, editSermon, deleteSermon } from '@/services/api/apiEndpoints'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

const categories = ["Sunday Service", "Midweek Service", "Special Program", "Revival", "Others"];

const AdminSermonPage = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        preacher: '',
        telegramLink: '',
        description: '',
        category: 'Sunday Service',
        bibleReferences: '',
        duration: ''
    });
    const [currentSermon, setCurrentSermon] = useState(null);
    const { toast } = useToast();

    // Fetch sermons on component mount
    useEffect(() => {
        fetchSermons();
    }, [currentPage]);

    const fetchSermons = async () => {
        try {
            setLoading(true);
            const response = await getSermons();
            setSermons(response.data);
            setTotalPages(response.pagination.totalPages);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch sermons",
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (value) => {
        setFormData({ ...formData, category: value });
    };

    const handleBibleReferencesChange = (e) => {
        const { value } = e.target;
        // Store as comma-separated string in form, will be converted to array on submit
        setFormData({ ...formData, bibleReferences: value });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            preacher: '',
            telegramLink: '',
            description: '',
            category: 'Sunday Service',
            bibleReferences: '',
            duration: ''
        });
    };

    const handleAddSermon = async () => {
        try {
            setSubmitting(true);
            // Convert bibleReferences from comma-separated string to array
            const dataToSubmit = {
                ...formData,
                bibleReferences: formData.bibleReferences.split(',').map(ref => ref.trim())
            };

            await createSermon(dataToSubmit);
            setAddDialogOpen(false);
            resetForm();
            fetchSermons();
            toast({
                title: "Success",
                description: "Sermon added successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add sermon",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const openEditDialog = (sermon) => {
        setCurrentSermon(sermon);
        setFormData({
            title: sermon.title,
            preacher: sermon.preacher,
            telegramLink: sermon.telegramLink,
            description: sermon.description,
            category: sermon.category,
            bibleReferences: sermon.bibleReferences.join(', '),
            duration: sermon.duration
        });
        setEditDialogOpen(true);
    };

    const handleEditSermon = async () => {
        try {
            setSubmitting(true);
            const dataToSubmit = {
                ...formData,
                bibleReferences: formData.bibleReferences.split(',').map(ref => ref.trim())
            };

            await editSermon(dataToSubmit, currentSermon._id);
            setEditDialogOpen(false);
            resetForm();
            fetchSermons();
            toast({
                title: "Success",
                description: "Sermon updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update sermon",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const openDeleteDialog = (sermon) => {
        setCurrentSermon(sermon);
        setDeleteDialogOpen(true);
    };

    const handleDeleteSermon = async () => {
        try {
            setSubmitting(true);
            await deleteSermon(currentSermon._id);
            setDeleteDialogOpen(false);
            fetchSermons();
            toast({
                title: "Success",
                description: "Sermon deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete sermon",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const getCategoryBadgeColor = (category) => {
        switch (category) {
            case 'Sunday Service':
                return 'bg-blue-100 text-blue-800';
            case 'Midweek Service':
                return 'bg-green-100 text-green-800';
            case 'Special Program':
                return 'bg-purple-100 text-purple-800';
            case 'Revival':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <AdminPadding className="bg-neutral-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Sermons</h1>
                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <PlusIcon className="h-4 w-4" />
                                Add Sermon
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                                <DialogTitle>Add New Sermon</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter sermon title"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="preacher">Preacher</Label>
                                        <Input
                                            id="preacher"
                                            name="preacher"
                                            value={formData.preacher}
                                            onChange={handleInputChange}
                                            placeholder="Enter preacher's name"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="telegramLink">Telegram Link</Label>
                                    <Input
                                        id="telegramLink"
                                        name="telegramLink"
                                        value={formData.telegramLink}
                                        onChange={handleInputChange}
                                        placeholder="Enter telegram link"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter sermon description"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={handleCategoryChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 45 minutes"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="bibleReferences">Bible References</Label>
                                    <Input
                                        id="bibleReferences"
                                        name="bibleReferences"
                                        value={formData.bibleReferences}
                                        onChange={handleBibleReferencesChange}
                                        placeholder="e.g. John 3:16, Romans 8:28 (comma separated)"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleAddSermon} disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Sermon"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Sermons Table */}
                <div className="bg-white rounded-md shadow-sm border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Title</TableHead>
                                <TableHead>Preacher</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        <div className="flex justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">Loading sermons...</p>
                                    </TableCell>
                                </TableRow>
                            ) : sermons.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        <p className="text-muted-foreground">No sermons found</p>
                                        <Button
                                            variant="link"
                                            onClick={() => setAddDialogOpen(true)}
                                            className="mt-2"
                                        >
                                            Add your first sermon
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sermons.map((sermon) => (
                                    <TableRow key={sermon._id}>
                                        <TableCell className="font-medium">{sermon.title}</TableCell>
                                        <TableCell>{sermon.preacher}</TableCell>
                                        <TableCell>
                                            <Badge className={getCategoryBadgeColor(sermon.category)}>
                                                {sermon.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{sermon.duration}</TableCell>
                                        <TableCell>{format(new Date(sermon.date), 'MMM dd, yyyy')}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => window.open(sermon.telegramLink, '_blank')}
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(sermon)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openDeleteDialog(sermon)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        className="w-10 h-10"
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {/* Edit Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogTitle>Edit Sermon</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-title">Title</Label>
                                    <Input
                                        id="edit-title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter sermon title"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-preacher">Preacher</Label>
                                    <Input
                                        id="edit-preacher"
                                        name="preacher"
                                        value={formData.preacher}
                                        onChange={handleInputChange}
                                        placeholder="Enter preacher's name"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-telegramLink">Telegram Link</Label>
                                <Input
                                    id="edit-telegramLink"
                                    name="telegramLink"
                                    value={formData.telegramLink}
                                    onChange={handleInputChange}
                                    placeholder="Enter telegram link"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter sermon description"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={handleCategoryChange}
                                    >
                                        <SelectTrigger id="edit-category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={`edit-${category}`} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-duration">Duration</Label>
                                    <Input
                                        id="edit-duration"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 45 minutes"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-bibleReferences">Bible References</Label>
                                <Input
                                    id="edit-bibleReferences"
                                    name="bibleReferences"
                                    value={formData.bibleReferences}
                                    onChange={handleBibleReferencesChange}
                                    placeholder="e.g. John 3:16, Romans 8:28 (comma separated)"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleEditSermon} disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Sermon"
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the sermon "{currentSermon?.title}".
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteSermon}
                                className="bg-red-500 hover:bg-red-600 text-white"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete Sermon"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </AdminPadding>
        </AdminLayout>
    )
}

export default AdminSermonPage