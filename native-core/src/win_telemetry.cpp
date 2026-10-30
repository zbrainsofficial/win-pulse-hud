#include "../include/win_telemetry.hpp"

#ifdef _WIN32
#include <tlhelp32.h>
#endif

namespace WinPulse {

TelemetryEngine::TelemetryEngine() {
    collect_global_stats(); // initialize baseline delta
}

SystemGlobalStats TelemetryEngine::collect_global_stats() {
    SystemGlobalStats stats{};

#ifdef _WIN32
    FILETIME idle_time, kernel_time, user_time;
    if (GetSystemTimes(&idle_time, &kernel_time, &user_time)) {
        auto ft_to_u64 = [](const FILETIME& ft) -> uint64_t {
            return (static_cast<uint64_t>(ft.dwHighDateTime) << 32) | ft.dwLowDateTime;
        };

        uint64_t current_idle = ft_to_u64(idle_time);
        uint64_t current_kernel = ft_to_u64(kernel_time);
        uint64_t current_user = ft_to_u64(user_time);

        uint64_t sys_delta = (current_kernel - previous_kernel_time_) + (current_user - previous_user_time_);
        uint64_t idle_delta = current_idle - previous_idle_time_;

        if (sys_delta > 0) {
            stats.cpu_total_pct = (1.0 - (static_cast<double>(idle_delta) / sys_delta)) * 100.0;
        }

        previous_idle_time_ = current_idle;
        previous_kernel_time_ = current_kernel;
        previous_user_time_ = current_user;
    }

    MEMORYSTATUSEX mem_status{};
    mem_status.dwLength = sizeof(MEMORYSTATUSEX);
    if (GlobalMemoryStatusEx(&mem_status)) {
        stats.ram_total_bytes = mem_status.ullTotalPhys;
        stats.ram_used_bytes = mem_status.ullTotalPhys - mem_status.ullAvailPhys;
    }
#else
    stats.cpu_total_pct = 15.4;
    stats.ram_total_bytes = 34359738368;
    stats.ram_used_bytes = 16106127360;
    stats.active_process_count = 210;
    stats.kernel_thread_count = 3200;
#endif

    return stats;
}

std::vector<ProcessSnapshot> TelemetryEngine::enumerate_active_processes() {
    std::vector<ProcessSnapshot> list;

#ifdef _WIN32
    HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snapshot != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32W entry{};
        entry.dwSize = sizeof(PROCESSENTRY32W);

        if (Process32FirstW(snapshot, &entry)) {
            do {
                ProcessSnapshot ps{};
                ps.pid = entry.th32ProcessID;
                ps.process_name = entry.szExeFile;
                ps.thread_count = entry.cntThreads;
                list.push_back(ps);
            } while (Process32NextW(snapshot, &entry));
        }
        CloseHandle(snapshot);
    }
#else
    list.push_back({4, L"System", 0.5, 33554432, 280, true});
    list.push_back({1000, L"explorer.exe", 2.0, 104857600, 64, false});
#endif

    return list;
}

} // namespace WinPulse
