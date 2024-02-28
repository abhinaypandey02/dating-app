import type {NextRequest} from "next/server";
import { NextResponse} from "next/server";

const allowedOrigins = [
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
];
export function middleware(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });
    const origin = request.headers.get('origin');
    if ( origin && allowedOrigins.includes(origin) ) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Credentials', "true")
        response.headers.set('Access-Control-Allow-Headers', "*")
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    }
    return response
}