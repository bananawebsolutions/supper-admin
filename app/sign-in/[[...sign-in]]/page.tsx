import { SignIn } from "@clerk/nextjs";

function SignInPage() {
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <SignIn />
        </div>
    );
}

export default SignInPage;
