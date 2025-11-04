'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "next/navigation";
import apiService from "@/services/api.service";
import BackButton from "@/components/BackButton";
import {useNotificationProvider} from "@/providers/NotificationProvider";
import { useSocket } from "@/providers/SocketProvider";

export default function ChatPage() {
    const params = useParams();
    const chatId = params.id;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatUser, setChatUser] = useState(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { socket } = useSocket();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState("");
    const { setCount } = useNotificationProvider()

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on(`receive_message_${chatId}`, (data) => {
            setMessages(prev => [...prev, data])
        });

        socket.on(`message_deleted_${chatId}`, (messageId) => {
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
        });

        socket.on(`message_edited_${chatId}`, (data) => {
            setMessages(prev =>
                prev.map(message => message.id === data.id ? {...message, content: data.content} : message)
            )
        })

        return () => {
            socket.off(`receive_message_${chatId}`);
            socket.off(`message_deleted_${chatId}`);
            socket.off(`message_edited_${chatId}`);
        };

    }, [chatId, socket]);


    useEffect(() => {
        const fetchData  = async () => {
            try {
                const { messages, chatUser } = await apiService.getMessages(chatId);
                setMessages(messages);
                setChatUser(chatUser);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {

        if (!currentUser) return;

        const isReadMessage = async () => {
            try {
                const userId = currentUser?.id;

                if (!userId) return;

                const res = await apiService.isReadMessages(chatId, userId);
                setCount(prevCount => prevCount - (res?.updatedRowsCount || 0));

                setMessages(prevMessages =>
                    prevMessages.map(msg => ({
                        ...msg,
                        receivers: Array.isArray(msg.receivers)
                            ? msg.receivers.map(r => ({ ...r, isRead: true }))
                            : msg.receivers
                    }))
                );
            } catch (error) {
                console.log(error);
            }
        };

        const hasUnreadMessages =
            chatId &&
            Array.isArray(messages) &&
            messages.some(
                msg =>
                    Array.isArray(msg.receivers) &&
                    msg.receivers.some(
                        r => r.receiverId === currentUser?.id && !r.isRead
                    )
            );


        if (hasUnreadMessages) {
            isReadMessage();
        }
    }, [chatId, setCount, messages, setMessages, currentUser]);


    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            const sentMessage = await apiService.writeMessage({
                content: newMessage,
                receiver: chatUser?.map(u => u.id) || [],
                chatId: chatId
            });
            setMessages(prev => [...prev, sentMessage]);
            setNewMessage("");
            socket.emit(`send_message`, sentMessage);

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteOrEdit = (messageId: number) => {
        if (selectedMessageId === messageId) {
            setSelectedMessageId(null);
        } else {
            setSelectedMessageId(messageId);
        }
    }

    const handleDeleteMessage = async (messageId: number) => {
        if (!messageId) return
        try {
            await apiService.deleteMessage(messageId);
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
            socket.emit("delete_message", {
                messageId,
                chatId
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditClick = (msg) => {
        setEditingMessageId(msg.id);
        setEditedContent(msg.content);
        setSelectedMessageId(null);
    };

    const handleSaveEdit = async (messageId: number) => {
        try {
            const updatedMessage = await apiService.editMessage(messageId, editedContent);
            setMessages(prev =>
                prev.map(message =>
                    message.id === messageId
                        ? { ...message, content: updatedMessage.content }
                        : message
                )
            );

            socket.emit("edit_message", { id: messageId, content: editedContent, chatId });

            setEditingMessageId(null);
            setEditedContent("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 p-6 gap-5">

            <h1 className="text-2xl font-bold text-sky-700 mb-4">
                {chatUser && chatUser.length > 1
                    ? `Chat with ${chatUser.map(u => u.firstName).join(", ")}`
                    : `Chat with ${chatUser?.[0]?.firstName || "Chat"}`}
            </h1>
            <BackButton />

            <div className="w-full max-w-md h-[500px] flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden">

                <div className="flex-1 p-4 overflow-y-auto space-y-3 h-[400px]">
                    {!Array.isArray(messages) || messages.length === 0 ? (
                        <p className="text-gray-500 text-center">No messages yet.</p>
                    ) : (
                        messages.map((msg) => {
                            if (!msg || !msg.sender?.id) return null;
                            const isMine = msg.sender?.id === currentUser?.id;

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isMine ? "justify-end" : "justify-start"} gap-1`}
                                >
                                    {!isMine && msg?.sender && (
                                        <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-md font-semibold text-gray-700">
                                            {msg?.sender?.firstName[0]}{msg?.sender?.lastName[0]}
                                        </div>
                                    )}
                                    <div className={`max-w-[70%] px-4 py-2 rounded-lg text-sm 
                                    ${isMine ? "bg-sky-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}
                                            cursor-pointer`}

                                         onDoubleClick={() => isMine ? handleDeleteOrEdit(msg.id) : null}
                                    >
                                        {editingMessageId === msg.id ? (
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="text"
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") handleSaveEdit(msg.id);
                                                    }}
                                                    className="w-full px-2 py-1 rounded text-gray-900"
                                                />
                                                <button
                                                    onClick={() => handleSaveEdit(msg.id)}
                                                    className="text-black text-sm"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {msg.content}
                                                {selectedMessageId === msg.id && (
                                                    <div className="flex bg-white border border-gray-200 shadow-lg rounded-lg w-28 ">
                                                        <button
                                                            className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 text-gray-700"
                                                            onClick={() => handleEditClick(msg)}
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-red-100 text-red-600"
                                                            onClick={() => handleDeleteMessage(msg.id)}
                                                        >
                                                            🗑
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })

                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-3 flex items-center bg-gray-50">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        value={newMessage}
                        ref={inputRef}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                    />
                    <button
                        onClick={handleSend}
                        className="ml-3 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}



// 'use client'
//
// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from "next/navigation";
// import apiService from "@/services/api.service";
// import BackButton from "@/components/BackButton";
// import {useNotificationProvider} from "@/providers/NotificationProvider";
// import { useSocket } from "@/providers/SocketProvider";
// import { motion, AnimatePresence } from "framer-motion";
//
// export default function ChatPage() {
//     const params = useParams();
//     const chatId = params.id;
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [chatUser, setChatUser] = useState(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const { socket } = useSocket();
//     const messagesEndRef = useRef<HTMLDivElement | null>(null);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [selectedMessageId, setSelectedMessageId] = useState(null);
//     const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
//     const [editedContent, setEditedContent] = useState("");
//     const { setCount } = useNotificationProvider()
//
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setCurrentUser(JSON.parse(storedUser));
//         }
//     }, []);
//
//     useEffect(() => {
//         if (!socket) return;
//
//         socket.on(`receive_message_${chatId}`, (data) => {
//             setMessages(prev => [...prev, data])
//         });
//
//         socket.on(`message_deleted_${chatId}`, (messageId) => {
//             setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
//         });
//
//         socket.on(`message_edited_${chatId}`, (data) => {
//             setMessages(prev =>
//                 prev.map(message => message.id === data.id ? {...message, content: data.content} : message)
//             )
//         })
//
//         return () => {
//             socket.off(`receive_message_${chatId}`);
//             socket.off(`message_deleted_${chatId}`);
//             socket.off(`message_edited_${chatId}`);
//         };
//
//     }, [chatId, socket]);
//
//
//     useEffect(() => {
//         const fetchData  = async () => {
//             try {
//                 const { messages, chatUser } = await apiService.getMessages(chatId);
//                 setMessages(messages);
//                 setChatUser(chatUser);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     },[chatId]);
//
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);
//
//     useEffect(() => {
//
//         if (!currentUser) return;
//
//         const isReadMessage = async () => {
//             try {
//                 const userId = currentUser?.id;
//
//                 if (!userId) return;
//
//                 const res = await apiService.isReadMessages(chatId, userId);
//                 setCount(prevCount => prevCount - (res?.updatedRowsCount || 0));
//
//                 setMessages(prevMessages =>
//                     prevMessages.map(msg => ({
//                         ...msg,
//                         receivers: Array.isArray(msg.receivers)
//                             ? msg.receivers.map(r => ({ ...r, isRead: true }))
//                             : msg.receivers
//                     }))
//                 );
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//
//         const hasUnreadMessages =
//             chatId &&
//             Array.isArray(messages) &&
//             messages.some(
//                 msg =>
//                     Array.isArray(msg.receivers) &&
//                     msg.receivers.some(
//                         r => r.receiverId === currentUser?.id && !r.isRead
//                     )
//             );
//
//
//         if (hasUnreadMessages) {
//             isReadMessage();
//         }
//     }, [chatId, setCount, messages, setMessages, messages.length, currentUser]);
//
//
//     const handleSend = async () => {
//         if (!newMessage.trim()) return;
//
//         try {
//             const sentMessage = await apiService.writeMessage({
//                 content: newMessage,
//                 receiver: chatUser?.map(u => u.id) || [],
//                 chatId: chatId
//             });
//             setMessages(prev => [...prev, sentMessage]);
//             setNewMessage("");
//             socket.emit(`send_message`, sentMessage);
//
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     const handleDeleteOrEdit = (messageId: number) => {
//         if (selectedMessageId === messageId) {
//             setSelectedMessageId(null);
//         } else {
//             setSelectedMessageId(messageId);
//         }
//     }
//
//     const handleDeleteMessage = async (messageId: number) => {
//         if (!messageId) return
//         try {
//             await apiService.deleteMessage(messageId);
//             setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
//             socket.emit("delete_message", {
//                 messageId,
//                 chatId
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     const handleEditClick = (msg) => {
//         setEditingMessageId(msg.id);
//         setEditedContent(msg.content);
//         setSelectedMessageId(null);
//     };
//
//     const handleSaveEdit = async (messageId: number) => {
//         try {
//             const updatedMessage = await apiService.editMessage(messageId, editedContent);
//             setMessages(prev =>
//                 prev.map(message =>
//                     message.id === messageId
//                         ? { ...message, content: updatedMessage.content }
//                         : message
//                 )
//             );
//
//             socket.emit("edit_message", { id: messageId, content: editedContent, chatId });
//
//             setEditingMessageId(null);
//             setEditedContent("");
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     return (
//         <div className="flex flex-col items-center bg-gray-100 p-6 gap-5">
//
//             <h1 className="text-2xl font-bold text-sky-700 mb-4">
//                 {chatUser && chatUser.length > 1
//                     ? `Chat with ${chatUser.map(u => u.firstName).join(", ")}`
//                     : `Chat with ${chatUser?.[0]?.firstName || "Chat"}`}
//             </h1>
//             <BackButton />
//
//             <div className="w-full max-w-md h-[500px] flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden">
//
//                 <div className="flex-1 p-4 overflow-y-auto space-y-3 h-[400px]">
//                     {messages.length === 0 ? (
//                         <p className="text-gray-500 text-center">No messages yet.</p>
//                     ) : (
//                         <AnimatePresence>
//                             {messages.map((msg) => {
//                                 if (!msg || !msg.sender?.id) return null;
//                                 const isMine = msg.sender?.id === currentUser?.id;
//
//                                 return (
//                                     <motion.div
//                                         key={msg.id}
//                                         className={`flex ${isMine ? "justify-end" : "justify-start"} gap-1`}
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}է
//                                         exit={{ opacity: 0, y: -20 }}
//                                         transition={{ duration: 0.25 }}
//                                     >
//                                         {!isMine && msg?.sender && (
//                                             <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-md font-semibold text-gray-700">
//                                                 {msg?.sender?.firstName[0]}
//                                                 {msg?.sender?.lastName[0]}
//                                             </div>
//                                         )}
//                                         <div
//                                             className={`max-w-[70%] px-4 py-2 rounded-lg text-sm
//                                                 ${isMine
//                                                 ? "bg-sky-500 text-white rounded-br-none"
//                                                 : "bg-gray-200 text-gray-800 rounded-bl-none"}
//                                                 cursor-pointer`}
//                                             onDoubleClick={() => (isMine ? handleDeleteOrEdit(msg.id) : null)}
//                                         >
//                                             {editingMessageId === msg.id ? (
//                                                 <div className="flex gap-2 items-center">
//                                                     <input
//                                                         type="text"
//                                                         value={editedContent}
//                                                         onChange={(e) => setEditedContent(e.target.value)}
//                                                         onKeyDown={(e) => {
//                                                             if (e.key === "Enter") handleSaveEdit(msg.id);
//                                                         }}
//                                                         className="w-full px-2 py-1 rounded text-gray-900"
//                                                     />
//                                                     <button
//                                                         onClick={() => handleSaveEdit(msg.id)}
//                                                         className="text-black text-sm"
//                                                     >
//                                                         Save
//                                                     </button>
//                                                 </div>
//                                             ) : (
//                                                 <>
//                                                     {msg.content}
//                                                     {selectedMessageId === msg.id && (
//                                                         <div className="flex bg-white border border-gray-200 shadow-lg rounded-lg w-28 ">
//                                                             <button
//                                                                 className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 text-gray-700"
//                                                                 onClick={() => handleEditClick(msg)}
//                                                             >
//                                                                 ✏️
//                                                             </button>
//                                                             <button
//                                                                 className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-red-100 text-red-600"
//                                                                 onClick={() => handleDeleteMessage(msg.id)}
//                                                             >
//                                                                 🗑
//                                                             </button>
//                                                         </div>
//                                                     )}
//                                                 </>
//                                             )}
//                                         </div>
//                                     </motion.div>
//                                 );
//                             })}
//                         </AnimatePresence>
//
//                     )}
//                     <div ref={messagesEndRef} />
//                 </div>
//
//                 <div className="border-t p-3 flex items-center bg-gray-50">
//                     <input
//                         type="text"
//                         placeholder="Type a message..."
//                         className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
//                         value={newMessage}
//                         ref={inputRef}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                                 handleSend();
//                             }
//                         }}
//                     />
//                     <button
//                         onClick={handleSend}
//                         className="ml-3 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }