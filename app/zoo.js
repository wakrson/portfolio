import { useMemo, useState } from "react";

type ModelEntry = {
  name: string;
  task: string;            // e.g., "Detection", "Segmentation", "Embeddings"
  framework: string;       // e.g., "TensorRT", "ONNX", "PyTorch"
  format: string;          // e.g., "engine", "onnx", "pt"
  sizeMB: number;
  input: string;           // e.g., "1x3x640x640"
  precision: string;       // e.g., "FP16", "INT8"
  dataset?: string;        // optional
  metric?: string;         // e.g., "mAP 0.51"
  notes?: string;
  link: string;            // direct download or repo/releases link
};

const modelZoo: ModelEntry[] = [
  {
    name: "YOLOv8n (TensorRT)",
    task: "Detection",
    framework: "TensorRT",
    format: "engine",
    sizeMB: 12,
    input: "1x3x640x640",
    precision: "FP16",
    dataset: "COCO",
    metric: "mAP 0.37",
    notes: "Real-time baseline",
    link: "https://your-link.com/yolov8n_fp16.engine",
  },
  {
    name: "U-Net Cityscapes",
    task: "Segmentation",
    framework: "PyTorch",
    format: "pt",
    sizeMB: 180,
    input: "1x3x512x1024",
    precision: "FP32",
    dataset: "Cityscapes",
    metric: "mIoU 0.xx",
    notes: "Training pipeline + checkpoints",
    link: "https://github.com/wakrson/unet/releases",
  },
];

function Chip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700">
      {text}
    </span>
  );
}

export function ModelZooSection() {
  const [q, setQ] = useState("");
  const [task, setTask] = useState<string>("All");
  const [framework, setFramework] = useState<string>("All");

  const tasks = useMemo(() => ["All", ...Array.from(new Set(modelZoo.map(m => m.task)))], []);
  const frameworks = useMemo(() => ["All", ...Array.from(new Set(modelZoo.map(m => m.framework)))], []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return modelZoo.filter(m => {
      const matchesQuery =
        !query ||
        `${m.name} ${m.task} ${m.framework} ${m.format} ${m.precision} ${m.dataset ?? ""} ${m.metric ?? ""} ${m.notes ?? ""}`
          .toLowerCase()
          .includes(query);

      const matchesTask = task === "All" || m.task === task;
      const matchesFramework = framework === "All" || m.framework === framework;

      return matchesQuery && matchesTask && matchesFramework;
    });
  }, [q, task, framework]);

  return (
    <section id="model-zoo" className="border-y border-neutral-200 bg-indigo-50/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              Model Zoo <span className="text-indigo-600">Weights & Specs</span>
            </h3>
            <p className="mt-1 text-sm text-neutral-700">
              Downloadable checkpoints/engines with input shapes, precision, and notes for deployment.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 md:mt-0 md:flex-row md:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search models (e.g., TensorRT, FP16, SLAM)…"
              className="w-full md:w-[320px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {tasks.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {frameworks.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Model</th>
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
                {filtered.map((m) => (
                  <tr key={m.name} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-neutral-900">{m.name}</div>
                      {(m.notes || m.dataset) && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {m.dataset && <Chip text={m.dataset} />}
                          {m.notes && <span className="text-xs text-neutral-600">{m.notes}</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{m.task}</td>
                    <td className="px-4 py-3 text-neutral-700">{m.framework}</td>
                    <td className="px-4 py-3 text-neutral-700">{m.format}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-700">{m.input}</td>
                    <td className="px-4 py-3 text-neutral-700">{m.precision}</td>
                    <td className="px-4 py-3 text-neutral-700">{m.sizeMB} MB</td>
                    <td className="px-4 py-3 text-neutral-700">{m.metric ?? "-"}</td>
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

                {filtered.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-neutral-600" colSpan={9}>
                      No models match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-600 md:flex-row md:items-center md:justify-between">
            <span>{filtered.length} model(s)</span>
            <span>
              Tip: host weights on GitHub Releases / Hugging Face / public cloud bucket and link them here.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
