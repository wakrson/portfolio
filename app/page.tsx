"use client";

import { useEffect, useMemo, useState } from "react";

type ModelFolder = {
  id: string;
  name: string;
  fileId: string | null;
  fileSizeBytes: number;
  fileCount: number;
};

type ModelMeta = {
  task: string;
  framework: string;
  format: string;
  precision: string;
  input: string;
  dataset?: string;
  metric?: string;
  link?: string;
};

const MODEL_META: Record<string, ModelMeta> = {
  rtdetrv2_r50vd_6x_coco_ema: {
    task: "Object Detection", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x640x640", dataset: "COCO",
  },
  rtdetrv2_r50vd_m_7x_coco_ema: {
    task: "Object Detection", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x640x640", dataset: "COCO",
  },
  rtdetrv2_r34vd_120e_coco_ema: {
    task: "Object Detection", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x640x640", dataset: "COCO",
  },
  rtdetrv2_r18vd_120e_coco_rerun_48: {
    task: "Object Detection", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x640x640", dataset: "COCO",
    link: "https://drive.google.com/uc?export=download&id=1P9w_KbZfhm7Rv0nKTNnFn4vwG7i4j1Fp",
  },
  rtdetrv2_r101vd_6x_coco_from_paddle: {
    task: "Object Detection", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x640x640", dataset: "COCO",
  },
  depth_anything_v2_metric_hypersim_vitl: {
    task: "Monocular Depth Estimation", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x518x518", dataset: "Hypersim",
    link: "https://drive.google.com/uc?export=download&id=18_1GkpPiGazCnWNrBSJvqCE71Uf5LnL1",
  },
  depth_anything_v2_metric_vkitti_vits: {
    task: "Monocular Depth Estimation", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x518x518", dataset: "VKITTI",
  },
  depth_anything_v2_metric_vkitti_vitb: {
    task: "Monocular Depth Estimation", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x518x518", dataset: "VKITTI",
  },
  depth_anything_v2_metric_hypersim_vitb: {
    task: "Monocular Depth Estimation", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x518x518", dataset: "Hypersim",
  },
  depth_anything_v2_metric_hypersim_vits: {
    task: "Monocular Depth Estimation", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x518x518", dataset: "Hypersim",
  },
  depth_anything_v2_metric_vkitti_vitl: {
    task: "Monocular Depth Estimation", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x518x518", dataset: "VKITTI",
  },
  unet_cityscapes: {
    task: "Semantic Segmentation", framework: "Pytorch", format: "ONNX", precision: "FP32", input: "1x3x256x256", dataset: "Cityscapes",
  },
};

