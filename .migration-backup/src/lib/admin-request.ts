import { NextRequest } from 'next/server';
import { adminCookieName, isValidAdminSession } from './admin-auth';

export const isAdminRequest = (request: NextRequest) => isValidAdminSession(request.cookies.get(adminCookieName)?.value);
