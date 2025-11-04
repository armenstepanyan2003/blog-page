import React, { useState } from 'react';
import Modal from "@/components/ui/Modal";
import Loading from "@/components/ui/Loading";
import { EditModalProps } from "@/constants";
import GroupList from "@/components/GroupList";
import apiService from "@/services/api.service";

const GroupModal: React.FC<EditModalProps> = ({ title, visible, setVisible, onCancel, currentUser, onGroupCreated }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState("");


    const finalSelectedUsers = [...selectedUsers, currentUser?.id];
    const handleOk = async () => {
        try {
            if (finalSelectedUsers.length > 1) {
                const data = await apiService.createGroupChat(finalSelectedUsers, groupName);
                setVisible(false);
                onGroupCreated(data.chat);
            } else {
                setVisible(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            isLoading={isLoading}
            onOk={handleOk}
        >
            {isLoading && <Loading text="Adding..." size="small" />}
            <div className="mb-4">

                {finalSelectedUsers.length > 2 && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Group Name
                        </label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Enter group name..."
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </>
                )}
            </div>
        <div>
            <GroupList setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} />
        </div>
        </Modal>
    );
};

export default GroupModal;
