# WinPulse HUD 🪟⚡

[![UI: React 19](https://img.shields.io/badge/UI-React_19-blue.svg)](https://react.dev)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript_5.4-3178C6.svg)](https://www.typescriptlang.org)
[![Core: C++20](https://img.shields.io/badge/Kernel_Core-C%2B%2B20_Win32-00599C.svg)](https://en.cppreference.com)
[![Platform: Windows 11](https://img.shields.io/badge/Platform-Windows_11_%7C_10-0078D4.svg)](#)
[![Design: Fluent Glassmorphism](https://img.shields.io/badge/Design-Fluent_Glassmorphism-9333EA.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Ultra-modern Windows Desktop Performance HUD & Kernel Telemetry Dashboard built with **React 19**, **TypeScript**, and **Native C++20 Win32 Interop**.

---

## 🎨 Fluent Glassmorphism Interface

```
┌────────────────────────────────────────────────────────────────────────┐
│  ● WIN-PULSE HUD // 2026 EDITION      NATIVE C++20 + REACT 19 TYPESCRIPT│
├────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌───────────┐ │
│ │ CPU LOAD       │ │ MEMORY WORKING │ │ GPU DIRECT3D   │ │ THREADS   │ │
│ │   14.2%        │ │   48.6%        │ │   8.5%         │ │   3,140   │ │
│ │ [████░░░░░░░░] │ │ 15.5GB/32GB    │ │ 144Hz Active   │ │ 218 PIDs  │ │
│ └────────────────┘ └────────────────┘ └────────────────┘ └───────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ Real-Time Win32 Process Matrix:                                        │
│ PID     NAME                    CPU%    RAM      INTEGRITY   STATUS    │
│ 4       System Kernel           0.8%    28.4MB   System      NOMINAL   │
│ 1420    explorer.exe            2.1%    94.6MB   Medium      NOMINAL   │
│ 8820    telemetry-leak.exe      11.8%   210.5MB  Medium      [SPIKE]   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Architectural Highlights

- **Native C++20 Kernel Core:** Utilizes Win32 `GetSystemTimes`, `GlobalMemoryStatusEx`, and `CreateToolhelp32Snapshot` for sub-millisecond process enumeration with zero runtime overhead.
- **Strict TypeScript 5.4 Type Safety:** Zero `any` types; all Win32 process handles and memory metrics are mapped to strongly typed interfaces.
- **React 19 Glassmorphism Engine:** Ultra-sleek translucent dark UI engineered with backdrop blur, custom CSS variables, and zero heavy UI framework bloat.
- **Anomalous Spike Radar:** Real-time heuristic detection of background CPU hogging, orphan processes, and memory leak patterns.

---

## 🚀 Building & Running

### 1. Test Verification
```bash
npm test
```

### 2. Frontend Development (React + TypeScript)
```bash
npm run dev
```

### 3. Build Native C++20 Core (CMake)
```bash
cd native-core
mkdir build && cd build
cmake ..
cmake --build . --config Release
```

---

## 📜 License
MIT License. Created by [Z-Brains](https://github.com/zbrainsofficial).
