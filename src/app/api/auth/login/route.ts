import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { department: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'DOCTOR' | 'ADMIN' | 'STAFF',
      departmentId: user.departmentId || undefined,
      roomNumber: user.roomNumber || user.department?.room || undefined,
    };

    const token = await signToken(tokenPayload);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      specialty: user.specialty,
      regNo: user.regNo,
      department: user.department?.name,
      roomNumber: user.roomNumber || user.department?.room,
    };

    const response = NextResponse.json({
      success: true,
      user: userResponse,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error('Error in /api/auth/login:', error);
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}
