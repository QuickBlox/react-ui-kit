export type QBInitParams = {
    appIdOrToken: string | number;
    authKeyOrAppId: string | number;
    authSecret?: string;
    accountKey: string;
    config?: QBConfig;
};
export declare function QBInit(params: QBInitParams): void;
export declare function QBCreateSession(params?: QBLoginParams): Promise<QBSession>;
export declare function QBGetSession(): Promise<QBSession>;
export declare function loginToQuickBlox(params: QBLoginParams): Promise<QBUser>;
export declare function QBLogin(params: QBLoginParams): Promise<{
    user: QBUser;
    session: QBSession;
}>;
export declare function QBLogout(): Promise<unknown>;
export declare function QBChatConnect(params: ChatConnectParams): Promise<unknown>;
export declare function QBChatDisconnect(): void;
export declare function registrationAccount(params: QBCreateUserParams): Promise<QBUser>;
export declare function QBUserCreate(params: QBCreateUserParams): Promise<{
    user: QBUser;
    session: QBSession;
}>;
export declare function QBUserUpdate(userId: QBUser['id'], user: Partial<QBUser>): Promise<QBUser>;
export declare function QBUserGet(params: GetUserParams | number): Promise<QBUser | undefined> | Promise<ListUserResponse>;
export declare function QBUsersGet(params: GetUserParams): Promise<ListUserResponse>;
export declare function QBUsersGetById(params: number): Promise<QBUser | undefined>;
export declare function QBUserList(params: ListUserParams): Promise<ListUserResponse | undefined>;
export declare function QBDataGet<T extends QBCustomObject>(className: string, filters: Dictionary<unknown>): Promise<{
    class_name: string;
    items: T[];
    limit: number;
    skip: number;
}>;
export declare function QBDataCreate<T extends QBCustomObject>(className: string, data: Dictionary<unknown>): Promise<T>;
export declare function QBDataDelete<T extends QBCustomObject['_id'] | Array<QBCustomObject['_id']>>(className: string, ids: T): Promise<QBDataDeletedResponse>;
export declare function QBDataUpdate<T extends QBCustomObject>(className: string, _id: T['_id'], data: Dictionary<unknown>): Promise<T>;
export declare function QBGetDialogs(filters: Dictionary<any>): Promise<QBGetDialogResult | undefined>;
export declare function QBGetDialogById(id: string): Promise<QBGetDialogResult | undefined>;
export declare function QBCreatePrivateDialog(userId: QBUser['id'], dialogName?: string, data?: Dictionary<unknown>): Promise<QBChatDialog>;
export declare function QBCreateGroupDialog(userIds: Array<QBUser['id']>, dialogName?: string, data?: Dictionary<unknown>): Promise<QBChatDialog>;
export declare function QBUpdateDialog(dialogId: QBChatDialog['_id'], data: Dictionary<unknown>): Promise<QBChatDialog>;
export declare function QBJoinDialog(dialogId: QBChatDialog['_id']): Promise<unknown>;
export declare function QBDeleteDialog(dialogIds: Array<QBChatDialog['_id']>): Promise<void>;
export declare function QBLeaveDialog(dialogId: QBChatDialog['_id']): Promise<unknown>;
export declare function QBGetInfoFile(fileId: QBContentObject['id']): Promise<unknown>;
export declare function QBDeleteContent(contentId: QBContentObject['id']): Promise<unknown>;
export declare function QBCreateAndUploadContent(paramContent: QBContentParam): Promise<unknown>;
export declare function QBChatGetMessages(dialogId: QBChatDialog['_id'], skip?: number, limit?: number): Promise<GetMessagesResult & {
    dialogId: QBChatDialog['_id'];
}>;
export declare function QBSendIsTypingStatus(dialog: QBChatDialog, senderId: QBUser['id']): void;
export declare function QBSendIsStopTypingStatus(dialog: QBChatDialog, senderId: QBUser['id']): void;
export declare function QBChatSendMessage(to: string, message: QBChatNewMessage): Promise<string>;
export declare function QBChatSendSystemMessage(to: QBUser['id'] | string, message: {
    extension: QBSystemMessage['extension'];
}): Promise<string>;
export declare function QBChatMarkMessageRead(params: QBMessageStatusParams): void;
export declare function QBWebRTCSessionGetUserMedia(session: QBWebRTCSession, params: QBGetUserMediaParams): Promise<MediaStream | undefined>;
