export type RoomsListType = {
    id: string;
    name: string;
    role: 'ADMIN' | 'MEMBER';
    admin: string; 
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

export type userType = {
    id: string;
    userId: string | null;
    name: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    image: string | null;
    room: roomType;
    createdAt?: Date;
    updatedAt?: Date;
}

export type roomType = {
    id: string;
    name: string | null;
    imageUrl: string | null;
    inviteCode: string | null;
    admin: string | null;
    user: userType;
    createdAt?: Date;
    updatedAt?: Date;
}
