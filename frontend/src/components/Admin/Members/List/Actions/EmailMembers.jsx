import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import useMembersStore from '@/stores/membersStore'
import { X } from 'lucide-react'
import React from 'react'

const EmailMembers = () => {
    const getSelectedMembersData = useMembersStore(state => state.getSelectedMembersData)
    const selectedMembers = getSelectedMembersData()
    return (
        <div>
            <div className='flex flex-col space-y-1'>
                <h1>Selected members' email </h1>
                {selectedMembers.length !== 0 ? (
                    // <ScrollArea className=' max-h-[] p-3 border rounded-lg'>
                        <div className='flex flex-wrap text-xs gap-3 max-h-[200px] overflow-y-auto p-2 border rounded-lg custom-scroll-area'>
                            {selectedMembers.map((member) => (
                                <div className='has-svg flex items-center space-x-2 px-3 py-2 rounded-full border'>
                                    <p>{member.email}</p>
                                    <Button variant="ghost" className="center rounded-full p-0 w-[25px] h-[25px] border" onClick={() => selectedMembers.splice(selectedMembers.indexOf(member), 1)}>
                                        <X />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    // </ScrollArea>
                ) : (
                    <div className='text-center'>
                        <h1>No member is selected</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmailMembers
