import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            post(route('verification.send'));
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <Head title="Email Verification" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Verify your email</CardTitle>
                        <CardDescription>
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
            {status === 'verification-link-sent' && (
                            <Alert className="mb-4">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertDescription>
                                    A new verification link has been sent to your email address.
                                </AlertDescription>
                            </Alert>
            )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <form onSubmit={submit} className="w-full">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                        Resend Verification Email
                            </Button>
                        </form>
                        <form method="post" action={route('logout')} className="w-full">
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full"
                    >
                        Log Out
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
                </div>
        </>
    );
}
