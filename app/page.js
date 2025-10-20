export default function Portfolio() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-4 border-b border-neutral-200">
        <h1 className="text-2xl font-semibold">Mark Robinson</h1>
        <div className="flex gap-6 items-center text-sm">
          <a href="https://www.linkedin.com/in/mialbro/" className="hover:text-indigo-600">LinkedIn</a>
          <a href="https://www.github.com/wakrson/" className="hover:text-indigo-600">GitHub</a>
          <a href="mailto:wakrson@gmail.com" className="hover:text-indigo-600">Contact</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-6 items-center px-10 py-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold leading-snug">
            AI Research Scientist @ <span className="text-indigo-600">Northeastern University</span>
          </h2>
          <p className="text-neutral-600 text-sm">
            MSc Robotics Engineering · Worcester Polytechnic Institute (2021) <br />
            BSc Computer Engineering · The University of Alabama (2020)
          </p>
          <p className="mt-2 text-neutral-700 text-sm max-w-lg">
            As a researcher at Northeastern University, I focus on advancing autonomous perception and intelligent systems. With a strong foundation in robotics engineering and computer vision, my work integrates multi-sensor data and real-time inference to improve how machines perceive and interact with complex environments.
          </p>
        </div>

        <div className="relative">
          <img
            src="/unrep.png"
            alt="Mark working on laptop in UAS lab"
            className="rounded-xl shadow-lg object-cover object-bottom w-full h-[320px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
          <div className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
            Field Testing - Naval Research Site
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-10 py-10 bg-white border-t border-neutral-200">
        <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-neutral-700 mb-1">Programming</h4>
            <p>C++, Python, CUDA</p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 mb-1">Frameworks</h4>
            <p>PyTorch, TensorRT, ROS 2, OpenCV, PCL, CGAL, GTSAM</p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 mb-1">Domains</h4>
            <p>Computer Vision, Perception, Sensor Fusion, SLAM, Embedded AI, Machine Learning</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-10 py-12 bg-neutral-50">
        <h3 className="text-xl font-semibold mb-6">Projects</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "PointFusionV2",
              desc: "Multi-modal 3D object detection pipeline using RGB + LiDAR fusion.",
              link: "https://github.com/wakrson/pointfusion",
            },
            {
              title: "taey",
              desc: "C++/ROS2-based RGB-D SLAM system with real-time visualization.",
              link: "https://github.com/wakrson/taey",
            },
            {
              title: "U-Net",
              desc: "Semantic segmentation model trained on Cityscapes and deployed with TensorRT.",
              link: "https://github.com/wakrson/unet",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-neutral-200 text-sm"
            >
              <h4 className="text-lg font-semibold mb-1">{p.title}</h4>
              <p className="text-neutral-700 mb-3 leading-snug">{p.desc}</p>
              <a
                href={p.link}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}