import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PROJECT DATA ASSETS
 */
const projects = [
  { 
    id: 1, 
    title: 'Innovet Tech School', 
    problem: 'Instructors required dynamic, granular permissions to manage course data while ensuring strict multi-tenant student data isolation.',
    solution: 'Implemented Django with custom permissions managers. Containerized with Docker and scaled across PostgreSQL replication clusters. Integrated with Trivy to scan core container images on commit.',
    tags: ['Django', 'Docker', 'PostgreSQL'],
    metric: '99.9% Uptime',
    category: 'Fullstack / DevSecOps',
    repoUrl: 'https://github.com/Kwanusu/Innovet-Tech-School.git',
    liveUrl: 'https://innovet-tech-school-d3h1qcagz-kwanusu-josephs-projects.vercel.app',
    terminalFiles: [
      { name: 'permissions.py', language: 'python', code: 'class IsInstructor(BasePermission):\n    def has_object_permission(self, request, view, obj):\n        return obj.tenant_id == request.user.tenant_id' },
      { name: 'docker-compose.yml', language: 'yaml', code: 'services:\n  app:\n    build: .\n    deploy:\n      replicas: 3\n      restart_policy: always' },
      { name: 'security_scan.sh', language: 'bash', code: 'trivy image lms-core:latest --severity HIGH,CRITICAL' }
    ]
  },
  { 
    id: 2, 
    title: 'Smart Print Ops', 
    desc: 'Industrial-grade lifecycle management system. Real-time monitoring of print clusters with Redux-driven state management.', 
    problem: 'Managing thousands of concurrent print jobs across distributed hardware without state desync or data loss.',
    solution: 'Built a robust Node.js middleware layer with Redux-toolkit for predictable state transitions and a React frontend for real-time visualization.',
    tags: ['React', 'Node.js', 'Redux'],
    metric: '40% Efficiency Gain',
    category: 'Product Engineering',
    repoUrl: 'https://github.com/Kwanusu/smart_print_shop.git',
    liveUrl: null,
    terminalFiles: [
      { name: 'store.js', language: 'javascript', code: 'const printSlice = createSlice({\n  name: "jobs",\n  initialState,\n  reducers: { updateStatus: (state, action) => { ... } }\n})' },
      { name: 'cluster-monitor.js', language: 'javascript', code: 'const socket = io(process.env.CLUSTER_URL);\nsocket.on("print_update", (data) => dispatch(updateStatus(data)));' }
    ]
  },
  { 
    id: 3, 
    title: 'GitOps Pipeline', 
    desc: 'Automated CI/CD infrastructure with Trivy vulnerability scanning, Terraform IaaC, and automated AWS deployments.', 
    problem: 'Manual deployments were causing environmental drift and security vulnerabilities in the production cloud.',
    solution: 'Developed a GitOps workflow using GitHub Actions and Terraform to ensure infrastructure-as-code (IaaC) consistency and automated security gates.',
    tags: ['Terraform', 'AWS', 'GitHub Actions'],
    metric: 'Zero Manual Deploys',
    category: 'Cloud Infrastructure',
    repoUrl: 'https://github.com/Kwanusu/DevOps-Capstone.git',
    liveUrl: null,
    terminalFiles: [
      { name: 'main.tf', language: 'hcl', code: 'resource "aws_instance" "app_server" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t2.micro"\n}' },
      { name: 'ci-cd.yml', language: 'yaml', code: 'jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Terraform Apply\n        run: terraform apply -auto-approve' }
    ]
  }
];

const GitHubStats = ({ repoUrl }) => {
  const [stats, setStats] = useState({ stars: 0, forks: 0, loading: true });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const repoPath = repoUrl.replace('https://github.com/', '');
        const res = await fetch(`https://api.github.com/repos/${repoPath}`);
        const data = await res.json();
        setStats({ 
          stars: data.stargazers_count || 0, 
          forks: data.forks_count || 0, 
          loading: false 
        });
      } catch (e) {
        setStats({ stars: 0, forks: 0, loading: false });
      }
    };
    if (repoUrl) fetchStats();
  }, [repoUrl]);

  if (stats.loading) return <div className="animate-pulse text-[10px] text-muted-foreground font-mono">LINKING_REMOTE_DATA...</div>;

  return (
    <div className="flex gap-4 font-mono text-[10px] text-muted-foreground">
      <div className="flex items-center gap-1.5"><i className="fa-solid fa-star text-primary"></i> {stats.stars} STARS</div>
      <div className="flex items-center gap-1.5"><i className="fa-solid fa-code-fork"></i> {stats.forks} FORKS</div>
    </div>
  );
};

