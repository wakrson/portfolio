"use client";

import { useMemo, useState } from "react";


export default function Portfolio() {
  const MODEL_ZOO = [
    {
      name: "Depth Anyting V2",
      task: "Monocular Depth Estimation",
      framework: "Pytorch",
      format: "ONNX",
      precision: "FP32",
      sizeMB: 1300,
      input: "1x3x518x518",
      dataset: "",
      metric: "",
      link: "https://drive.google.com/uc?export=download&id=18_1GkpPiGazCnWNrBSJvqCE71Uf5LnL1",
    },
    {
      name: "DINOv3 Convnext Base pretrain lvd1689m",
      task: "Image Embedding",
      framework: "Pytorch",
      format: "ONNX",
      precision: "FP32",
      sizeMB: 350.4,
      input: "1x3x224x224",
      dataset: "",
      metric: "",
      link: "https://drive.google.com/uc?export=download&id=1vWMIh4WkS0tQijyTeLY74OHH3lbClE1i",
    },
    {
      name: "RTDETRv2 r18vd_120e coco rerun48",
      task: "Object Detection",
      framework: "Pytorch",
      format: "ONNX",
      precision: "FP32",
      sizeMB: 80.4,
      input: "1x3x640x640",
      dataset: "",
      metric: "",
      link: "https://drive.google.com/uc?export=download&id=1P9w_KbZfhm7Rv0nKTNnFn4vwG7i4j1Fp",
    },

  ];

  const [q, setQ] = useState("");
  const [taskFilter, setTaskFilter] = useState("All");
  const [fwFilter, setFwFilter] = useState("All");

  const tasks = useMemo(
    () => ["All", ...Array.from(new Set(MODEL_ZOO.map((m) => m.task)))],
    []
  );
  const frameworks = useMemo(
    () => ["All", ...Array.from(new Set(MODEL_ZOO.map((m) => m.framework)))],
    []
  );

  const filteredModels = useMemo(() => {
    const query = q.trim().toLowerCase();
    return MODEL_ZOO.filter((m) => {
      const matchesQuery =
        !query ||
        `${m.name} ${m.task} ${m.framework} ${m.format} ${m.precision} ${m.dataset || ""} ${m.metric || ""}`
          .toLowerCase()
          .includes(query);

      const matchesTask = taskFilter === "All" || m.task === taskFilter;
      const matchesFw = fwFilter === "All" || m.framework === fwFilter;

      return matchesQuery && matchesTask && matchesFw;
    });
  }, [q, taskFilter, fwFilter]);


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

{/* Model Zoo */}
<section
  id="model-zoo"
  className="px-10 py-8 bg-indigo-50/40 border-t border-neutral-200"
>
  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
    <div>
      <h3 className="text-xl font-semibold">
        Model Zoo <span className="text-indigo-600">Weights & Specs</span>
      </h3>
      <p className="text-sm text-neutral-700 mt-1">
        Downloadable model artifacts
      </p>
    </div>

    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        className="w-full md:w-[320px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      />

    </div>
  </div>

  <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-neutral-50 text-neutral-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Model Name</th>
            <th className="px-4 py-3 font-semibold">Task</th>
            <th className="px-4 py-3 font-semibold">Framework</th>
            <th className="px-4 py-3 font-semibold">Format</th>
            <th className="px-4 py-3 font-semibold">Input</th>
            <th className="px-4 py-3 font-semibold">Prec</th>
            <th className="px-4 py-3 font-semibold">Size</th>
            <th className="px-4 py-3 font-semibold">Metric</th>
            <th className="px-4 py-3 font-semibold">Link</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-200">
          {filteredModels.map((m) => (
            <tr key={m.name} className="hover:bg-neutral-50">
              <td className="px-4 py-3">
                <div className="font-semibold text-neutral-900">{m.name}</div>
                {(m.dataset || "") && (
                  <div className="text-xs text-neutral-600 mt-1">{m.dataset}</div>
                )}
              </td>
              <td className="px-4 py-3 text-neutral-700">{m.task}</td>
              <td className="px-4 py-3 text-neutral-700">{m.framework}</td>
              <td className="px-4 py-3 text-neutral-700">{m.format}</td>
              <td className="px-4 py-3 font-mono text-xs text-neutral-700">
                {m.input}
              </td>
              <td className="px-4 py-3 text-neutral-700">{m.precision}</td>
              <td className="px-4 py-3 text-neutral-700">{m.sizeMB} MB</td>
              <td className="px-4 py-3 text-neutral-700">{m.metric || "-"}</td>
              <td className="px-4 py-3">
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Download →
                </a>
              </td>
            </tr>
          ))}

          {filteredModels.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-neutral-600" colSpan={9}>
                No models match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
      <span>{filteredModels.length} model(s)</span>
    </div>
  </div>
</section>

    {/* Projects */}
    <section className="px-10 py-4 bg-neutral-50">
      <h3 className="text-xl font-semibold mb-6">Research Projects</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "mss",
            desc: "Monocular Semantic SLAM pipeline utilizing TensorRT-accelerated Depth Anything v2, RTDETRv2, and DINOv3 models for depth estimation, object detection, and scene recognition/object tracking",
            link: "https://github.com/wakrson/mss",
          },
          {
            title: "wiys?",
            desc: "Google Cloud hosted perception ML platform. Utilizing WebRTC for browser-to-server communications, FastAPI for web architecture, and TensorRT compiled visual models for real-time performance. Containerized backend with dependencies and deploment recipes",
            link: "https://wiyscv.com",
          },
          {
            title: "taey",
            desc: "Real-time RGB-D SLAM pipeline integrating TensorRT-accelerated ViT-32 embeddings for keyframe feature extraction, FAISS-based visual similarity search, and GTSAM iSAM2 for incremental pose graph optimization",
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

  {/* Skills */}
  <section className="px-10 py-4 bg-white border-t border-neutral-200">
    <h3 className="text-xl font-semibold ">Technical Skills</h3>
    <div className="grid md:grid-cols-3 gap-4 text-sm">
      <div>
        <h4 className="font-medium text-neutral-700 mb-1">Programming</h4>
        <p>C++, Python</p>
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