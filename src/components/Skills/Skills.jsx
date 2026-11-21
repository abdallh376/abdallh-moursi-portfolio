// ============================================
// COMPONENT — Skills
// ============================================

import { motion } from 'framer-motion';
import { Code2, Layers, Database, Star } from 'lucide-react';
import { skillCategories } from '../../data/skills.js';
import { useInView } from '../../hooks/useInView.js';

// ── Icon map ──────────────────────────────────
const ICON_MAP = {
  code:     Code2,
  layers:   Layers,
  database: Database,
  star:     Star,
};

// ── Animation variants ────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Progress Bar ──────────────────────────────
function ProgressBar({ percent, color, inView, index }) {
  return (
    <div
      style={{
        height: 7,
        borderRadius: 999,
        background: 'var(--progress-track)',
        overflow: 'hidden',
        marginTop: '0.4rem',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${percent}%` : 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1 + index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          height: '100%',
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 8px ${color}55`,
        }}
      />
    </div>
  );
}

// ── Badge (null percent) ──────────────────────
function Badge({ label, color }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.65rem',
        borderRadius: 999,
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.03em',
        background: `${color}20`,
        color: color,
        border: `1px solid ${color}50`,
      }}
    >
      {label}
    </span>
  );
}

// ── Skill Row ─────────────────────────────────
function SkillRow({ skill, color, inView, index }) {
  const hasBar = skill.percent !== null && skill.percent !== undefined;

  return (
    <div style={{ marginBottom: hasBar ? '1rem' : '0.6rem' }}>
      {/* Name + value row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: hasBar ? '0' : '0.25rem',
        }}
      >
        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {skill.name}
        </span>

        {hasBar ? (
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: color,
              minWidth: '2.5rem',
              textAlign: 'right',
            }}
          >
            {skill.percent}%
          </span>
        ) : (
          <Badge label={skill.label || 'Skilled'} color={color} />
        )}
      </div>

      {/* Animated bar */}
      {hasBar && (
        <ProgressBar
          percent={skill.percent}
          color={color}
          inView={inView}
          index={index}
        />
      )}
    </div>
  );
}

// ── Category Card ─────────────────────────────
function CategoryCard({ category }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const Icon = ICON_MAP[category.icon] ?? Star;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderLeft: `4px solid ${category.color}`,
        borderRadius: 16,
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.25s ease, background 0.25s ease',
      }}
      whileHover={{
        boxShadow: `var(--shadow-md), 0 0 0 1px ${category.color}30`,
        y: -4,
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 42,
            height: 42,
            borderRadius: 10,
            background: `${category.color}18`,
            color: category.color,
            flexShrink: 0,
          }}
        >
          <Icon size={22} strokeWidth={1.75} />
        </span>

        <h3
          style={{
            margin: 0,
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
          }}
        >
          {category.title}
        </h3>
      </div>

      {/* Skills list */}
      <div>
        {category.skills.map((skill, i) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            color={category.color}
            inView={inView}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Section heading ───────────────────────────
const headingVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ── Main Export ───────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--bg-primary)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingVariants}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2
            style={{
              margin: '0 0 0.5rem',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            My Skills
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '1rem',
              color: 'var(--text-muted)',
              maxWidth: 480,
              marginInline: 'auto',
            }}
          >
            Technologies, Tools &amp; Professional Skills
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '1.75rem',
          }}
        >
          {skillCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
