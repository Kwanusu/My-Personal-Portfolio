const projects = [
  { id: 1, title: 'Innovet Tech School', desc: 'Enterprise LMS with secure automation.', tags: ['Django', 'Docker', 'PostgreSQL'] },
  { id: 2, title: 'Smart Print Ops', desc: 'Lifecycle management for industrial print.', tags: ['React', 'Node.js', 'Redux'] },
  { id: 3, title: 'GitOps Pipeline', desc: 'CI/CD with Trivy scanning and Terraform.', tags: ['Terraform', 'AWS', 'GitHub Actions'] }
];

const Projects = () => (
  <section id="work" className="py-20 container mx-auto px-6">
    <h2 className="text-3xl font-bold mb-12">Featured <span className="text-[#d4af37]">Work</span></h2>
    <div className="grid md:grid-cols-3 gap-8">
      {projects.map(p => (
        <div key={p.id} className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all group">
          <h3 className="text-xl font-bold mb-3 group-hover:text-[#d4af37]">{p.title}</h3>
          <p className="text-slate-400 text-sm mb-6">{p.desc}</p>
          <div className="flex gap-2 flex-wrap">
            {p.tags.map(t => <span key={t} className="text-[10px] bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full font-bold uppercase">{t}</span>)}
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default Projects;