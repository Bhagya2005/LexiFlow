import AuthLayout from "@/components/layout/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <AuthLayout>
      {/* 🔁 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://cdn.pixabay.com/video/2023/07/08/170655-843752693_tiny.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* 🌫 Overlay */}
      <div className="fixed inset-0 bg-black/60 z-10" />

      {/* 📝 Signup Content */}
      <div className="relative z-20 mt-28 container flex h-[80vh] items-center justify-center">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
          <SignupForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
