export interface ProcessTelemetry {
  pid: number;
  name: string;
  cpuPercentage: number;
  memoryWorkingSetMB: number;
  threadCount: number;
  isElevated: boolean;
  integrityLevel: 'System' | 'High' | 'Medium' | 'Low';
  hasAnomalousSpike: boolean;
}

export interface SystemHUDMetrics {
  cpuGlobalUsage: number;
  ramUsagePercent: number;
  ramUsedGB: number;
  ramTotalGB: number;
  activeProcessesCount: number;
  kernelThreadsCount: number;
  gpuEngineLoad: number;
  fpsRefreshRate: number;
  uptimeSeconds: number;
}
