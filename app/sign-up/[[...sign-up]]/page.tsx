import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <SignUp />
        </div>
    );
}

export default SignUpPage;
