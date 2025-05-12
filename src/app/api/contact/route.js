import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // You'll need to setup an email service like nodemailer or use a service like SendGrid
    // For now, we'll just log the data and return success
    console.log('Contact Form Submission:', { name, email, message });

    // Here you would typically send the email using your preferred method
    // Example: await sendEmail({ to: 'xiubi08@gmail.com', from: email, subject: `Message from ${name}`, text: message });

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
