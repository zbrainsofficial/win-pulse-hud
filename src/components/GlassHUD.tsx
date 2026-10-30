import React, { useState, useEffect } from 'react';
import { SystemHUDMetrics, ProcessTelemetry } from '../types/system';

export const GlassHUD: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemHUDMetrics>({
    cpuGlobalUsage: 14.2,
    ramUsagePercent: 48.6,
    ramUsedGB: 15.5,
    ramTotalGB: 32.0,
    activeProcessesCount: 218,
    kernelThreadsCount: 3140,
    gpuEngineLoad: 8.5,
    fpsRefreshRate: 144,
    uptimeSeconds: 86420,
  });

  const [processes, setProcesses] = useState<ProcessTelemetry[]>([
    {
      pid: 4,
      name: 'System Kernel',
      cpuPercentage: 0.8,
      memoryWorkingSetMB: 28.4,
      threadCount: 280,
      isElevated: true,
      integrityLevel: 'System',
      hasAnomalousSpike: false,
    },
    {
      pid: 1420,
      name: 'explorer.exe',
      cpuPercentage: 2.1,
      memoryWorkingSetMB: 94.6,
      threadCount: 64,
      isElevated: false,
      integrityLevel: 'Medium',
      hasAnomalousSpike: false,
    },
    {
      pid: 6184,
      name: 'win-pulse-hud.exe',
      cpuPercentage: 1.4,
      memoryWorkingSetMB: 42.1,
      threadCount: 18,
      isElevated: true,
      integrityLevel: 'High',
      hasAnomalousSpike: false,
    },
    {
      pid: 8820,
      name: 'background-telemetry.exe',
      cpuPercentage: 11.8,
      memoryWorkingSetMB: 210.5,
      threadCount: 32,
      isElevated: false,
      integrityLevel: 'Medium',
      hasAnomalousSpike: true,
    },
  ]);

  // Live telemetry pulse simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpuGlobalUsage: Number((12 + Math.random() * 8).toFixed(1)),
        gpuEngineLoad: Number((6 + Math.random() * 5).toFixed(1)),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.hudContainer}>
      {/* Top Glassmorphic Navigation Bar */}
      <header style={styles.header}>
        <div style={styles.logoBadge}>
          <span style={styles.pulseDot}></span>
          <span style={styles.appTitle}>WIN-PULSE HUD // 2026 EDITION</span>
        </div>
        <div style={styles.tagline}>NATIVE C++20 + REACT 19 TYPESCRIPT</div>
      </header>

      {/* Primary KPI Grid */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>CPU REAL-TIME LOAD</div>
          <div style={styles.cardValue}>{metrics.cpuGlobalUsage}%</div>
          <div style={styles.barBackground}>
            <div
              style={{
                ...styles.barFill,
                width: `${metrics.cpuGlobalUsage}%`,
                backgroundColor: metrics.cpuGlobalUsage > 50 ? '#EF4444' : '#06B6D4',
              }}
            />
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardLabel}>MEMORY WORKING SET</div>
          <div style={styles.cardValue}>{metrics.ramUsagePercent}%</div>
          <div style={styles.subtext}>
            {metrics.ramUsedGB} GB / {metrics.ramTotalGB} GB DDR5
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardLabel}>GPU ENGINE LOAD</div>
          <div style={styles.cardValue}>{metrics.gpuEngineLoad}%</div>
          <div style={styles.subtext}>{metrics.fpsRefreshRate} Hz Direct3D 12</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardLabel}>KERNEL ACTIVE THREADS</div>
          <div style={styles.cardValue}>{metrics.kernelThreadsCount}</div>
          <div style={styles.subtext}>{metrics.activeProcessesCount} Monitored PIDs</div>
        </div>
      </div>

      {/* Live Process Inspection Table */}
      <div style={styles.tableCard}>
        <h3 style={styles.tableTitle}>Real-Time Win32 Process Matrix</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>PID</th>
              <th style={styles.th}>PROCESS NAME</th>
              <th style={styles.th}>CPU (%)</th>
              <th style={styles.th}>RAM (MB)</th>
              <th style={styles.th}>INTEGRITY</th>
              <th style={styles.th}>SECURITY STATUS</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr key={p.pid} style={styles.tr}>
                <td style={styles.tdMono}>{p.pid}</td>
                <td style={styles.tdBold}>{p.name}</td>
                <td style={styles.tdMono}>{p.cpuPercentage}%</td>
                <td style={styles.tdMono}>{p.memoryWorkingSetMB} MB</td>
                <td style={styles.td}>{p.integrityLevel}</td>
                <td style={styles.td}>
                  {p.hasAnomalousSpike ? (
                    <span style={styles.badgeWarning}>SPIKE DETECTED</span>
                  ) : (
                    <span style={styles.badgeSafe}>NOMINAL</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hudContainer: {
    minHeight: '100vh',
    backgroundColor: '#090D16',
    color: '#F8FAFC',
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    padding: '30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '16px',
  },
  logoBadge: { display: 'flex', alignItems: 'center', gap: '10px' },
  pulseDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#06B6D4',
    boxShadow: '0 0 12px #06B6D4',
  },
  appTitle: { fontSize: '18px', fontWeight: '800', letterSpacing: '1.5px', color: '#38BDF8' },
  tagline: { fontSize: '11px', color: '#64748B', fontWeight: '700', letterSpacing: '1px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '28px',
  },
  card: {
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  cardLabel: { fontSize: '11px', color: '#94A3B8', fontWeight: '700', letterSpacing: '1px' },
  cardValue: { fontSize: '36px', fontWeight: '900', color: '#F8FAFC', margin: '8px 0' },
  subtext: { fontSize: '12px', color: '#64748B' },
  barBackground: {
    width: '100%',
    height: '6px',
    backgroundColor: '#1E293B',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  barFill: { height: '100%', transition: 'width 0.3s ease' },
  tableCard: {
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '24px',
  },
  tableTitle: { fontSize: '16px', fontWeight: '700', marginBottom: '18px', color: '#E2E8F0' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  tableHeaderRow: { borderBottom: '1px solid #334155' },
  th: { padding: '12px 14px', fontSize: '11px', color: '#94A3B8', fontWeight: '700' },
  tr: { borderBottom: '1px solid rgba(255, 255, 255, 0.04)' },
  td: { padding: '12px 14px', fontSize: '13px' },
  tdMono: { padding: '12px 14px', fontSize: '13px', fontFamily: 'monospace', color: '#38BDF8' },
  tdBold: { padding: '12px 14px', fontSize: '13px', fontWeight: '600' },
  badgeSafe: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: '#34D399',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
  },
  badgeWarning: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#F87171',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
  },
};
