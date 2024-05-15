export type RoomsListType = {
    id: string;
    name: string;
    role: 'ADMIN' | 'MEMBER'; 
    imageUrl?: string;
    inviteCode: string;
    createdAt?: Date;
    updatedAt?: Date;
};
 
export type MemberListType = {
    id: string;
    profileId: string;
    role: 'ADMIN' | 'MEMBER';
    createdAt?: Date;
    updatedAt?: Date;
    
}