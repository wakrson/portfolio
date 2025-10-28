export default function Portfolio() {
  return (
<main className="min-h-screen bg-neutral-100 text-neutral-900 font-sans">
  {/* Navbar */}
  <header className="flex flex-col md:flex-row justify-between items-center text-center md:text-left px-6 md:px-10 py-3 border-b border-neutral-200">
    {/* Name */}
    <h1 className="text-2xl font-semibold mb-2 md:mb-0">Mark Robinson</h1>

    {/* Contact Links */}
    <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
      <a href="https://www.linkedin.com/in/mialbro/" className="hover:text-indigo-600">
        LinkedIn
      </a>
      <a href="https://github.com/wakrson/" className="hover:text-indigo-600">
        GitHub
      </a>
      <a href="mailto:wakrson@gmail.com" className="hover:text-indigo-600">
        Contact
      </a>
    </div>
  </header>


  {/* Hero Section */}
  <section className="grid md:grid-cols-2 gap-6 items-center px-10 py-4">
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold leading-snug">
        AI Research Scientist @ <span className="text-indigo-600">Kostas Research Institute (KRI)</span>
      </h2>
      <p className="text-neutral-700 text-sm">
        <strong>MSc Robotics Engineering</strong> · Worcester Polytechnic Institute (2021) <br />
        <strong>BSc Computer Engineering</strong> · The University of Alabama (2020)
      </p>

      <p className="mt-2 text-neutral-700 text-sm max-w-lg">
        As a researcher at Kostas Research Institute, I develop and deploy advanced perception models, design semi-automated calibration interfaces for camera-LiDAR and cross-modal imaging systems, develop AR applications, among other projects. I'm motivated by my desire to learn, make the world a better place, and improve lives. When I am not writing code, you can find me playing basketball 🏀 or enjoying Downtown Boston or any of Cambridge's Squares
      </p>
    </div>

    <a
      href="https://www.dvidshub.net/image/7399177/structural-impact-assessment-scenario"
      target="_blank"
      rel="noopener noreferrer"
      className="relative block group"
    >
      <img
        src="/unrep.png"
        alt="Mark working on laptop in UAS lab"
        className="rounded-xl shadow-lg object-cover object-bottom w-full h-[320px] group-hover:brightness-90 transition-all duration-200"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
      <div className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
        Field Testing - Naval Research Site
      </div>
    </a>

      </section>

      {/* Skills */}
      <section className="px-10 py-4 bg-white border-t border-neutral-200">
        <h3 className="text-xl font-semibold ">Technical Skills</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-neutral-700 mb-1">Programming</h4>
            <p>C++, Python, Java</p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 mb-1">Frameworks</h4>
            <p>PyTorch, TensorRT, ROS 2, OpenCV, PCL, CGAL, GTSAM</p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 mb-1">Domains</h4>
            <p>Computer Vision / Perception, Camera Calibration, Sensor Fusion, SLAM, Embedded AI, Machine Learning, Robotics</p>
          </div>
        </div>
      </section>
    {/* Projects */}
    <section className="px-10 py-4 bg-neutral-50">
      <h3 className="text-xl font-semibold mb-6">Research Projects</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "taey",
            desc: "Developed a real-time RGB-D SLAM pipeline integrating TensorRT-accelerated ViT-32 embeddings for keyframe feature extraction, FAISS-based visual similarity search, and GTSAM iSAM2 for incremental pose graph optimization",
            link: "https://github.com/wakrson/taey",
          },
          {
            title: "U-Net",
            desc: "Semantic segmentation model trained on Cityscapes.",
            link: "https://github.com/wakrson/unet",
          },
        ].map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-xl bg-neutral-200 text-neutral-900 
                      border border-neutral-300 hover:bg-neutral-300 
                      hover:-translate-y-0.5 hover:shadow-md 
                      transition-all duration-200 text-sm focus:ring-2 
                      focus:ring-indigo-500 focus:outline-none"
          >
            <h4 className="text-lg font-semibold mb-2">{p.title}</h4>
            <p className="text-neutral-700 mb-3 leading-snug">{p.desc}</p>
            <span className="text-indigo-600 font-medium hover:text-indigo-700">
              View Project →
            </span>
          </a>
        ))}
      </div>
    </section>
{/* Articles & Media */}
<section className="px-10 py-8 bg-white border-t border-neutral-200">
  <h3 className="text-xl font-semibold mb-6">Articles & Media</h3>
  <div className="grid md:grid-cols-3 gap-6 text-sm">
    {[
      {
        title: "Repair Technology Exercise (REPTX) Distance Support",
        desc: "Image from the DVIDS article featuring the UNREP building exercise at NSWC PHD.",
        link: "https://www.dvidshub.net/image/7728105/repair-technology-exercise-reptx-distance-support"
      },
      {
        title: "REPTX Distance Support: Remote Support Capability Validated",
        desc: "Highlighted the remote technology-assist capabilities validated during the exercise.",
        link: "https://www.dvidshub.net/image/7731203/reptx-distance-support-remote-support-capability-validated"
      },
      {
        title: "Structural Impact Assessment Scenario",
        desc: "Self Defense Test Ship damage assessment as part of REPTX 2022.",
        link: "https://www.dvidshub.net/image/7399177/structural-impact-assessment-scenario"
      },
    ].map((a) => (
      <a
        key={a.title}
        href={a.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 rounded-xl bg-neutral-200 border border-neutral-300 
                   hover:bg-neutral-300 hover:-translate-y-0.5 hover:shadow-md 
                   transition-all duration-200 text-neutral-900"
      >
        <h4 className="text-lg font-semibold mb-1">{a.title}</h4>
        <p className="text-neutral-700 leading-snug mb-2">{a.desc}</p>
        <span className="text-indigo-600 font-medium hover:text-indigo-700">
          Read More →
        </span>
      </a>
    ))}
  </div>
</section>
    </main>
  );
}