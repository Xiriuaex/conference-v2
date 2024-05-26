import { auth } from '@/auth';
import { NextRequest } from 'next/server';

export default auth(async (request: NextRequest) => {
    const currentUser = await auth();
    
    if (!currentUser?.user && !request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/login', request.url))
    }   
 
  })
  
export const config = {   
    matcher: ["/user", "/user/:id*", "/room/:id*"] 
}