const Terminal = ({ project }) => {
  const [activeFile, setActiveFile] = useState(project.terminalFiles[0]);

  return (
    <div className="bg-[#020617] border border-border rounded-2xl p-4 lg:p-6 font-mono text-xs lg:text-sm h-[400px] lg:h-[500px] flex flex-col shadow-2xl">
      <div className="flex items-center gap-2 pb-4 border-b border-white/5 mb-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/30" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
          <div className="w-3 h-3 rounded-full bg-green-500/30" />
        </div>
        <div className="text-slate-500 text-[10px] tracking-widest uppercase ml-2">
          $ {activeFile.name}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 border-b border-white/5">
        {project.terminalFiles.map(file => (
          <button
            key={file.name}
            onClick={() => setActiveFile(file)}
            className={`px-3 py-2 whitespace-nowrap rounded-t-lg transition-all ${
              activeFile.name === file.name 
                ? 'bg-white/5 text-primary border-b-2 border-primary' 
                : 'text-slate-500 hover:text-white'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.pre 
          key={activeFile.name}
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -5 }}
          className="flex-1 overflow-auto text-slate-300 p-2 leading-relaxed custom-scrollbar selection:bg-primary/30"
        >
          <code>{activeFile.code}</code>
        </motion.pre>
      </AnimatePresence>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProject]);

  return (
    <section id="work" className="py-32 container mx-auto px-6 relative transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-foreground tracking-tighter">
            Featured <span className="text-primary italic">Artifacts</span>
          </h2>
          <p className="text-muted-foreground max-w-md">
            Enterprise-grade systems designed for scalability, security, and high-performance throughput.
          </p>
        </div>
        <div className="hidden md:block h-[1px] flex-1 bg-border mx-12 mb-4"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onClick={() => setSelectedProject(p)}
            className="group relative bg-card border border-border rounded-3xl p-8 cursor-pointer hover:border-primary/40 transition-all hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.2)]"
          >
            <div className="absolute top-8 right-8 h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
              <i className="fa-solid fa-code-branch text-xs"></i>
            </div>
            
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[3px] text-primary font-bold">{p.category}</span>
              <h3 className="text-2xl font-black text-foreground">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{p.desc || p.problem}</p>
              
              <div className="flex items-center gap-3 py-2 px-3 bg-background rounded-xl border border-border w-fit">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-foreground tracking-wider">{p.metric}</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {p.tags.map(t => (
                  <span key={t} className="text-[9px] font-mono bg-background border border-border text-muted-foreground px-2 py-1 rounded-md uppercase">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="container mx-auto max-w-7xl"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="space-y-3">
                  <h2 className="text-3xl lg:text-5xl font-black text-foreground tracking-tighter">
                    {selectedProject.title} <span className="text-primary italic">Deep Dive</span>
                  </h2>
                  <GitHubStats repoUrl={selectedProject.repoUrl} />
                </div>
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="w-12 h-12 rounded-full bg-card border border-border hover:bg-red-500/20 hover:text-red-500 transition-all flex items-center justify-center"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-10">
                  <div className="space-y-3">
                    <h4 className="text-primary uppercase tracking-widest text-[10px] font-bold">The Challenge</h4>
                    <p className="text-foreground text-lg lg:text-xl leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-primary uppercase tracking-widest text-[10px] font-bold">The Architecture</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                  </div>
                  <div className="pt-6 border-t border-border flex flex-wrap gap-4">
                    <a 
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-black px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-primary-hover transition-all"
                    >
                      <i className="fa-brands fa-github"></i> View Repository
                    </a>
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-border text-foreground px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-card transition-all"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-primary"></i> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <Terminal project={selectedProject} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;