#pragma once

#include <string>
#include <vector>
#include <cstdint>
#include <chrono>
#include <span>

#ifdef _WIN32
#include <windows.h>
#include <psapi.h>
#endif

namespace WinPulse {

struct ProcessSnapshot {
    uint32_t pid;
    std::wstring process_name;
    double cpu_usage_pct;
    size_t working_set_bytes;
    uint32_t thread_count;
    bool is_elevated;
};

struct SystemGlobalStats {
    double cpu_total_pct;
    uint64_t ram_used_bytes;
    uint64_t ram_total_bytes;
    uint32_t active_process_count;
    uint32_t kernel_thread_count;
};

class TelemetryEngine {
public:
    TelemetryEngine();
    ~TelemetryEngine() = default;

    // Disallow copies for strict RAII
    TelemetryEngine(const TelemetryEngine&) = delete;
    TelemetryEngine& operator=(const TelemetryEngine&) = delete;

    [[nodiscard]] SystemGlobalStats collect_global_stats();
    [[nodiscard]] std::vector<ProcessSnapshot> enumerate_active_processes();

private:
    uint64_t previous_idle_time_{0};
    uint64_t previous_kernel_time_{0};
    uint64_t previous_user_time_{0};
};

} // namespace WinPulse