function formatSize(bytes: number): string {
  if (bytes === 0) return "\u2014";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function downloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export default function Portfolio() {
  const [q, setQ] = useState("");
  const [folders, setFolders] = useState<ModelFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const res = await fetch("/api/drive");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFolders(data.folders);
      } catch {
        setError("Failed to load models from Google Drive");
      } finally {
        setLoading(false);
      }
    }
    fetchFolders();
  }, []);

  const filteredModels = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return folders;
    return folders.filter((f) => {
      const meta: Partial<ModelMeta> = MODEL_META[f.name] || {};
      return `${f.name} ${meta.task || ""} ${meta.framework || ""} ${meta.format || ""} ${meta.precision || ""}`
        .toLowerCase()
        .includes(query);
    });
  }, [q, folders]);

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900 font-sans">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center text-center md:text-left px-6 md:px-10 py-3 border-b border-neutral-200">
        <h1 className="text-2xl font-semibold mb-2 md:mb-0">Mark Robinson</h1>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
          <a href="https://www.linkedin.com/in/mialbro/" className="hover:text-indigo-600">LinkedIn</a>
          <a href="https://github.com/wakrson/" className="hover:text-indigo-600">GitHub</a>
          <a href="mailto:wakrson@gmail.com" className="hover:text-indigo-600">Contact</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-6 items-center px-10 py-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold leading-snug">
            AI Research Scientist @ <span className="text-indigo-600">Kostas Research Institute (KRI)</span>
          </h2>
          <p className="text-neutral-700 text-sm">
            <strong>MSc Robotics Engineering</strong> &middot; Worcester Polytechnic Institute (2021) <br />
            <strong>BSc Computer Engineering</strong> &middot; The University of Alabama (2020)
          </p>
          <p className="mt-2 text-neutral-700 text-sm max-w-lg">
            As a researcher at Kostas Research Institute, I develop and deploy advanced perception models, design semi-automated calibration interfaces for camera-LiDAR and cross-modal imaging systems, develop AR applications, among other projects. I&#39;m motivated by my desire to learn, make the world a better place, and improve lives. When I am not writing code, you can find me playing basketball or enjoying Downtown Boston or any of Cambridge&#39;s Squares
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
      <section id="model-zoo" className="px-10 py-8 bg-indigo-50/40 border-t border-neutral-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              Model Zoo <span className="text-indigo-600">Exported Model Weights</span>
            </h3>
            <p className="text-sm text-neutral-700 mt-1">Downloadable model artifacts</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="w-full md:w-[320px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          {loading ? (
            <div className="px-4 py-12 text-center text-sm text-neutral-500">Loading models...</div>
          ) : error ? (
            <div className="px-4 py-12 text-center text-sm text-red-600">{error}</div>
          ) : (
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-700 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Model Name</th>
                    <th className="px-4 py-3 font-semibold">Task</th>
                    <th className="px-4 py-3 font-semibold">Framework</th>
                    <th className="px-4 py-3 font-semibold">Format</th>
                    <th className="px-4 py-3 font-semibold">Input</th>
                    <th className="px-4 py-3 font-semibold">Prec</th>
                    <th className="px-4 py-3 font-semibold">Size</th>
                    <th className="px-4 py-3 font-semibold">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredModels.map((f) => {
                    const meta = MODEL_META[f.name];
                    return (
                      <tr key={f.id} className="hover:bg-neutral-50">
                        <td className="px-4 py-3 font-semibold text-neutral-900">{f.name}</td>
                        <td className="px-4 py-3 text-neutral-700">{meta?.task || "\u2014"}</td>
                        <td className="px-4 py-3 text-neutral-700">{meta?.framework || "\u2014"}</td>
                        <td className="px-4 py-3 text-neutral-700">{meta?.format || "\u2014"}</td>
                        <td className="px-4 py-3 font-mono text-xs text-neutral-700">{meta?.input || "\u2014"}</td>
                        <td className="px-4 py-3 text-neutral-700">{meta?.precision || "\u2014"}</td>
                        <td className="px-4 py-3 text-neutral-700">{formatSize(f.fileSizeBytes)}</td>
                        <td className="px-4 py-3">
                          {f.fileId ? (
                            <a
                              href={downloadUrl(f.fileId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-indigo-600 hover:text-indigo-700"
                            >
                              Download
                            </a>
                          ) : meta?.link ? (
                            <a
                              href={meta.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-indigo-600 hover:text-indigo-700"
                            >
                              Download
                            </a>
                          ) : (
                            <span className="text-neutral-400">No ONNX</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredModels.length === 0 && (
                    <tr>
                      <td className="px-4 py-6 text-neutral-600" colSpan={8}>No models match your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
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
              desc: "Google Cloud hosted perception ML platform. Utilizing WebRTC for browser-to-server communications, FastAPI for web architecture, and TensorRT compiled visual models for real-time performance. Containerized backend with dependencies and deployment recipes",
              link: "https://github.com/wakrson/wiys",
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
              className="block p-5 rounded-xl bg-neutral-200 text-neutral-900 border border-neutral-300 hover:bg-neutral-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <h4 className="text-lg font-semibold mb-2">{p.title}</h4>
              <p className="text-neutral-700 mb-3 leading-snug">{p.desc}</p>
              <span className="text-indigo-600 font-medium hover:text-indigo-700">View Project</span>
            </a>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="px-10 py-4 bg-white border-t border-neutral-200">
        <h3 className="text-xl font-semibold">Technical Skills</h3>
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
        <h3 className="text-xl font-semibold mb-6">Articles &amp; Media</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {[
            {
              title: "Repair Technology Exercise (REPTX) Distance Support",
              desc: "Image from the DVIDS article featuring the UNREP building exercise at NSWC PHD.",
              link: "https://www.dvidshub.net/image/7728105/repair-technology-exercise-reptx-distance-support",
            },
            {
              title: "REPTX Distance Support: Remote Support Capability Validated",
              desc: "Highlighted the remote technology-assist capabilities validated during the exercise.",
              link: "https://www.dvidshub.net/image/7731203/reptx-distance-support-remote-support-capability-validated",
            },
            {
              title: "Structural Impact Assessment Scenario",
              desc: "Self Defense Test Ship damage assessment as part of REPTX 2022.",
              link: "https://www.dvidshub.net/image/7399177/structural-impact-assessment-scenario",
            },
          ].map((a) => (
            <a
              key={a.title}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl bg-neutral-200 border border-neutral-300 hover:bg-neutral-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-neutral-900"
            >
              <h4 className="text-lg font-semibold mb-1">{a.title}</h4>
              <p className="text-neutral-700 leading-snug mb-2">{a.desc}</p>
              <span className="text-indigo-600 font-medium hover:text-indigo-700">Read More</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}