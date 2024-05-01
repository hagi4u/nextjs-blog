import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated') {
    return NextResponse.redirect(
      new URL(
        `/admin?redirect=${encodeURIComponent(request.url)}`,
        request.url,
      ),
    );
  }
  return response;
}

export const config = {
  matcher: '/write',
};
