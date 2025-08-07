import AuthLayout from "@/components/layout/AuthLayout";
import BlogHistory from "@/components/blog/BlogHistory";

const HistoryPage = () => {
  return (
    <AuthLayout requireAuth>
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

      {/* 🌫 Overlay for readability */}
      <div className="fixed inset-0 bg-black/60 z-10" />

      {/* 📝 Content */}
      <div className="relative z-20 container py-12">
        <BlogHistory />
      </div>
    </AuthLayout>
  );
};

export default HistoryPage;
